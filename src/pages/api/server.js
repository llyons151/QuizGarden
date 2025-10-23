import { generateQuizQuestions } from "../../services/quiz_generator";

export default async function handler(req, res) {
  await listenForQuizGen(req, res);
}

async function listenForQuizGen(req, res) {
  if (req.method === "POST") {
    try {
      const quizData = req.body;  
      const quizQuestions = await generateQuizQuestions(quizData);
      res.status(200).json({
        success: true,
        receivedData: quizData,
        quizQuestions,  
      });
    } catch (error) {
      console.error("Error generating quiz questions:", error);
      res.status(400).json({ error: "Invalid JSON or failed to generate quiz." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

