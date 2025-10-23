import React from 'react';
import '@/components/home/quiz_config/quiz_config_content_box/quiz_config_content_box.css'
import QuestionTypeBox from '@/components/home/quiz_config/quiz_config_content_box/quiz_question_type/question_type_box.jsx'

export default function QuizQuestionType({ questionTypeSettings, setQuestionTypeSettings }) {
    return(
        <div className='quiz_setting_container'>
            <QuestionTypeBox 
                header={"Question Type Select"} 
                subHeader={"Choose one or multiple question types to appear on your quiz"} 
                peramiters={["Multiple Choice", "True/False", "Both"]} 
                questionTypeSettings={questionTypeSettings}
                setQuestionTypeSettings={setQuestionTypeSettings}
            />

            <QuestionTypeBox 
                header={"Answer Count"} 
                subHeader={"How many answer choices do you want per multiple choice question"} 
                peramiters={["Two", "Three", "Four", "Five"]} 
                questionTypeSettings={questionTypeSettings}
                setQuestionTypeSettings={setQuestionTypeSettings}
            />

        </div>
        
    );
}
