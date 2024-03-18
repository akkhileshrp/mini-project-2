import React, { useState } from "react";
import "../styles/Navbar.css";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="navbar-container">
            <div onClick={toggleMenu} className="menu-icon">
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </div>
            <div className="navbar-title">Ocular analyser</div>
            <ul className={`navbar-tags ${menuOpen ? 'active' : ''}`}>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <Link to='/cataract-scanner'>Cataract Scanner</Link>
                </li>
                <li>
                    <Link to='/cataract-bot'>Cataract Bot</Link>
                </li>
            </ul>
        </nav>
    );
};
