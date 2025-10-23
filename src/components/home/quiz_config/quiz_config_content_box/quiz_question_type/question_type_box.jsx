import React from 'react';
import '@/components/home/quiz_config/quiz_config_content_box/quiz_config_content_box.css'

export default function QuestionTypeBox({ header, subHeader, peramiters, questionTypeSettings, setQuestionTypeSettings }) {
  
  const questionKey = header ==  "Question Type Select" ? "questionType" : "answerCount";

  const handleQuestionSettings = (setting) => {
    setQuestionTypeSettings((prev) => ({
      ...prev,
      [questionKey]: setting,
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
            className={`setting_button ${questionTypeSettings[questionKey] === param ? 'active' : ''}`} 
            onClick={() => handleQuestionSettings(param)}
          >
            {param}
          </button>
        ))}
      </div>
    </div>
  );
}
