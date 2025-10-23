import React, { useState } from 'react';
import '@/components/home/quiz_config/quiz_config_content_box/quiz_config_content_box.css';

export default function QuizAutoSubmitBox({
  header,
  subHeader,
  difficultySettings,
  setDifficultySettings,
}) {
  // Pull the current value straight from your parent state
  const autoSubmit = difficultySettings.autoSubmit ?? true;
  const [displayText, setDisplayText] = useState(autoSubmit==true ? "On" : "Off")

  const handleToggle = () => {
    const newValue = !autoSubmit;
    setDifficultySettings(prev => ({
      ...prev,
      autoSubmit: newValue,
    }));
    setDisplayText(newValue==true ? "On" : "Off")
  };

  return (
    <div className="setting_box_container">
      <div className="setting_header">{header}</div>
      <div className="setting_sub_header">{subHeader}</div>
      <div className='switch_on_container'>
        <label className="switch">
          <input
            type="checkbox"
            checked={autoSubmit}
            onChange={handleToggle}
          />
          <span className="slider round" />
        </label>
        <div className='on/off'>{displayText}</div>
      </div>
    </div>
  );
}
