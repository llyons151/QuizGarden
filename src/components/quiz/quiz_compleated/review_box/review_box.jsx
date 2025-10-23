import '@/components/quiz/quiz_compleated/quiz_compleated.css'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

export default function ReviewBox({ questionNumber, quizData }) {
  const correctAnswer = quizData[questionNumber - 1].choices[quizData[questionNumber - 1].correct_answer]
  const formatedCorrectAnswer = correctAnswer
    .replace(
        /\\\(\s*([\s\S]+?)\s*\\\)/g,
        (_m, tex) => `$${tex}$`    
      );

  const incorrectAnswer = quizData[questionNumber - 1].choices[quizData[questionNumber - 1].selectedAnswer]
  const formatedIncorrectAnswer =
    (incorrectAnswer || "No Answer")
      .replace(
        /\\\(\s*([\s\S]+?)\s*\\\)/g,
        (_m, tex) => `$${tex}$`  
      );

  const question = quizData[questionNumber - 1].question
  const formatedQuestion = question
    .replace(/\\\(\s*(.*?)\s*\\\)/g, '$$$1$$')

  return (
    <div className='review_box_container'>
      <div className='review_box_container_sub'>

        <div className='question_number'>Question {questionNumber}</div>
        <div className='review_box_header'>
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {formatedQuestion}
          </ReactMarkdown>
        </div>

        <div className='review_answer_correct'>
          <div className='answer_header'>Correct Answer:</div>
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {formatedCorrectAnswer}
          </ReactMarkdown>
        </div>

        {quizData[questionNumber - 1].isAnswerCorrect != true &&
          <div className='review_answer_incorrect'>
            <div className='answer_header'>Your Answer:</div>
            <div>
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {formatedIncorrectAnswer}
              </ReactMarkdown>
            </div>
          </div>

        }

      </div>
    </div>
  )
}