import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { useCompanyPage } from "@/company/hooks/useCompanyPage.hook.tsx";
import { CropAction } from "./CropAction";

interface Message {
  content: string;
  timestamp: string;
}

type NotificationsProps = {
  hide: () => void;
};

export const NotificationsComponent =
  ({}: NotificationsProps): React.ReactElement => {
    const { company } = useCompanyPage();
    const [messages, setMessages] = useState<Message[]>([]);

    const url = import.meta.env.VITE_WEBSOCKET_URL!;
    const username = import.meta.env.VITE_WEBSOCKET_USERNAME!;
    const password = import.meta.env.VITE_WEBSOCKET_PASSWORD!;
    const clientId = import.meta.env.VITE_WEBSOCKET_CLIENT_ID!;
    const subscriptionName = import.meta.env.VITE_WEBSOCKET_SUBSCRIPTION_NAME!;

    useEffect(() => {
      if (company?.id) {
        const storedMessages = localStorage.getItem(`${company.id}`);
        setMessages(storedMessages ? JSON.parse(storedMessages) : []);
      }
    }, [company]);

    useEffect(() => {
      if (!company?.id) return;

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
            (message) => {
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

              const newMessage = { content, timestamp };
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
    }, [company]);

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
                      <div
                        className="text-sm text-gray-500 cursor-pointer"
                        onClick={() => handleRemoveMessage(msg)}
                      >
                        X
                      </div>
                    </div>
                    <CropAction
                      cropID={parsedContent.cropId}
                      phase={parsedContent.phase}
                      message={parsedContent.message}
                      action={parsedContent.action}
                      payload={parsedContent.payload}
                      recordId={parsedContent.recordId}
                      differences={parsedContent.differences}
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
