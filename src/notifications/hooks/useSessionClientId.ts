import { v4 as uuidv4 } from 'uuid';
import {useEffect, useState} from "react";


export const useSessionClientId = () => {
  const [id, setId] = useState(uuidv4());
  const sessionKey = "session-client-id";

  useEffect(() => {
    const existingClientId = sessionStorage.getItem(sessionKey);
    if (existingClientId) {
      setId(existingClientId);
    } else {
      sessionStorage.setItem(sessionKey, id);
    }
  }, []);

  return id;
}