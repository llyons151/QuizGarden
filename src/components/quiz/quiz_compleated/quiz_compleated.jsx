import React, { useState, useEffect } from 'react'
import '@/components/quiz/quiz_compleated/quiz_compleated.css'
import ReviewBox from '@/components/quiz/quiz_compleated/review_box/review_box.jsx'
export default function QuizCompleated({ setIsCompletionScreenActive, quizData, setIsQuizActive, setQuizData, setSelectedQuestionNumber, storedQuizData }) {
  function calculateScore() {
    let correctAnswers = 0;
    for (let i = 0; i < quizData.length; i++) {
      if (quizData[i].isAnswerCorrect === true) {
        correctAnswers++;
      }
    }
    return correctAnswers;
  }

  const precentScore = Math.round(
    calculateScore() / quizData.length * 100
  );

  return (
    <div className='section_wrapper'>

      <div className='quiz_compleated_container'>

        <div className='header_container'>
          <div className='header_text'>Practice Exam Complete!</div>
          <div className='header_subtext'>You answered {calculateScore()} out of {quizData.length} questions correctly.</div>
          <div className='score_display'> {precentScore}% </div>
        </div>

        <div className='review_container'>
          <div className='review_header'>Question Review</div>

          {quizData.map((item, index) => (
            <ReviewBox
              key={index}
              questionNumber={index + 1}
              quizData={quizData}
            />
          ))}
        </div>

      </div>

      <div className='footer_contaner'>
        <div className='home_button' onClick={() => {
          window.scrollTo(0, 0);
          setIsQuizActive(false);
          setQuizData({})
          setIsCompletionScreenActive(false)
        }}> Back To Home</div>
        <div className='try_again_button' onClick={() => {
          setQuizData(storedQuizData)
          setSelectedQuestionNumber(1)
          setIsCompletionScreenActive(false)
        }}> Try Again </div>
      </div>
    </div>
  )
}
