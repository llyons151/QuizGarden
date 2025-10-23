import React from 'react';
import '@/components/home/quiz_config/quiz_config_content_box/quiz_config_content_box.css'

export default function QuizDifficultyBox({ header, subHeader, peramiters, difficultySettings, setDifficultySettings }) {
  
  const difficultyKey = header === "Question Difficulty" ? "questionDifficulty" : "answerDifficulty";

  const handleDifficultySettings = (setting) => {
    setDifficultySettings((prev) => ({
      ...prev,
      [difficultyKey]: setting,
    }));
  };

  return (
    <div className='setting_box_container'>
      <div className='setting_header'>{header}</div>
      <div className='setting_sub_header'>{subHeader}</div>
      <div className='setting_selector_container'>
        {peramiters.map((param, index) => (
          <button 
            key={index} 
            className={`setting_button ${difficultySettings[difficultyKey] === param ? 'active' : ''}`} 
            onClick={() => handleDifficultySettings(param)}
          >
            {param}
          </button>
        ))}
      </div>
    </div>
  );
}
