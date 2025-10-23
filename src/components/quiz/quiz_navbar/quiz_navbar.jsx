import '@/components/quiz/quiz_navbar/quiz_navbar.css';
import NavbarQuestionNumber from '@/components/quiz/quiz_navbar/navbar_question_number/navbar_question_number.jsx';
import { useEffect, useState } from 'react';

export default function QuizNavbar({ selectedQuestionNumber, setSelectedQuestionNumber, setShowHint, quizData, setIsCompletionScreenActive, setIsQuizActive }) {

  const totalQuestions = localStorage.getItem("questionCountSettings") || 10;
  const totalButtons = 10;
  const halfButtons = Math.floor(totalButtons / 2);
  const start = Math.max(1, selectedQuestionNumber - halfButtons);
  const end = Math.min(totalQuestions, start + totalButtons - 1);
  const adjustedStart = Math.max(1, end - totalButtons + 1);
  const [previousButtonClass, setPreviousButtonClass] = useState("")
  const [nextButtonText, setNextButtonText] = useState("Next")

  useEffect(() => {
    setPreviousButtonClass(selectedQuestionNumber != 1 ? "green_button" : "");
    setNextButtonText(selectedQuestionNumber == quizData.length ? "Submit Quiz" : "Next")
  }, [selectedQuestionNumber]);

  return (
    <div className="quiz_navbar_wrapper">
      <button className={`previous_question ${previousButtonClass}`} onClick={() => {
        if (selectedQuestionNumber == 1) return;
        setSelectedQuestionNumber(selectedQuestionNumber - 1);
        setShowHint(false)
      }} >
        {selectedQuestionNumber == 1 && (
          <img src="/images/grey_arrow.png" className='grey_arrow' />
        )}
        {selectedQuestionNumber != 1 && (
          <img src="/images/arrow_left_green.png" className='grey_arrow' />
        )}

        Previous
      </button>



      {/*
      
            <div className='question_numbers_container'>
        {Array.from({ length: end - adjustedStart + 1 }, (_, i) => adjustedStart + i).map((num) => (
          <NavbarQuestionNumber
            key={num}
            number={num}
            selectedQuestionNumber={selectedQuestionNumber}
            setSelectedQuestionNumber={setSelectedQuestionNumber}
            isAnswerCorrect={quizData[num - 1].isAnswerCorrect}
          />
        ))}
      </div>
      
      */}

      <button className='next_question' onClick={() => {
        if (selectedQuestionNumber == totalQuestions){
          setIsCompletionScreenActive(true)
          return
        };
        setSelectedQuestionNumber(selectedQuestionNumber + 1);
        setShowHint(false)

      }} > {nextButtonText}

        {nextButtonText == "Next" &&
          <img src="/images/arrow_right_white.png" className='right_arrow' />
        }


      </button>
    </div>
  );
}

