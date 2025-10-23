import React from 'react'
import QuizHintsBox from '@/components/home/quiz_config/quiz_config_content_box/quiz_hints/quiz_hints_box.jsx'
import AutoSubmit from '../auto_submit/auto_submit';

export default function QuizHints({quizHintsSettings, setQuizHintsSettings}) {
  
  return (
    <div className='quiz_setting_container'>
        <QuizHintsBox 
          header={"Hint Settings"} 
          subHeader={"Select A Hint Setting"} 
          peramiters={["None", "Few", "Many", "Unlimited"]} 
          quizHintsSettings={quizHintsSettings}
          setQuizHintsSettings={setQuizHintsSettings}
        />
                <AutoSubmit
        quizHintsSettings={quizHintsSettings}
        setQuizHintsSettings={setQuizHintsSettings}/>

    </div>
  )
}
