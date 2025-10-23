import React, { useState } from 'react';

export default function QuizQuestionCount({ questionCountSettings, setQuestionCountSettings }) {
  const [inputValue, setInputValue] = useState(questionCountSettings);

  const handleUpdate = () => {
    let value = parseInt(inputValue, 10);
    if (!isNaN(value) && Number.isInteger(value)) {
      value = Math.min(50, Math.max(5, value));
      setQuestionCountSettings(value);
      setInputValue(value);
    } else {
      setInputValue(questionCountSettings);
    }
  };

  return (
    <div className='setting_box_container'>
      <div className='setting_header'>Number of Questions</div>
      <div className='setting_sub_header'>Enter the amount of questions you would like to generate on your quiz</div>
      <input 
        type="number" 
        className="time_input_box" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleUpdate}
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
            handleUpdate();
            e.target.blur();
            }
        }}
        min="5" max="30"
        />
    </div>
  );
}
