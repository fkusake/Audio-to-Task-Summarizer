import { ChatGoogleGenerativeAI } from "@langchain/google-genai";


const GeminiAI = () => {
    const aiOutput = new ChatGoogleGenerativeAI({
        model: "gemini-1.5-flash",
        temperature: 0,
        apiKey: `${process.env.GEMINI_KEY}`
    });
    return aiOutput;
}

export default GeminiAI;