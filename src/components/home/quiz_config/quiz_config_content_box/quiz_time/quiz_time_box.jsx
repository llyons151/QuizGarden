import React, { useEffect, useState } from 'react';
import '@/components/home/quiz_config/quiz_config_content_box/quiz_config_content_box.css';

export default function QuizTimeBox({ header, subHeader, quizTimeSettings, setQuizTimeSettings, timeOn, setTimeOn }) {
    const [inputValue, setInputValue] = useState(quizTimeSettings || 30);

    useEffect(() => {
        if (timeOn) {
            setQuizTimeSettings(inputValue);
        } else {
            setQuizTimeSettings(null);
        }
    }, [timeOn, setQuizTimeSettings]);

    const handleUpdate = () => {
        let value = parseInt(inputValue, 10);
        if (!isNaN(value) && Number.isInteger(value)) {
            value = Math.min(60, Math.max(5, value));
            setInputValue(value);
            setQuizTimeSettings(value); 
        } else {
            setInputValue(30); 
            setQuizTimeSettings(30);
        }
    };

    return (
        <div className='setting_box_container'>
            <div className='setting_header'>{header}</div>
            <div className='setting_sub_header'>{subHeader}</div>
            <div className='flex_right_container'>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={timeOn}
                        onChange={() => setTimeOn(prev => !prev)}
                    />
                    <span className="slider round"></span>
                </label>
                <input
                    type="number"
                    className={`time_input_box ${!timeOn ? 'disabled_input' : ''}`} 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={handleUpdate}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleUpdate();
                            e.target.blur();
                        }
                    }}
                    min="5" 
                    max="60"
                    disabled={!timeOn} 
                />
            </div>
        </div>
    );
}
