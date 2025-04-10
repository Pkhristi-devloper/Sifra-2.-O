// geminiClient.js
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const apiKey = "AIzaSyCxnz1Q2ZCkQKkMVugZT6bIsTGLpXzr5Xw"; // ⚠️ Don't expose this in production

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 100,
};

async function run(prompt = "Tell me a joke!") {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    const textOutput = result.response.text();
    return textOutput;
  } catch (err) {
    console.error("Error running Gemini:", err);
    return "Oops! Something went wrong 😢";
  }
}

export default run