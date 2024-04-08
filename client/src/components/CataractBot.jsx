import React, { useState } from "react";
import "../styles/CataractBot.css";
import Navbar from "./Navbar";
import ChatbotLogo from "../assets/chatbot.png";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from "axios";

export default function CataractBot() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSampleQuestion, setShowSampleQuestion] = useState(true);

    const fetchBotResponse = async (userMessage) => {
        try {
            setLoading(true);
            const response = await axios.post('http://127.0.0.1:8000/chatbot', {
                message: userMessage
            });
            console.log("Bot response:", response.data);
            return response.data || "No response from the bot.";
        } catch (error) {
            console.error("Fetching bot response failed:", error);
            return "Sorry, I couldn't fetch the response.";
        } finally {
            setLoading(false);
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
        setShowSampleQuestion(false);
    };

    const handleSampleQuestionClick = async (sampleQuestion) => {
        const botResponse = await fetchBotResponse(sampleQuestion);
        setMessages([...messages, { text: sampleQuestion, sender: 'user' }, { text: botResponse, sender: 'bot' }]);
        setShowSampleQuestion(false);
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
                {loading &&
                    <div className="chat-loader">
                        <ScaleLoader
                            color="#fff"
                            height={40}
                            radius={2}
                            width={5}
                        />
                    </div>
                }
                {showSampleQuestion && (
                    <div className="sample-question-container">
                        <p onClick={() => handleSampleQuestionClick("Sample Question")}>Sample Question</p>
                    </div>
                )}
                <form className="chat-form" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onSubmit={() => setShowSampleQuestion(false)}
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
