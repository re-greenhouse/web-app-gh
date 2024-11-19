import {ReactElement} from "react";
import {useNotifications} from "@/notifications/hooks/useNotifications.ts";
import {NotificationContent} from "@/notifications/components/NotificationContent.tsx";

export const NotificationsComponent = (): ReactElement => {
  const { messages, removeMessage } = useNotifications();

  return (
    <div className="p-2">
      <h1 className="text-2xl flex justify-center p-3 pb-6 border-b-2">Notificaciones</h1>
      <div>
        {messages
          .map((msg, index) => {
            let parsedContent;
            try {
              const cleanContent = msg.content.replace(/[^\x20-\x7E]/g, "").trim();
              parsedContent = JSON.parse(cleanContent);
            } catch (error) {
              console.error("Error parsing JSON:", error);
              parsedContent = { message: "Invalid content" };
            }
            return (
              <div key={index}>
                <div className="p-6">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">{msg.timestamp}</span>
                    <button
                      className="text-sm text-gray-500"
                      onClick={() => removeMessage(msg)}
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
