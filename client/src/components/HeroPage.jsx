import React from "react";
import "../styles/HeroPage.css";
import { Link } from "react-router-dom";

export default function HeroPage() {
    return (
        <section>
            <p className="hero-title">
                "Welcome to our cataract detection system! Explore cataracts, scan for symptoms, chat for info. Empowering early detection. Take control of your eye health!"
            </p>
            <p className="hero-title-desc">
                To upload your cataract image, click the button below to navigate to the image scanning page.
            </p>
            <button className="hero-btn"><Link to='/cataract-scanner'>Cataract Scanner</Link></button>
        </section>
    );
};