import React, { useEffect,useState } from 'react'
import '@/components/quiz/quiz.css';

export default function QuizExplanation(quizData) {

  const [fullExplanation, setFullExplanation] = useState("");
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setFullExplanation(quizData.quizData[quizData.selectedQuestionNumber - 1].explanation.quizExplanation || "")
    setDisplayedText("")
  },[quizData.selectedQuestionNumber])


  useEffect(() => {
    let delay = 2;
    let min = 10;
    let max = 55;
    let index = 0;
    const interval = setInterval(()=>{
      delay = Math.floor(Math.random() * (max - min + 1)) + min;
        if(index == 0){
          setDisplayedText(fullExplanation[0])
        }
        setDisplayedText(prev => prev + fullExplanation[index])
        index++;

      if(index >= fullExplanation.length-1){
        clearInterval(interval)
      }
    }, delay)

    return () => clearInterval(interval);
  },[fullExplanation])

  return (
    <div className='explanation_container'>
      <div className='explanation_header'>Explanation:</div>
      {displayedText}
      </div>
  )
}
