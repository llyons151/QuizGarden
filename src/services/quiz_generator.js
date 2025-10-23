import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";
import Scrape from "@/pages/api/scrape.js";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

const pdf = pdfParse;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || process.env.API_KEY,
});

// --- helpers ---
const tryParseJson = (v) => {
    if (v == null) return null;
    if (typeof v === "object") return v;
    if (typeof v !== "string") return null;
    const t = v.trim();
    if (!(t.startsWith("{") || t.startsWith("["))) return null;
    try { return JSON.parse(t); } catch { return null; }
};
const coerceArray = (v) => {
    if (Array.isArray(v)) return v;
    const p = tryParseJson(v);
    if (Array.isArray(p)) return p;
    if (typeof v === "string" && v.length) return [v];
    return [];
};
const coerceDifficulty = (v) => {
    const obj = tryParseJson(v) ?? (typeof v === "object" ? v : null);
    if (obj && (obj.questionDifficulty || obj.answerDifficulty)) {
        return {
            questionDifficulty: obj.questionDifficulty ?? "medium",
            answerDifficulty: obj.answerDifficulty ?? obj.questionDifficulty ?? "medium",
        };
    }
    if (typeof v === "string" && v.trim()) {
        const d = v.trim();
        return { questionDifficulty: d, answerDifficulty: d };
    }
    return { questionDifficulty: "medium", answerDifficulty: "medium" };
};

export async function generateQuizQuestions(quizData) {
    try {
        if (!quizData?.quizSettings) throw new Error("quizData is missing quizSettings");

        let topics = coerceArray(quizData.quizSettings.resourcesList);
        const { questionDifficulty, answerDifficulty } = coerceDifficulty(
            quizData.quizSettings.difficultySettings
        );
        const questionTypeSettings =
            tryParseJson(quizData.quizSettings.questionTypeSettings) ??
            { questionType: "Multiple Choice", answerCount: 4 };
        const questionCount = Number(quizData.quizSettings.questionCountSettings ?? 10);
        const answerCount = Number(questionTypeSettings.answerCount ?? 4);

        topics = await updateTopics(topics);
        const topicNames = topics.map((t) => t.content).join(", ");

        const instructions = determineInstructions(
            questionTypeSettings,
            topicNames,
            questionDifficulty,
            answerDifficulty,
            questionCount,
            answerCount
        );

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: instructions },
                {
                    role: "user",
                    content: `Please generate ${questionCount} quiz questions on the topics [${topicNames}] with a "${questionDifficulty}" question difficulty and a "${answerDifficulty}" answer difficulty.`,
                },
            ],
            response_format: { type: "json_object" },
        });

        const responseContent = completion.choices[0]?.message?.content;
        if (!responseContent) throw new Error("No structured response received");
        const parsedQuiz = JSON.parse(responseContent);
        return parsedQuiz.questions || [];
    } catch (error) {
        console.error("Error generating quiz questions:", error);
        return { error: "Failed to generate quiz questions." };
    }
}

// ---- rest of your file stays the same below ----
// testQuestions, updateTopics, callScrape, extractTextFromBase64PDF, _base64ToArrayBuffer, convertDocxBase64ToText, shuffleParagraphs,
// determineInstructions, multipleChoiceFormat, trueFalseChoiceFormat, mixedChoiceFormat

