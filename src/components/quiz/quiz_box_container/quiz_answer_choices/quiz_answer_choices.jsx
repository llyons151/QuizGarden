import React, { useState, useRef, useEffect } from 'react';
import '@/components/quiz/quiz.css';
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

export default function QuizAnswerChoices({ answerChoices, correctAnswer, selectedQuestionNumber,
  quizQuestion, setGeneratingExplanation, setQuizData, isReviewing, quizData, isHintActive, setIsHintActive }) {
  const [storedAnswers, setStoredAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const userAnswered = storedAnswers.hasOwnProperty(selectedQuestionNumber);
  const stored = localStorage.getItem("quizHintsSettings");
  const [buttonText, setButtonText] = useState("Generate Explanation")
  const timerRef = useRef(null);
  const explanation = quizData[selectedQuestionNumber - 1].explanation
  const hint = quizData[selectedQuestionNumber - 1].hint

  const [isGenerating, setIsGenerating] = useState(false);
  const { autoSubmit = false } = stored
    ? JSON.parse(stored)
    : "Off";

  useEffect(() => {
    setButtonText("Generate Explanation")
    setShowExplanation(false);
    setIsGenerating(false)
    setIsHintActive(false)
  }, [selectedQuestionNumber]);

  const handleAnswerClick = (index) => {
    if (isReviewing == true) return;
    if (autoSubmit && userAnswered) return;

    setStoredAnswers(prev => ({
      ...prev,
      [selectedQuestionNumber]: index
    }));

    // Update quiz data
    setQuizData((prevQuizData) => {
      const newQuizData = [...prevQuizData];
      const idx = selectedQuestionNumber - 1;

      if (idx >= 0 && idx < newQuizData.length) {
        newQuizData[idx] = {
          ...newQuizData[idx],
          isAnswerCorrect: correctAnswer === index,
          selectedAnswer: index,

        };
      }
      return newQuizData;
    });
  };

  const handleExplanationClick = () => {
    setIsGenerating(true)
    setButtonText("Generating...")
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowExplanation(true);
      setIsGenerating(false);
      setButtonText("Generate Explanation");
    }, 3000);
  }

  async function GenerateExplanation(clickedAnswerChoice) {
    try {
      const quizSettings = getQuizInfo(clickedAnswerChoice);
      const response = await fetch("/api/explanation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizSettings })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setGeneratingExplanation(false);
      const messageEvent = new CustomEvent('explanation-generated', { detail: { message: data } });
      window.dispatchEvent(messageEvent);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getQuizInfo = (clickedAnswerChoice) => {
    return {
      question: quizQuestion,
      correctAnswer: answerChoices[correctAnswer],
      selectedAnswer: answerChoices[clickedAnswerChoice],
    };
  };

  return (
    <div className='answer_choices_container'>
      {answerChoices.map((answer, index) => {
        const userAnswered = storedAnswers.hasOwnProperty(selectedQuestionNumber);
        const isSelected = userAnswered && storedAnswers[selectedQuestionNumber] === index;
        const isCorrect = index === correctAnswer;
        const revealCorrect = userAnswered && !isSelected && isCorrect;
        // Compute wrapper class
        let answerClass = '';
        if (isSelected && autoSubmit == true) {
          answerClass = isCorrect ? 'correct' : 'incorrect';
        } else if (revealCorrect && autoSubmit == true) {
          answerClass = 'correct';
        }

        if (isSelected && autoSubmit == false) {
          answerClass = "answer_choices_selected";

        }

        // inside your map for each answer...
        let leftDotClass = 'not_selected_answer';

        if (isSelected) {
          if (autoSubmit) {
            leftDotClass = isCorrect
              ? 'selected_answer'
              : 'selected_incorrect_answer';
          } else {
            leftDotClass = 'selected_answer';
          }

        } else if (autoSubmit && isCorrect && userAnswered) {
          leftDotClass = 'selected_answer';
        }

        // otherwise it stays 'not_selected_answer'

        // Prepare markdown
        const md = answer
          .split(/(\\[a-zA-Z]+(?:\{[^}]*\})?)/g)
          .map((seg) => (seg.startsWith('\\') ? `$$${seg}$$` : seg))
          .join('');

        return (
          <div className='answer_container' key={index}>
            <div
              className={`answer_choices ${answerClass}`}
              onClick={() => handleAnswerClick(index)}
            >

              <div className={` ${leftDotClass}`} />

              <div className='answer_text'>
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {md}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        );
      })}
      {showExplanation &&
        <div className='explanation_container'>
          <div className='explanation_header'>Explanation:</div>
          <div className='explanation'>{explanation}</div>
        </div>
      }
      {(userAnswered && autoSubmit == true && showExplanation == false) &&
        <button className='generate_explanation_button' onClick={
          handleExplanationClick
        }>
          {isGenerating
            ? <span className="spinner" aria-label="Loading"></span>
            : <img src="/images/sparkle.png" className="sparkle" alt="" />
          }
          {buttonText}</button>
      }

      {(isHintActive && !userAnswered) &&
        <div className='explanation_container'>
          <div className='explanation_header'>Hint:</div>
          <div className='explanation'>{hint}</div>
        </div>
      }
    </div>
  );
}
