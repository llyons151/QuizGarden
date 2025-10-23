import React, { useState, useEffect } from 'react';
import '@/components/quiz/quiz_compleated/quiz_compleated.css';

export default function QuizCompleatedHeader({ quizData }) {
  const [correctQuestions, setCorrectQuestions] = useState(0);
  const quizLength = quizData.length;

  // Calculate score when quizData changes
  useEffect(() => {
    calculateScore();
  }, [quizData]);

  function calculateScore() {
    let correctAnswers = 0;
    for (let i = 0; i < quizData.length; i++) {
      if (quizData[i].isAnswerCorrect === true) {
        correctAnswers++;
      }
    }
    setCorrectQuestions(correctAnswers);
  }

  function determineVictoryMessage(scorePercentage) {
    if (scorePercentage >= 90) {
      return "outstanding performance!";
    } else if (scorePercentage >= 75) {
      return "amazing job!";
    } else if (scorePercentage >= 50) {
      return "good effort, but you can do even better!";
    } else {
      return "keep practicing and you'll improve!";
    }
  }

  function determineCongratulatoryMessage(scorePercentage) {
    if (scorePercentage >= 70) {
      return "Congratulations!";
    } else {
      return "Nice Try!";
    }
  }
  // Derive score percentage based on state
  const scorePercentage = quizLength > 0 ? (correctQuestions / quizLength) * 100 : 0;

  return (
    <div className='quiz_header_container'>
      <div className='congratulations'>{determineCongratulatoryMessage(scorePercentage)}</div>
      <div className='quiz_score'>
        You answered {correctQuestions} out of {quizLength} questions correctly, {determineVictoryMessage(scorePercentage)}
      </div>
      <div className='quiz_score'>
        Score: {scorePercentage.toFixed(2)}%
      </div>
    </div>
  );
}
