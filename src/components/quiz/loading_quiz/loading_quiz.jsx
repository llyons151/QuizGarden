import '@/components/quiz/loading_quiz/loading_quiz.css'
import React, { useState, useEffect } from 'react'

export default function LoadingQuiz() {
    const [loadingDots, setLoadingDots] = useState(".");
    const [headerText, setHeaderText] = useState("Generating Quiz")

    const headerArray = [
        "Generating Quiz",
        "Fetching Questions",
        "Analyzing Topics",
        "Loading Question Settings",
        "Loading Difficulty Settings",
        "Loading Time Settings",
        "Loading Question Type Settings",
        "Assembling Questions",
        "Formatting Answers",
        "Randomizing Questions",
        "Shuffling Choices",
        "Verifying Answer Keys",
        "Crunching Data",
        "Finalizing Quiz",
        "Wrapping Up",
        "Almost Ready",
    ];

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < headerArray.length){
                setHeaderText(headerArray[i])
                i++;
            } 
        }, 2500)
        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingDots(prev =>
                prev.length >= 3 ? '.' : prev + '.'
            );
        }, 300);

        return () => clearInterval(interval);
    }, []);

    const [firstWord, ...restWords] = headerText.split(' ');
    const restText = restWords.join(' ');

  return (
    <div className='loading_container'>
      <div className='loader_header'>
        <span className='first-word'>{firstWord}</span>
        <span>{restText && ' ' + restText}</span>
        <span className='dots'>{loadingDots}</span>
      </div>
      <div className='loader'></div>
    </div>
  );
}