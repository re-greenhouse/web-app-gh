import React, { createContext, useEffect, useState, ReactNode } from "react";
import { Client } from "@stomp/stompjs";
import { useCompanyPage } from "@/company/hooks/useCompanyPage.hook.tsx";
import { useAuthStore } from "@/auth/stores/useAuthStore";
import { ProfileService } from "@/profile/services/profile.service";
import { Notification } from "@/notifications/models/Notification.ts";
import { useSessionClientId } from "@/notifications/hooks/useSessionClientId.ts";

interface Message {
  content: string;
  timestamp: string;
  profileIcon?: string;
}

interface NotificationsContextValue {
  messages: Message[];
  removeMessage: (message: Message) => void;
}

export const NotificationsContext = createContext<NotificationsContextValue | undefined>(undefined);

export const NotificationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { company } = useCompanyPage();
  const [messages, setMessages] = useState<Message[]>([]);
  const { token } = useAuthStore((state) => ({ token: state.token! }));
  const clientId = useSessionClientId();

  const url = import.meta.env.VITE_WEBSOCKET_URL!;
  const username = import.meta.env.VITE_WEBSOCKET_USERNAME!;
  const password = import.meta.env.VITE_WEBSOCKET_PASSWORD!;
  const subscriptionName = import.meta.env.VITE_WEBSOCKET_SUBSCRIPTION_NAME!;

  useEffect(() => {
    if (company?.id) {
      const storedMessages = localStorage.getItem(`${company.id}`);
      setMessages(storedMessages ? JSON.parse(storedMessages) : []);
    }
  }, [company]);

  useEffect(() => {
    if (!company?.id) return;

    const fetchProfileIcon = async (profileId: string) => {
      try {
        const response = await ProfileService.getProfileById(profileId, token);
        if (response.status === "success" && response.payload.iconUrl) {
          return response.payload.iconUrl;
        }
      } catch (error) {
        console.error("Error fetching profile icon:", error);
      }
      return null;
    };

    const topic = `/topic/${company.id}`;
    const client = new Client({
      brokerURL: url,
      connectHeaders: {
        login: username,
        passcode: password,
        "client-id": clientId,
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        client.subscribe(
          topic,
          async (message) => {
            const content = message.body.trim();
            const now = new Date();
            const date = now.toLocaleDateString("en-GB");
            const time = now.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            });
            const timestamp = `${date} - ${time}`;

            let parsedContent: Notification;
            try {
              const cleanContent = content.replace(/[^\x20-\x7E]/g, "").trim();
              parsedContent = JSON.parse(cleanContent);
            } catch (error) {
              console.error("Error parsing JSON:", error);
              parsedContent = { message: "Invalid content" };
            }

            const profileIcon = parsedContent.profileId
              ? await fetchProfileIcon(parsedContent.profileId)
              : null;

            const newMessage: Message = {
              content,
              timestamp,
              profileIcon,
            };

            setMessages((prevMessages) => {
              const updatedMessages = [...prevMessages, newMessage];
              localStorage.setItem(`${company?.id}`, JSON.stringify(updatedMessages));
              return updatedMessages;
            });
          },
          {
            id: subscriptionName,
            "activemq.subscriptionName": subscriptionName,
          }
        );
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [clientId, company, password, subscriptionName, token, url, username]);

  const removeMessage = (message: Message) => {
    setMessages((prevMessages) => {
      const updatedMessages = prevMessages.filter((msg) => msg !== message);
      localStorage.setItem(`${company?.id}`, JSON.stringify(updatedMessages));
      return updatedMessages;
    });
  };

  return (
    <NotificationsContext.Provider value={{ messages, removeMessage }}>
      {children}
    </NotificationsContext.Provider>
  );
};