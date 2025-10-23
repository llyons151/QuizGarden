"use client";

import React, { useEffect, useState } from 'react';
import QuizBoxContainer from "@/components/quiz/quiz_box_container/quiz_box_container.jsx";
import QuizNavbar from "@/components/quiz/quiz_navbar/quiz_navbar.jsx";
import QuizCompleated from "@/components/quiz/quiz_compleated/quiz_compleated.jsx";
import QuizProgressBar from '@/components/quiz/quiz_box_container/quiz_progress_bar/quiz_progress_bar.jsx'
import QuizTimerContainer from '@/components/quiz/quiz_timer_container/quiz_timer_container.jsx'
import LoadingQuiz from '@/components/quiz/loading_quiz/loading_quiz.jsx'

import '@/components/quiz/quiz.css';

export default function Quiz({ setIsQuizActive }) {
  const [isReviewing, setIsReviewing] = useState(false);

  const [selectedQuestionNumber, setSelectedQuestionNumber] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const [quizData, setQuizData] = useState([]);

  const [storedQuizData, setStoredQuizData] = useState([]);

  const [showHint, setShowHint] = useState(false);

  const [showExplanation, setShowExplanation] = useState(false);

  const [isCompletionScreenActive, setIsCompletionScreenActive] = useState(false);

  const [quizTime, setQuizTime] = useState(localStorage.getItem('quizTimeSettings') || 0)


  useEffect(() => {
    const handleMessage = (event) => {
      setIsLoading(false);
      setQuizData(event.detail.message.quizQuestions || []);
      setStoredQuizData(event.detail.message.quizQuestions || [])
    };

    window.addEventListener('quiz-generated', handleMessage);
    return () => {
      window.removeEventListener('quiz-generated', handleMessage);
    };
  }, []);

  useEffect(() => {
    setShowHint(false)
    const handleMessage = (event) => {
      setShowExplanation(true);

      setQuizData((prevQuizData) => {
        const newQuizData = [...prevQuizData];

        const idx = selectedQuestionNumber - 1;

        if (idx >= 0 && idx < newQuizData.length) {
          newQuizData[idx] = {
            ...newQuizData[idx],
            explanation: event.detail.message,
          };
        }

        return newQuizData;
      });
    };

    window.addEventListener('explanation-generated', handleMessage);
    return () => {
      window.removeEventListener('explanation-generated', handleMessage);
    };
  }, [selectedQuestionNumber]);

  if (isLoading) {
    return <LoadingQuiz/>
  }


  if (!isCompletionScreenActive) {
    return (
      <div className='quiz_wrapper_container'>
        <div className="quiz_wrapper">

        <div className='header_wrapper'>

        <QuizTimerContainer
          quizTime={quizTime}
          setQuizTime={setQuizTime}/>

          <QuizProgressBar
            quizData={quizData}
            selectedQuestionNumber={selectedQuestionNumber}
          />

        </div>

          <QuizBoxContainer
            quizData={quizData}
            setQuizData={setQuizData}
            selectedQuestionNumber={selectedQuestionNumber}
            showHint={showHint}
            setShowHint={setShowHint}
            showExplanation={showExplanation}
            setIsCompletionScreenActive={setIsCompletionScreenActive}
            isReviewing={isReviewing}
            setIsQuizActive={setIsQuizActive}
          />
          <QuizNavbar
            selectedQuestionNumber={selectedQuestionNumber}
            setSelectedQuestionNumber={setSelectedQuestionNumber}
            setShowHint={setShowHint}
            quizData={quizData}
            setIsCompletionScreenActive={setIsCompletionScreenActive}
            setIsQuizActive={setIsQuizActive}

          />
        </div>

      </div>
    );
  }

  if (isCompletionScreenActive) {
    return (
      <QuizCompleated
        setIsCompletionScreenActive={setIsCompletionScreenActive}
        quizData={quizData}
        setIsQuizActive={setIsQuizActive}
        setQuizData={setQuizData}
        setIsReviewing={setIsReviewing}
        setSelectedQuestionNumber={setSelectedQuestionNumber}
        storedQuizData={storedQuizData}
      />
    )
  }
}