function testQuestions() {
    return (
        [
            {
                question: 'Which period is known for having the most diverse dinosaur population?',
                choices: ['Triassic', 'Jurassic', 'Cretaceous', 'Permian'],
                correct_answer: 2,
                hint: 'Think of the period before the dinosaurs went extinct.'
            },
            {
                question: 'Which of the following dinosaurs is considered the largest carnivorous dinosaur?',
                choices: [
                    'Allosaurus',
                    'Spinosaurus',
                    'Tyrannosaurus Rex',
                    'Giganotosaurus'
                ],
                correct_answer: 1,
                hint: 'This dinosaur had a distinctive sail on its back.'
            },
            {
                question: 'What significant event marks the boundary between the Cretaceous and Paleogene periods?',
                choices: [
                    'The evolution of mammals',
                    'The first appearance of flowering plants',
                    'The extinction of non-avian dinosaurs',
                    'The formation of Pangaea'
                ],
                correct_answer: 2,
                hint: 'An asteroid impact is closely associated with this event.'
            },
            {
                question: 'Which dinosaur is known for having three horns on its face?',
                choices: ['Stegosaurus', 'Triceratops', 'Brachiosaurus', 'Ankylosaurus'],
                correct_answer: 1,
                hint: "Its name means 'three-horned face'."
            },
            {
                question: 'Which dinosaur group does the Velociraptor belong to?',
                choices: ['Sauropods', 'Theropods', 'Ceratopsians', 'Ankylosaurs'],
                correct_answer: 1,
                hint: 'This group is known for bipedal and often carnivorous dinosaurs.'
            },
            {
                question: 'Which dinosaur had a long neck and tail, and was one of the heaviest terrestrial animals?',
                choices: ['Diplodocus', 'Stegosaurus', 'Pteranodon', 'Protoceratops'],
                correct_answer: 0,
                hint: 'This dinosaur is a well-known member of the sauropod group.'
            },
            {
                question: 'Which dinosaur is thought to have used a head crest to create sounds?',
                choices: [
                    'Parasaurolophus',
                    'Iguanodon',
                    'Cryolophosaurus',
                    'Coelophysis'
                ],
                correct_answer: 0,
                hint: 'Its crest had hollow tubes that likely aided in communication.'
            },
            {
                question: 'Which herbivorous dinosaur is known for its spiked tail used for defense?',
                choices: ['Stegosaurus', 'Ankylosaurus', 'Edmontosaurus', 'Corythosaurus'],
                correct_answer: 0,
                hint: 'It had plates on its back and spikes on its tail.'
            },
            {
                question: 'Which dinosaur is hypothesized to have been a scavenger rather than an active predator?',
                choices: [
                    'Spinosaurus',
                    'Tyrannosaurus Rex',
                    'Velociraptor',
                    'Allosaurus'
                ],
                correct_answer: 1,
                hint: 'Despite its fearsome reputation, it might have relied on scavenging.'
            },
            {
                question: "Which dinosaur's name means 'swift thief'?",
                choices: ['Dromaeosaurus', 'Velociraptor', 'Carnotaurus', 'Oviraptor'],
                correct_answer: 1,
                hint: 'This small, agile dinosaur was made famous by a popular film series.'
            }
        ]
    )
}

async function updateTopics(topics) {
    // Process each topic asynchronously
    const updatedTopics = await Promise.all(
        topics.map(async (topic) => {
            if (topic.type === 'Web Link') {
                // Call callScrape using the URL in topic.content or a hard-coded URL if needed
                const data = await callScrape(topic.content);
                // Update the content field with the joined paragraphs
                return { ...topic, content: data.paragraphs.join(" ") };
            }

            if (topic.type === 'PDF/DOCX') {
                if (topic.fileType == "pdf") {
                    const text = await extractTextFromBase64PDF(topic.content);
                    return { ...topic, content: text };
                } else if (topic.fileType == "docx") {
                    const text = await convertDocxBase64ToText(topic.content);
                    return { ...topic, content: text };
                } else {
                    return;
                }
            }

            if (topic.type === 'Audio') {

            }

            return topic;
        })
    );
    return updatedTopics;
}

async function callScrape(url) {
    const req = { query: { url } };
    let result = null;

    const res = {
        status: (code) => ({
            json: (data) => {
                result = data;
            },
        }),
    };

    await Scrape(req, res);
    return result;
}

async function extractTextFromBase64PDF(base64String) {
    // Remove any data URL prefix (if present)
    const base64Data = base64String.includes(',')
        ? base64String.split(',')[1]
        : base64String;
    // Convert the base64 string to a Buffer
    const pdfBuffer = Buffer.from(base64Data, 'base64');

    try {
        const data = await pdf(pdfBuffer);
        return data.text;
    } catch (error) {
        console.error('Error extracting text from PDF:', error);
        throw error;
    }
}

