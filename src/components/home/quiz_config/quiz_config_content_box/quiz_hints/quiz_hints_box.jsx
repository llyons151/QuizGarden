import React from 'react';
import '@/components/home/quiz_config/quiz_config_content_box/quiz_config_content_box.css'

export default function QuizHintsBox({ header, subHeader, peramiters, quizHintsSettings, setQuizHintsSettings }) {
  
  const hintKey = "hints";

  const handleHintSettings = (setting) => {
    setQuizHintsSettings((prev) => ({
      ...prev,
      [hintKey]: setting,
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
            className={`setting_button ${quizHintsSettings[hintKey] === param ? 'active' : ''}`} 
            onClick={() => handleHintSettings(param)}
          >
            {param}
          </button>
        ))}
      </div>
    </div>
  );
}
