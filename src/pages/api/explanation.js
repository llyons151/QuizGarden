import { generateQuestionExplanation } from "../../services/question_explanation";

export default async function handler(req, res) {
  await listenForQuestionExplanation(req, res);
}

async function listenForQuestionExplanation(req, res) {
  if (req.method === "POST") {
    try {
      const quizData = req.body;  
      const quizExplanation = await generateQuestionExplanation(quizData);
      res.status(200).json({
        success: true,
        receivedData: quizData,
        quizExplanation,  
      });
    } catch (error) {
      console.error("Error generating explanation:", error);
      res.status(400).json({ error: "Invalid JSON or failed to generate explanation." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
