import React from 'react'
import '@/components/quiz/quiz.css';

export default function QuizHint({selectedQuestionNumber, hintsAsked, setHintsAsked, isHintActive, setIsHintActive}) {
  const handleHintClick = () => {
  
    if (hintsAsked.length > 3 && !hintsAsked.includes(selectedQuestionNumber)) return;
  
    if (hintsAsked.includes(selectedQuestionNumber)) {
      setIsHintActive(!isHintActive);
      return;
    } else {
      setIsHintActive(!isHintActive);
    }
  
    setHintsAsked(prevHints => [...prevHints, selectedQuestionNumber]); 
  };
    
  return (
    <div className='quiz_hint_container'>
        <img className='question_icon' src="/images/tips.png" alt="Hint" onClick={() => {
          handleHintClick();
        }}/>
    </div>
  )
}