// Convert Base64 string to ArrayBuffer
function _base64ToArrayBuffer(base64) {
    const binaryString = Buffer.from(base64, 'base64').toString('binary');
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

// Convert DOCX (in Base64 format) to plain text
async function convertDocxBase64ToText(base64Docx) {
    // If the Base64 string has a data URL prefix, remove it.
    let base64Data = base64Docx;
    const prefixIndex = base64Docx.indexOf("base64,");
    if (prefixIndex !== -1) {
        base64Data = base64Docx.substring(prefixIndex + 7);
    }

    // Convert Base64 to Buffer (Node.js)
    const docxBuffer = Buffer.from(base64Data, 'base64');

    try {
        // Pass the Buffer to mammoth.extractRawText using the "buffer" property
        const result = await mammoth.extractRawText({ buffer: docxBuffer });
        return result.value; // Extracted plain text
    } catch (error) {
        console.error("Error converting DOCX:", error);
        return "";
    }
}

// Example of randomizing paragraphs in text
function shuffleParagraphs(text) {
    const paragraphs = text.split('\n').filter(p => p.trim() !== '');
    // Basic shuffle
    for (let i = paragraphs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [paragraphs[i], paragraphs[j]] = [paragraphs[j], paragraphs[i]];
    }
    return paragraphs.join('\n');
}


function determineInstructions(questionTypeSettings, topicNames, questionDifficulty, answerDifficulty, questionCount, answerCount) {
    let instructions = ""
    if (questionTypeSettings.questionType === "Multiple Choice") {
        instructions += multipleChoiceFormat(topicNames, questionCount, questionDifficulty, answerDifficulty, answerCount)
    } else if (questionTypeSettings.questionType === "True/False") {
        instructions += trueFalseChoiceFormat(topicNames, questionCount, questionDifficulty, answerDifficulty)
    } else if (questionTypeSettings.questionType === "Both") {
        instructions += mixedChoiceFormat(topicNames, questionCount, questionDifficulty, answerDifficulty, answerCount)
    }
    instructions += `No extra text or markdown – only valid JSON.`;
    return instructions;
}

function multipleChoiceFormat(topicNames, questionCount, questionDifficulty, answerDifficulty, answerCount) {
    const format = `You are generating a multiple-choice quiz on the topics [${topicNames}].
            You will create exactly ${questionCount} questions.

            Each question must reflect the difficulty level: "${questionDifficulty}".
            Each answer must reflect the difficulty level: "${answerDifficulty}".

            Guidelines for question difficulty:
            - If "easy": Use simpler language, direct references, obviously incorrect distractors, short question stems.
            - If "medium": Use moderately challenging language, plausible distractors, and require some thought to answer.
            - If "hard": Use advanced/technical language, require deeper knowledge of the material, and provide tricky or subtle distractors.

            Your response must be valid JSON with the structure:

            {
              "questions": [
                {
                  "question": "...",
                  "choices": [/* exactly ${answerCount} entries */],
                  "correct_answer": 0,
                  "explanation": "fleshed out explanation explaining why the selected answer is incorrect and what makes the other correct, make it 3-4 full sentences",
                  "hint": "One sentence subdle hint"
                },
                ...
              ]
            }          
        }
`
    return format;
}

function trueFalseChoiceFormat(topicNames, questionCount, questionDifficulty, answerDifficulty) {
    const format = `You are generating a true/false quiz on the topics [${topicNames}].
  You will create exactly ${questionCount} questions.

            Each question must reflect the difficulty level: "${questionDifficulty}".
            Each answer must reflect the difficulty level: "${answerDifficulty}".

  Guidelines for question difficulty:
  - If "easy": Use simpler language, direct references, obviously incorrect distractors, short question stems.
  - If "medium": Use moderately challenging language, plausible distractors, and require some thought to answer.
  - If "hard": Use advanced/technical language, require deeper knowledge of the material, and provide tricky or subtle distractors.

  Your response must be valid JSON with the structure:

{
  "questions": [
    {
      "question": "The Earth revolves around the Sun.",
      "choices": ["True", "False"],
      "correct_answer": 0,
      "explanation": "The Earth revolves around the Sun as part of the solar system's dynamics.",
      "hint": "One sentence subdle hint"
    }
  ]
}
`
    return format;
}

function mixedChoiceFormat(topicNames, questionCount, questionDifficulty, answerDifficulty, answerCount) {
    return `You are generating a mixed-format quiz on the topics [${topicNames}].
You will create exactly ${questionCount} questions, mixing true/false and multiple‑choice:
  • At least 40% of the questions should be true/false (choices ["True","False"]).
  • The remainder should be multiple‑choice with exactly four options.

            Each question must reflect the difficulty level: "${questionDifficulty}".
            Each answer must reflect the difficulty level: "${answerDifficulty}".

Guidelines for question difficulty:
  - If "easy": Simple language, obvious distractors or statements.
  - If "medium": Moderately challenging language, plausible distractors or nuanced statements.
  - If "hard": Technical or detailed language, tricky distractors or subtle wording.

Your response must be valid JSON with this schema:

{
  "questions": [
    {
      "type": "true-false",           // or "multiple-choice"
      "question": "...",
      "choices": ["True","False"],    // for true/false
      "correct_answer": 0,
      "explanation": "..."
      "hint": "One sentence subdle hint"
    },
    {
      "type": "multiple-choice",
      "question": "...",
      "choices": [/* exactly ${answerCount} entries */],
      "correct_answer": 2,
      "explanation": "..."
      "hint": "One sentence subdle hint"
    }
    /* …repeat until you have ${questionCount} total… */
  ]
}

No extra text or markdown—only the JSON object above.`;
}
