import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import '@/components/quiz/quiz_box_container/quiz_box_container.css'

export default function QuizQuestion({ quizQuestion }) {
  let md = quizQuestion
    // convert any \(…\) into $$…$$
    .replace(/\\\(\s*([\s\S]+?)\s*\\\)/g, (_m, tex) => `$$${tex}$$`)
    // now catch raw (AB)^-1 or similar and wrap it too
    .replace(/\([A-Za-z]+\)\^\-?\d+/g, match => `$$${match}$$`);

  return (
    <div className="quiz_question">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {md}
      </ReactMarkdown>
    </div>
  );
}
