import React from 'react';
import '@/components/home/quiz_config/quiz_config_content_box/quiz_config_content_box.css'
import QuizTimeBox from '@/components/home/quiz_config/quiz_config_content_box/quiz_time/quiz_time_box.jsx'

export default function QuizTime({ quizTimeSettings, setQuizTimeSettings, timeOn, setTimeOn}) {
    return(
        <div className='quiz_setting_container'>
            <QuizTimeBox 
                header={"Select Quiz Time"} 
                subHeader={"Would you like your quiz To Be timed, if so, how long(in minuits)?"} 
                quizTimeSettings={quizTimeSettings}
                setQuizTimeSettings={setQuizTimeSettings}
                timeOn={timeOn}
                setTimeOn={setTimeOn}
            />
        </div>
        
    );
}
