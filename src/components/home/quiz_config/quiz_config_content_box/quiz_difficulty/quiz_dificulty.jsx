import React from 'react'
import QuizDifficultyBox from '@/components/home/quiz_config/quiz_config_content_box/quiz_difficulty/quiz_difficulty_box.jsx'
export default function QuizDifficulty({difficultySettings, setDifficultySettings}) {
  return (
    <div className='quiz_setting_container'>
        <QuizDifficultyBox 
          header={"Question Difficulty"} 
          subHeader={"Chose a base difficulty level"} 
          peramiters={["Easy", "Medium", "Hard", "Expert"]} 
          difficultySettings={difficultySettings}
          setDifficultySettings={setDifficultySettings}
        />

        <QuizDifficultyBox header={"Answer Difficulty"} 
          subHeader={"Chose a base difficulty level"} p
          peramiters={["Easy", "Medium", "Hard", "Expert"]}
          difficultySettings={difficultySettings}
          setDifficultySettings={setDifficultySettings}
        />
    </div>
  )
}
