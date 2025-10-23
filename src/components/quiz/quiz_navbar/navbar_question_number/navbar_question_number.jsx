import React from 'react';
import '@/components/quiz/quiz_navbar/quiz_navbar.css';

export default function NavbarQuestionNumber({
  number,
  selectedQuestionNumber,
  setSelectedQuestionNumber,
  isAnswerCorrect
}) {
  return (
    <div
      className={`number_container 
        ${number === selectedQuestionNumber ? 'selected' : ''} 
        ${isAnswerCorrect === true ? 'correct_number' : isAnswerCorrect === false ? 'incorrect_number' : ''}`}
      onClick={() => setSelectedQuestionNumber(number)}
    >
      {number}
    </div>
  );
}
