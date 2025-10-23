import AutoSubmitBox from '@/components/home/quiz_config/quiz_config_content_box/auto_submit/auto_submit_box.jsx'
export default function AutoSubmit({quizHintsSettings, setQuizHintsSettings}) {
  return (
    <div className='quiz_setting_container'>
        <AutoSubmitBox 
          header={"Auto Submit"} 
          subHeader={"Show answer on select?"} 
          peramiters={["On", "Off"]} 
          difficultySettings={quizHintsSettings}
          setDifficultySettings={setQuizHintsSettings}
        />
    </div>
  )
}
