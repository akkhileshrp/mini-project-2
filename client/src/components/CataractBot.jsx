import React from "react";
import "../styles/CataractBot.css";
import Navbar from "./Navbar";
import ChatbotLogo from "../assets/chatbot.png";
import SendRoundedIcon from '@mui/icons-material/SendRounded';

export default function CataractBot() {
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
                <div className="chat-messages"></div>
                <form className="chat-form">
                    <input type="text" name="message" placeholder="Type your message..." />
                    <button type="submit">
                        <SendRoundedIcon />
                    </button>
                </form>
            </div>
        </>
    );
};