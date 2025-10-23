
import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";

// Initialize OpenAI with API Key
const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});

export async function generateQuestionExplanation(questionInfo) {
    try {
        if (!questionInfo) {
            throw new error("no data found")
        }
        const question = questionInfo.quizSettings.question;
        const selectedAnswer = questionInfo.quizSettings.selectedAnswer;
        const correctAnswer = questionInfo.quizSettings.correctAnswer;
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `You are generating an explanation for why the selected question is wrong and what makes the correct one right, 
                    Your response must be a JSON object with the following structure:          
                    {
                    "explanation": "Your concise explanation here"
                    }
            Rules:
            - make sure the explanation is clear and consise and is 2 to 3 sentences long
            - **Return only valid JSON. Do not include any extra text or Markdown.**`
                },
                { role: "user", content: `Generate an explanation for the following question (${question}) 
                on why ${selectedAnswer} is wrong and why ${correctAnswer} is correct, make it 3 sentances at most` }
            ],
            response_format: { type: "json_object" }
        });
        
        const responseContent = completion.choices[0]?.message?.content;
        const parsedContent = JSON.parse(responseContent);
        return parsedContent.explanation;
        
    } catch (error) {
        console.error("Error generating explanation:", error);
        return { error: "Failed to generate explanation." };
    }
}