import '@/components/home/quiz_config/quiz_config_navbar/quiz_config_navbar.css';

function QuizConfigNavbar({selectedSettingType, setSelectedSettingType }) {
    const settingTypes = [
        { type: "Difficulty", icon: "📝" },
        { type: "Question Type", icon: "🔗" },
        { type: "Question Number", icon: "📂" },
        { type: "Behavior", icon: "🎥" },
        { type: "Time Limit", icon: "🖼️" }
    ];

    const handleSelectSetting = (type) => {
        setSelectedSettingType(type);
    };

    return (
        <div className='quiz_config_navbar_container'>
            <div className='button_container'>
                {settingTypes.map((setting, index) => (
                    <div 
                        key={index} 
                        className={`header_button ${selectedSettingType === setting.type ? 'active' : ''}`} 
                        onClick={() => handleSelectSetting(setting.type)}
                    >
                        {setting.type}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuizConfigNavbar;
