import React, { useEffect, useState, useRef } from 'react';
import '@/components/quiz/quiz_box_container/quiz_box_container.css'

import QuizQuestion from '@/components/quiz/quiz_box_container/quiz_question/quiz_question.jsx'
import QuizAnswerChoices from '@/components/quiz/quiz_box_container/quiz_answer_choices/quiz_answer_choices.jsx'
import QuizHint from '@/components/quiz/quiz_box_container/quiz_hint/quiz_hint.jsx'
import QuizExplanation from '@/components/quiz/quiz_box_container/quiz_explanation/quiz_explanation.jsx'
import SubmitButton from '@/components/quiz/quiz_box_container/submit_button/submit_button.jsx'
export default function QuizBoxContainer({ quizData, selectedQuestionNumber, showHint, setShowHint, setQuizData, setIsCompletionScreenActive, isReviewing, setIsQuizActive }) {
  const [hintsAsked, setHintsAsked] = useState([])
  const [generatingExplanation, setGeneratingExplanation] = useState(false)
  const [isHintActive, setIsHintActive] = useState(false)
  return (
    <div className='quiz_container_wrapper'>



        
        <div className='question_header_container'>


          <QuizQuestion quizQuestion={quizData[selectedQuestionNumber - 1].question} />
          <QuizHint selectedQuestionNumber={selectedQuestionNumber} hintsAsked={hintsAsked} setHintsAsked={setHintsAsked} isHintActive={isHintActive} setIsHintActive={setIsHintActive} />

        </div>

        <QuizAnswerChoices answerChoices={quizData[selectedQuestionNumber - 1].choices}
          correctAnswer={quizData[selectedQuestionNumber - 1].correct_answer}
          selectedQuestionNumber={selectedQuestionNumber}
          quizQuestion={quizData[selectedQuestionNumber - 1].question}
          setGeneratingExplanation={setGeneratingExplanation}
          setQuizData={setQuizData}
          isReviewing={isReviewing} 
          quizData={quizData}
          isHintActive={isHintActive}
          setIsHintActive={setIsHintActive}
          />

        {/*if showhint is true and theres no shown explanation/generation*/}
        {(showHint && !quizData?.[selectedQuestionNumber - 1].explanation && generatingExplanation == false)
          && <div className='hint_text_container'>
            <div className='hint_text_header'> Hint </div>
            <div className='hint_text'> {quizData[selectedQuestionNumber - 1].hint} </div>
          </div>}


        {/*
  {generatingExplanation && (
    <div className="generating_explanation_container">
      {generatingExplanationAnimation}
    </div>
  )}

  {quizData?.[selectedQuestionNumber - 1].explanation && (
    <QuizExplanation
      quizData={quizData}
      selectedQuestionNumber={selectedQuestionNumber}
    />
  )}
*/}


      </div>

  )
}
