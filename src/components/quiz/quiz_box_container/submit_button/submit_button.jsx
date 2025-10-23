import React, { useState } from "react";
import "@/components/quiz/quiz_box_container/quiz_box_container.css";

export default function SubmitButton({ quizData, setIsCompletionScreenActive, isReviewing, setIsQuizActive, setQuizData }) {
    const [unansweredQuestions, setUnansweredQuestions] = useState([]);
    const [isConfirmationActive, setIsConfirmationActive] = useState(false);

    function checkSubmittability() {
        const newUnanswered = [];
        for (let i = 0; i < quizData.length; i++) {
            if (quizData[i].isAnswerCorrect === undefined) {
                newUnanswered.push(i + 1);
            }
        }
        return newUnanswered;
    }

    return (
        <div className="finish_quiz_container">
            {isConfirmationActive && (
                <div className="dark_overlay">
                    <div className="submit_confirmation ">
                        <div className="submit_header_text">
                            <div>You have {unansweredQuestions.length} unanswered questions</div>
                            <div>Do you still want to submit?</div>
                        </div>
                        <div className="submit_buttons_container">
                            <button className="confirm_buttons" onClick={() => {
                                setIsConfirmationActive(false)
                            }}> Cancel</button>
                            <button className="confirm_buttons" onClick={() => {
                                setIsCompletionScreenActive(true)
                            }}> Submit</button>
                        </div>
                    </div>
                </div>
            )}


            <button
                className="finish_quiz"
                onClick={() => {
                    const updatedUnanswered = checkSubmittability();
                    setUnansweredQuestions(updatedUnanswered);

                    if (isReviewing === true ) {
                        setQuizData({})
                        setIsQuizActive(false)
                    } else if (updatedUnanswered.length > 0) {
                        setIsConfirmationActive(true);
                    } else {
                        setIsCompletionScreenActive(true)
                    }
                }}
            >

                {isReviewing ? "Home" : "Finish Quiz"}
            </button>
        </div>
    );
}
