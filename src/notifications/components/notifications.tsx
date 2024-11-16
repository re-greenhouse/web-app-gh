import React, { useEffect, useState } from 'react';
import { CropFinished } from './CropFinished';
import { useCompanyPage } from "@/company/hooks/useCompanyPage.hook.tsx";

interface Message {
    content: string;
    timestamp: string;
}

type NotificationsProps = {
    hide: () => void;
}

export const NotificationsComponent = ({ hide }: NotificationsProps): React.ReactElement => {
    const { company } = useCompanyPage();
    const [messages, setMessages] = useState<Message[]>([]);

    const url = "wss://b-b0358e91-8f16-4f54-ac04-60744de2e1b7-1.mq.us-east-2.amazonaws.com:61619";
    const username = "greenhouse";
    const password = "champi202402";

    const generateRandomString = (length: number) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    const [clientId] = useState(() => generateRandomString(8));
    const [subscriptionName] = useState(() => generateRandomString(16));

    useEffect(() => {
        if (company?.id) {
            const storedMessages = localStorage.getItem(`${company.id}`);
            setMessages(storedMessages ? JSON.parse(storedMessages) : []);
        }
    }, [company]);

    useEffect(() => {
        if (!company?.id) return;

        const topic = `/topic/${company.id}`;
        const ws = new WebSocket(url);

        ws.onopen = () => {
            ws.send(
                `CONNECT\naccept-version:1.2\nhost:stomp\nlogin:${username}\npasscode:${password}\nclient-id:${clientId}\n\n\x00`
            );
            ws.send(
                `SUBSCRIBE\ndestination:${topic}\nid:sub-0\nack:auto\nactivemq.subscriptionName:${subscriptionName}\n\n\x00`
            );
        };

        ws.onmessage = (event) => {
            const messageParts = event.data.split("\n");

            if (event.data.includes("MESSAGE")) {
                const content = messageParts[messageParts.length - 1].trim();

                const now = new Date();
                const date = now.toLocaleDateString('en-GB');
                const time = now.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true,
                });
                const timestamp = `${date} - ${time}`;

                if (content) {
                    const newMessage = { content, timestamp };

                    setMessages((prevMessages) => {
                        const updatedMessages = [...prevMessages, newMessage];
                        localStorage.setItem(`${company?.id}`, JSON.stringify(updatedMessages));
                        return updatedMessages;
                    });
                }
            }
        };

        return () => {
            ws.close();
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
        <div>
            <div className='absolute backdrop-blur-sm bg-black opacity-80 w-full h-full z-30' onClick={hide}></div>
            <div className='bg-white h-full absolute top-[96px] right-0 w-1/4 z-30 flex flex-col'>
                <div className='p-2 overflow-scroll'>
                    <button
                        className="z-30"
                        onClick={() => {
                            hide();
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                    <h1 className='text-2xl flex justify-center p-3 pb-6 border-b-2'>Notificaciones</h1>
                    <div>
                        {messages
                            .map((msg, index) => {
                                let parsedContent;
                                try {
                                    const cleanContent = msg.content.replace(/[^\x20-\x7E]/g, '').trim();
                                    parsedContent = JSON.parse(cleanContent);
                                } catch (error) {
                                    console.error("Error al parsear JSON:", error);
                                    parsedContent = { message: "Contenido no válido" };
                                }
                                return (
                                    <div key={index} className="cursor-pointer hover:bg-slate-200">
                                        <div className="p-6">
                                            <div className='flex justify-between'>
                                                <span className="text-sm text-gray-500">{msg.timestamp}</span>
                                                <div 
                                                    className="text-sm text-gray-500 cursor-pointer"
                                                    onClick={() => handleRemoveMessage(msg)}
                                                >
                                                    X
                                                </div>
                                            </div>
                                            <CropFinished
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
            </div>
        </div>
    );
};
