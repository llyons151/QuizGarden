import '@/components/quiz/quiz.css';
import React, { useState, useEffect } from 'react';

export default function QuizTimerContainer({ quizTime, setQuizTime }) {
    const [isPaused, setIsPaused] = useState(false);
    const [time, setTime] = useState(quizTime * 60 || 404);
    const [isTimerActive, setIsTimerActive] = useState(true);

    useEffect(() => {
        if(time == 404){
            setIsPaused(true);
            setTime(1800)
        }
        const interval = setInterval(() => {
            if (!isPaused && time > 0) {
                setTime(prev => prev - 1);
                setQuizTime(prev => prev - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isPaused, time, setQuizTime]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    const pauseText = isPaused ? "Resume Timer" : "Pause Timer";


    return (
        <div className='quiz_timer_container'>
                <div className="title_header">
                    <div className="green">Quiz</div>
                    <div className="black">Garden</div>
                </div>


            <div className='timer_container'>
                <div className='timer_display_container'>
                    <div className='timer_display'>
                        <img src="/images/clock_green.png" alt="clock" className='clock' onClick={() => {
                            setIsTimerActive(true)
                        }} />
                        {formatTime(time)}
                    </div>
                    <img src="/images/down-arrow.png" alt="" className='down_arrow' onClick={() => {
                        setIsTimerActive(false);
                    }} />
                </div>

                <div className='pause_timer' onClick={() => {
                    setIsPaused(!isPaused);
                }}>{pauseText}</div>
            </div>

        </div>
    );
}
