import {useContext} from "react";
import {NotificationsContext} from "@/notifications/context/useNotificationContext.tsx";

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
};