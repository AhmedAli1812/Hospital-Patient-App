import React, { useState, useRef, useEffect } from 'react';
import useMockApi from '../hooks/useMockApi';
import { mockMessages } from '../data/mockData';
import SendIcon from './icons/SendIcon';

const Messages: React.FC = () => {
    const { data, loading } = useMockApi(mockMessages);
    const [messages, setMessages] = useState(data || []);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (data) setMessages(data);
    }, [data]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        const message = {
            id: messages.length + 1,
            sender: 'patient',
            text: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...messages, message]);
        setNewMessage('');
    };

    if (loading) return <div className="text-center p-10 dark:text-gray-300">Loading messages...</div>;

    return (
        <div className="flex flex-col h-[calc(100vh-150px)] bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'doctor' && <img src="https://i.pravatar.cc/150?u=dr-sarah" alt="Doctor" className="w-8 h-8 rounded-full" />}
                        <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${msg.sender === 'patient' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                            <p className="text-sm">{msg.text}</p>
                            <span className={`text-xs mt-1 block ${msg.sender === 'patient' ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'} text-right`}>{msg.timestamp}</span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t dark:border-gray-700">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-grow w-full py-2 px-4 text-gray-900 bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-all transform hover:scale-110 active:scale-95 disabled:bg-blue-300" disabled={!newMessage.trim()}>
                        <SendIcon className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Messages;
