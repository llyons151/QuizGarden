export async function GenerateQuiz() {
    try {
        const quizSettings = getQuizInfo();
        const response = await fetch("/api/server", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({quizSettings}) 
        });

        if (!response.ok) {
            throw new Error("HTTP error! Status: ${response.status}");
        }

        const data = await response.json();
        const messageEvent = new CustomEvent('quiz-generated', { detail: { message: data } });
        window.dispatchEvent(messageEvent);
        return data;
    } catch (error) {
        console.error("Error sending message:", error);
    }
};

const getQuizInfo = () => {
    return {
        difficultySettings: localStorage.getItem("difficultySettings") || "medium",
        questionTypeSettings: localStorage.getItem("questionTypeSettings") || "multiple",
        questionCountSettings: localStorage.getItem("questionCountSettings") || "10",
        quizHintsSettings: localStorage.getItem("quizHintsSettings") || "false",
        timeOn: localStorage.getItem("timeOn") || "false",
        quizTimeSettings: localStorage.getItem("quizTimeSettings") || "30",
        resourcesList: localStorage.getItem("resourcesList") || ""
    };
};
