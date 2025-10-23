import React, { useState, useEffect } from "react";
import '@/components/quiz/quiz.css';

export default function QuizProgressBar({ quizData, selectedQuestionNumber }) {
    const [compleatedPrecentage, setCompleatedPrecentage] = useState(0);
    const [animationType, setAnimationType] = useState("increase");

    useEffect(() => {
        const newPercentage = Math.round(
            (selectedQuestionNumber / quizData.length) * 100
          );
          
        if (newPercentage > compleatedPrecentage) {
            setAnimationType("increase");
        } else {
            setAnimationType("decrease");
        }

        setCompleatedPrecentage(newPercentage);
    }, [selectedQuestionNumber])

    return (
        <div className="quiz_progress_bar_container">
            <div className="progress_bar_header_container">
                <div className="progress_bar_text">Question {selectedQuestionNumber} out of {quizData.length}</div>
                <div className="progress_bar_text"> {compleatedPrecentage}% complete</div>
            </div>
            <div className="progress_bar">
                <div className={`green_progress_bar ${animationType}`}
                    style={{ width: `${compleatedPrecentage}%` }}></div>
            </div>
        </div>
    )
}