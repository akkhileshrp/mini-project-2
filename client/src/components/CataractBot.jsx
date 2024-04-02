import React, { useState } from "react";
import "../styles/CataractBot.css";
import Navbar from "./Navbar";
import ChatbotLogo from "../assets/chatbot.png";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import axios from "axios";

export default function CataractBot() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const fetchBotResponse = async (userMessage) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/chatbot', {
                message: userMessage
            });
            console.log("Bot response:", response.data);
            return response.data || "No response from the bot.";
        } catch (error) {
            console.error("Fetching bot response failed:", error);
            return "Sorry, I couldn't fetch the response.";
        }
    };


    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        const userMessage = message;
        setMessages([...messages, { text: userMessage, sender: 'user' }]);
        setMessage("");
        const botResponse = await fetchBotResponse(userMessage);
        setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: 'bot' }]);
    };

    return (
        <>
            <Navbar />
            <div className="chat-logo">
                <img src={ChatbotLogo} alt="logo" className="chat" />
                <div className="chat-desc">
                    <h4>Cataract Bot</h4>
                    <p>Shoot your questions!!!</p>
                </div>
            </div>
            <div className="chat-container">
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index}>
                            <p className={message.sender}>{message.text}</p>
                        </div>
                    ))}
                </div>
                <form className="chat-form" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask your questions..."
                    />
                    <button type="submit">
                        <SendRoundedIcon />
                    </button>
                </form>
            </div>
        </>
    );
};
