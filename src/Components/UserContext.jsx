/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import run from "../Components/Api";

// eslint-disable-next-line react-refresh/only-export-components
export const dataContext = createContext();

let UserContext = ({ children }) => {
  const [speaking, setSpeaking] = useState(false);
  const [prompt, setPrompt] = useState("Listening...");
  const [response, setResponse] = useState(false);
  function speak(text) {
    let textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.volume = 1;
    textSpeak.rate = 1;
    textSpeak.pitch = 1;
    textSpeak.lang = "hi-GB";
    window.speechSynthesis.speak(textSpeak);

    textSpeak.onend = () => {
      setSpeaking(false);
      setResponse(false);
      setPrompt("Listening...")
    };
  }
  async function aiResponse(prompt) {
    let ans = await run(prompt);
    let newAns = ans
      .replace(/\*/g, "")
      .replace(/Google/g, "Priyanshu Khristi")
      .replace(/google/g, "Priyanshu Khristi")
      .replace(/Google\./g, "Priyanshu Khristi.")
      .replace(/google\./g, "Priyanshu Khristi.")
      .replace(/a large language model/g, "Sifra 2.O");
    console.log(newAns);
    takeCommands(newAns);
    return newAns;
  }
  function takeCommands(msg) {
    if (msg.includes("youtube") && msg.includes("open")) {
      window.open("https://www.youtube.com/", "_blank");
      speak("opening Youtube");
      setPrompt("Opening Youtube...");
    } else if (msg.includes("leetcode") && msg.includes("open")) {
      window.open("https://leetcode.com/problemset/", "_blank");
      speak("Opening Leetcode - A Coding Platform");
      setPrompt("Opening Leetcode - A Coding Platform");
    } else if (msg.includes("music") && msg.includes("open")) {
      window.open("https://music.youtube.com/", "_blank");
      speak("Opening Youtube Music");
      setPrompt("Opening Youtube Music");
    } else if (msg.includes("time")) {
      let time = new Date().toLocaleString(undefined, {
        hour: "numeric",
        minute: "numeric",
      });
      setPrompt(time);
      speak(time);
    } else if (msg.includes("date")) {
      let day = new Date().toLocaleString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      setPrompt(day);
      speak(day);
    } else {
      setPrompt(msg);
      speak(msg);
    }
    setResponse(true);
  }
  let speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!speechRecognition) {
    alert("Speech Recognition not supported in this browser 😢");
  }
  let recognition = new speechRecognition();
  recognition.onresult = (e) => {
    let msg = e.results[0][0].transcript;
    console.log(msg);
    setPrompt(msg);
    aiResponse(msg);
    // setPrompt("Listening...");
  };
  let data = {
    speak,
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
  };
  return (
    <>
      <dataContext.Provider value={data}>{children}</dataContext.Provider>
    </>
  );
};

export default UserContext;
