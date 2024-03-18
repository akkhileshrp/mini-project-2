import React, { useState } from "react";
import "../styles/CataractScanner.css";
import Navbar from "./Navbar";

export default function CataractScanner() {
    const [selectedImage, setSelectedImage] = useState(null);
    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            fileReader.readAsDataURL(file);
        }
    };
    return (
        <>
            <Navbar />
            <section>
                <h1 className="cataract-title">Cataract Scanner</h1>
                <center>
                    <p className="cataract-desc">Scan your eye image to detect cataracts early and protect your vision. Take action today!</p>
                    <div className="cataract-file">
                        <form>
                            <input type="file" onChange={handleChange} />
                        </form>
                    </div>
                    {selectedImage && <img className="predicted-img" src={selectedImage} alt="Selected" style={{ maxWidth: "100%", maxHeight: "200px" }} />}
                </center>
                <button className="cataract-predict-result">Predict Result</button>
            </section>
        </>
    );
};
