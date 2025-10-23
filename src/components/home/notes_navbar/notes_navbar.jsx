"use client";
import React, { useState } from "react";
import "@/components/home/notes_navbar/notes_navbar.css";
import { GenerateQuiz } from "@/components/quiz/generate_quiz.js";

function NotesNavbar({
    setShowQuizConfig,
    setIsQuizActive,
    resourcesList,
    paymentRef,
    setLockQuiz,
    setIsSignupActive,
}) {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async () => {
        if (isGenerating) return; 
        try {
            setLockQuiz?.(false);
            setIsQuizActive?.(true);
            const result = await GenerateQuiz(resourcesList);
        } catch (err) {
            console.error("GenerateQuiz failed:", err);
        } 
    };

    return (
        <div className="notes_navbar_container">
        <img
        src="images/premium_logo.png"
        alt="premium_logo"
        className="premium_logo"
        onClick={() =>
            paymentRef?.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
            })
        }
        />
        <div className="right_container">
        <img
        src="images/settings.png"
        alt="settings"
        className="settings_icon"
        onClick={() => {
            if (setShowQuizConfig) setShowQuizConfig((prev) => !prev);
        }}
        />
        <div
        className={`generate_quiz_button ${isGenerating ? "is-loading" : ""}`}
        onClick={handleGenerate}  
        >
        {isGenerating ? "Generating..." : "Generate Quiz"}
        </div>
        </div>
        </div>
    );
}

export default NotesNavbar;
