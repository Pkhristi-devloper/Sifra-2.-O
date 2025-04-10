/* eslint-disable no-unused-vars */
import sifra from "../assets/ai.png";
import { CiMicrophoneOn } from "react-icons/ci";
import { dataContext } from "./UserContext";
import { useContext } from "react";
import speakImage from "../assets/speak.gif";
import voiceImage from "../assets/aiVoice.gif";

const Home = () => {
  let { speak, recognition, speaking, setSpeaking, prompt, response } =
    useContext(dataContext);

  return (
    <div className="h-screen w-screen flex items-center justify-start flex-col bg-black pt-[10px]">
      <>
        <div className="image h-[60%] w-full flex items-center justify-center">
          <img src={sifra} alt="" className="h-full" />
        </div>
        <span className="bg-linear-90 from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent text-[2vmax] font-semibold mt-[2vh]">
          I&apos;m Sifra 2.0, Your Virtual AI Assistant
        </span>
        {!speaking ? (
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full mt-[2vh] p-[2px]">
            <div className="h-full w-full bg-black rounded-full">
              <button
                onClick={() => {
                  setSpeaking(true);
                  recognition.start();
                }}
                className="p-[1vh] text-purple-500 rounded-full text-[4vmax] z-20 cursor-pointer from-pink-500 via-purple-500 to-blue-500 hover:bg-linear-150 hover:text-black hover:text-[3.5vmax] transform transition-all duration-500 "
              >
                <CiMicrophoneOn />
              </button>
            </div>
          </div>
        ) : (
          <div className="h-[150px] flex mt-[5vh] flex-col justify-center items-center gap-[2vh] text-white">
            {!response ? (
              <img
                src={speakImage}
                alt="Sifra is Thinking.."
                className="h-[100px]"
              />
            ) : (
              <img
                src={voiceImage}
                alt="Sifra is Thinking.."
                className="h-[100px] w-[50vw]"
              />
            )}

            <p className="w-[70vw] text-center text-[1.5vmax]">{prompt}</p>
          </div>
        )}
      </>
    </div>
  );
};

export default Home;
