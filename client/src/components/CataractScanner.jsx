import React, { useEffect, useState } from "react";
import "../styles/CataractScanner.css";
import Navbar from "./Navbar";
import axios from "axios";

export default function CataractScanner() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState(null);
    const [prediciton, setPrediction] = useState(null);
    const [predictionDesc, setPredictionDesc] = useState(null);
    const [predictionResult, setPredictionResult] = useState(null);

    const handleChange = (e) => {
        setFile(e.target.files[0]);
        const f1 = e.target.files[0];
        if (f1) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            fileReader.readAsDataURL(f1);
        }
    };
    
    const uploadImage = async () => {
        const formData = new FormData();
        formData.append("file", file);
        const response = await axios.post("http://127.0.0.1:8000/predict", formData);
        if (response.data) {
            console.log(response.data);
            setPrediction(response.data["prediction"]);
            setPredictionDesc(response.data["prediction-desc"]);
            setPredictionResult(response.data["content"]);
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
                {prediciton && predictionDesc && predictionResult && (
                    <>
                        <div className="prediction-results">
                            <h1>Prediction: {prediciton}</h1>
                        </div>
                        <div className="prediction-results">
                            <h1>Prediction-Result: {predictionDesc}</h1>
                        </div>
                        <div className="prediction-results-result">
                            <h1>Prediction Action: {predictionResult}</h1>
                        </div>
                    </>
                )}
                <button onClick={() => { uploadImage() }} className="cataract-predict-result">Predict Result</button>
            </section>
        </>
    );
};
