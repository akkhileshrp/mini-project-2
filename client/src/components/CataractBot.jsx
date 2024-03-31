import React from "react";
import "../styles/CataractBot.css";
import Navbar from "./Navbar";
import ChatbotLogo from "../assets/chatbot.png";
import SendRoundedIcon from '@mui/icons-material/SendRounded';

export default function CataractBot() {
    return (
        <>
            <Navbar />
            <div className="chatbot-container">
                <img src={ChatbotLogo} alt="chatbot-logo" className="chatbot-logo" />
                <div className="chatbot-logo-section">
                    <h4>Cataract Chatbot</h4>
                    <p>Ask any questions you want to know about Cataract</p>
                </div>
                <div className="chatbot-prompt-section">
                    <input type="text" placeholder="Ask Something..." className="chatbot-prompt" />
                    <button>
                        <SendRoundedIcon />
                    </button>
                </div>
            </div>
        </>
    );
};