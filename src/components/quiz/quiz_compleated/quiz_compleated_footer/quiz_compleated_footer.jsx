import React, { useState } from 'react'
import '@/components/quiz/quiz_compleated/quiz_compleated.css'

export default function QuizCompleatedFooter({ setIsCompletionScreenActive, setIsQuizActive, setQuizData, setIsReviewing}) {

    function handleQuizReset(){
        setQuizData({})
        setIsQuizActive(false)
    }

    return (
        <div className='quiz_footer_container'>

            <button className='back_to_quiz_button' onClick={() => {
                setIsCompletionScreenActive(false);
                setIsReviewing(true)
            }}> Review </button>

            <button className='home_button' onClick={() => {
                handleQuizReset()
            }}> Home </button>

        </div>
    )
}
