import React from "react";
import "../styles/About.css";
import Navbar from "./Navbar";

export default function About() {
    return (
        <>
            <Navbar />
            <section>
                <h1 className="about-title">About</h1>
                <div className="about-desc">
                    <h1 className="about-desc-heading">Our Mission:</h1>
                    <p className="about-desc-detailed">At Cataract Ocular Analysis, we are committed to revolutionizing the way cataracts are detected and managed. Our goal is to provide accessible and accurate information about cataracts while offering a user-friendly platform for individuals to scan their images for early detection.</p>
                </div>
                <div className="about-desc">
                    <h1 className="about-desc-heading">Who We Are:</h1>
                    <p className="about-desc-detailed">We are a dedicated team of developers, and designers assionate about leveraging technology for healthcare advancement. Our collective expertise drives us to create innovative solutions that empower individuals to take charge of their eye health.</p>
                </div>
                <div className="about-desc">
                    <h1 className="about-desc-heading">What We Offer:</h1>
                    <p className="about-desc-detailed">Through our platform, users can educate themselves about cataracts, understand the importance of early detection, and conveniently scan their images to assess their eye health. Our bot is here to assist you with any questions or concerns you may have, providing reliable information and guidance.</p>
                </div>
                <div className="about-desc">
                    <h1 className="about-desc-heading">Join Us in the Fight Against Cataracts:</h1>
                    <p className="about-desc-detailed">Together, we can raise awareness, promote early detection, and ultimately reduce the impact of cataracts on individuals' lives. Join us in our mission to make eye health a priority for everyone.</p>
                </div>
            </section>
        </>
    );
};