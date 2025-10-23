import React, { useEffect, useState } from 'react';
import '@/components/home/quiz_config/quiz_config_content_box/quiz_config_content_box.css';
import QuizDifficulty from './quiz_difficulty/quiz_dificulty';
import QuizQuestionType from './quiz_question_type/quiz_question_type';
import QuizQuestionCount from './quiz_question_count/quiz_question_count';
import QuizHints from './quiz_hints/quiz_hints';
import QuizTime from './quiz_time/quiz_time';

function QuizConfigContentBox({ selectedSettingType }) {

    // loads settings from local storage
    
    const [difficultySettings, setDifficultySettings] = useState(() => {
        return JSON.parse(localStorage.getItem("difficultySettings")) || {
            questionDifficulty: "Medium",
            answerDifficulty: "Medium",
        };
    });

    const [questionTypeSettings, setQuestionTypeSettings] = useState(() => {
        return JSON.parse(localStorage.getItem("questionTypeSettings")) || {
            questionType: "Multiple Choice",
            answerCount: "Four",
        };
    });

    const [questionCountSettings, setQuestionCountSettings] = useState(() => {
        return Number(localStorage.getItem("questionCountSettings")) || 15;
    });

    const [quizHintsSettings, setQuizHintsSettings] = useState(() => {
        return JSON.parse(localStorage.getItem("quizHintsSettings")) || {
            autoSubmit: "On",
            hints: "Few",
        };
    });

    const [timeOn, setTimeOn] = useState(() => {
        return JSON.parse(localStorage.getItem("timeOn")) || false;
    });

    const [quizTimeSettings, setQuizTimeSettings] = useState(() => {
        return Number(localStorage.getItem("quizTimeSettings")) || null;
    });

    // pushes settings to local sorage
    useEffect(() => {
        localStorage.setItem("difficultySettings", JSON.stringify(difficultySettings));
        localStorage.setItem("questionTypeSettings", JSON.stringify(questionTypeSettings));
        localStorage.setItem("questionCountSettings", questionCountSettings);
        localStorage.setItem("quizHintsSettings", JSON.stringify(quizHintsSettings));
        localStorage.setItem("timeOn", JSON.stringify(timeOn));
        localStorage.setItem("quizTimeSettings", quizTimeSettings);
    }, [difficultySettings, questionTypeSettings, questionCountSettings, quizHintsSettings, timeOn, quizTimeSettings]); 
    console.log(quizHintsSettings)
    return (
        <div className='quiz_config_sub_container'>
            <div className='config_header_text'>
                {selectedSettingType === "Difficulty" && (
                    <QuizDifficulty 
                        difficultySettings={difficultySettings} 
                        setDifficultySettings={setDifficultySettings} 
                    />
                )}
                {selectedSettingType === "Question Type" && (
                    <QuizQuestionType 
                        questionTypeSettings={questionTypeSettings} 
                        setQuestionTypeSettings={setQuestionTypeSettings} 
                    />
                )}
                {selectedSettingType === "Question Number" && (
                    <QuizQuestionCount 
                        questionCountSettings={questionCountSettings} 
                        setQuestionCountSettings={setQuestionCountSettings} 
                    />
                )}
                {selectedSettingType === "Behavior" && (
                    <QuizHints 
                        quizHintsSettings={quizHintsSettings} 
                        setQuizHintsSettings={setQuizHintsSettings} 
                    />
                )}
                {selectedSettingType === "Time Limit" && (
                    <QuizTime 
                        quizTimeSettings={quizTimeSettings} 
                        setQuizTimeSettings={setQuizTimeSettings} 
                        timeOn={timeOn} 
                        setTimeOn={setTimeOn} 
                    />
                )}
            </div>
        </div>
    );
}

export default QuizConfigContentBox;
