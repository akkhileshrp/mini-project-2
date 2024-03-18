import React from "react";
import Navbar from "./components/Navbar";
import HeroPage from "./components/HeroPage";
import About from "./components/About";
import CataractScanner from "./components/CataractScanner";
import CataractBot from "./components/CataractBot";
import { Route, Routes } from "react-router-dom";

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={
                    <>
                        <Navbar />
                        <HeroPage />
                    </>
                } />
                <Route path="/about" element={<About />} />
                <Route path="/cataract-scanner" element={<CataractScanner />} />
                <Route path="/cataract-bot" element={<CataractBot />} />
            </Routes>
        </>
    );
};