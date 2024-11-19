import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { useCompanyPage } from "@/company/hooks/useCompanyPage.hook.tsx";
import { NotificationContent } from "./NotificationContent.tsx";
import { useAuthStore } from "@/auth/stores/useAuthStore";
import { ProfileService } from "@/profile/services/profile.service";
import {Notification} from "@/notifications/models/Notification.ts";
import {useSessionClientId} from "@/notifications/hooks/useSessionClientId.ts";

interface Message {
  content: string;
  timestamp: string;
  profileIcon?: string;
}

export const NotificationsComponent = (): React.ReactElement => {
    const { company } = useCompanyPage();
    const [messages, setMessages] = useState<Message[]>([]);

    const url = import.meta.env.VITE_WEBSOCKET_URL!;
    const username = import.meta.env.VITE_WEBSOCKET_USERNAME!;
    const password = import.meta.env.VITE_WEBSOCKET_PASSWORD!;
    const subscriptionName = import.meta.env.VITE_WEBSOCKET_SUBSCRIPTION_NAME!;
    const clientId =  useSessionClientId();

    const { token } = useAuthStore((state) => ({
      token: state.token!,
    }));

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
          const response = await ProfileService.getProfileById(
            profileId,
            token
          );
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
                const cleanContent = content
                  .replace(/[^\x20-\x7E]/g, "")
                  .trim();
                parsedContent = JSON.parse(cleanContent);
              } catch (error) {
                console.error("Error al parsear JSON:", error);
                parsedContent = { message: "Contenido no válido" };
              }

              const profileIcon = parsedContent.profileId ? await fetchProfileIcon(
                parsedContent.profileId
              ) : null;

              const newMessage: Message = {
                content,
                timestamp,
                profileIcon,
              };

              setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, newMessage];
                localStorage.setItem(
                  `${company?.id}`,
                  JSON.stringify(updatedMessages)
                );
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

    const handleRemoveMessage = (message: Message) => {
      setMessages((prevMessages) => {
        const updatedMessages = prevMessages.filter((msg) => msg !== message);
        localStorage.setItem(`${company?.id}`, JSON.stringify(updatedMessages));
        console.log("Mensajes actualizados en localStorage:", updatedMessages);
        return updatedMessages;
      });
    };

    return (
      <div className="p-2">
        <h1 className="text-2xl flex justify-center p-3 pb-6 border-b-2">
          Notificaciones
        </h1>
        <div>
          {messages
            .map((msg, index) => {
              let parsedContent;
              try {
                const cleanContent = msg.content
                  .replace(/[^\x20-\x7E]/g, "")
                  .trim();
                parsedContent = JSON.parse(cleanContent);
              } catch (error) {
                console.error("Error al parsear JSON:", error);
                parsedContent = { message: "Contenido no válido" };
              }
              return (
                <div key={index}>
                  <div className="p-6">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        {msg.timestamp}
                      </span>
                      <button
                        className="text-sm text-gray-500"
                        onClick={() => handleRemoveMessage(msg)}
                      >
                        <img src="icons/close.svg" alt="close" />
                      </button>
                    </div>
                    <NotificationContent
                      cropID={parsedContent.cropId}
                      phase={parsedContent.phase}
                      message={parsedContent.message}
                      action={parsedContent.action}
                      payload={parsedContent.payload}
                      recordId={parsedContent.recordId}
                      differences={parsedContent.differences}
                      profileIcon={msg.profileIcon || ""}
                    />
                  </div>
                </div>
              );
            })
            .reverse()}
        </div>

      </div>
    );
  };
