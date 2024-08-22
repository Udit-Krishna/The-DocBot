import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import xray from "../assets/x-ray.png";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bg.png";
import Feature from "../components/Feature";
import send from "../assets/send-message.png";
import UserChat from "../components/UserChat";
import BotChat from "../components/BotChat";
import newChat from "../assets/add.png";
import back from "../assets/back.png";
import logo from "../assets/app1.png";
import user from "../assets/profile-user2.png";
import "../index.css";
const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});
function Diagnosis() {
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [prediction, setPrediction] = useState("");

  const handleClick = () => {
    inputRef.current.click();
  };
  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    console.log(file);
  };

  const handleFileSubmit = async () => {
    const formData = new FormData();
    formData.append("file", image);

    const response = await api.post("/predict/brain-tumor", formData);
    if (response.statusText == "OK") {
      setPrediction(response.data.prediction);
      console.log(prediction);
      !prediction
        ? setMessages([
            {
              text: "Yes, RIP",
              isBot: true,
            },
          ])
        : setMessages([
            {
              text: "No, you are blessed not to have cancer",
              isBot: true,
            },
          ]);
    }
  };

  const { name, email, profile } = useContext(UserContext);
  const msgFocus = useRef(null);
  const [count, setCount] = useState(0);
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (msgFocus.current) {
      msgFocus.current.scrollIntoView();
    }
  }, [messages]);

  const handleEnter = async (e) => {
    if (e.key == "Enter") await sendMessage();
  };
  const sendMessage = async (e) => {
    const text = question;
    setQuestion("");
    setMessages([...messages, { text: text, isBot: false }]);
    setCount(count + 1);
    const content = JSON.stringify({
      isFirst: count > 0 ? false : true,
      unique_id: email,
      message: question ? question : "Hi",
    });
    const response = await api.post("/chat-bot/brain-tumor", content);
    setMessages([
      ...messages,
      { text: text, isBot: false },
      { text: response.data.Response, isBot: true },
    ]);
    setQuestion("");
    console.log(response.data.History);
  };
  const reset = () => {
    setQuestion("");
    setMessages([]);
    setImage("");
    setPrediction("");
    setCount(0);
  };

  return (
    <>
      <div className="home-page flex">
        <img
          src={bg}
          className="absolute bottom-0 w-full object-contain opacity-[0.07] z-0"
        />
        <div className="sidebar w-[20%] h-[93%] overflow-hidden">
          <img
            src={bg}
            className="absolute bottom-0 w-full h-full object-cover opacity-[0.07] z-0"
          />
          <button onClick={() => navigate(-1)} className="absolute">
            <img
              src={back}
              className="w-7 hover:drop-shadow-lg m-2 hover:w-8 transition-transform"
            />
          </button>
          <div className="content-start text-center border-b pb-12 mx-4 border-[#08f8cb]">
            <img src={logo} className="h-24 mt-16  ml-[33%]" />
            <a className="font-bold text-2xl mt-2 font-serif text-[#143830]">
              the
              <span className="text-[#08f8cb] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                Doc
              </span>
              bot
            </a>
          </div>
          <div className="px-5 relative z-50">
            <button
              className="button flex space-x-3 items-center w-full justify-center py-3"
              onClick={reset}
            >
              <img src={newChat} className=" object-contain w-5" />
              <span className="text-white font-semibold">New chat</span>
            </button>
          </div>
          <div className="bg-[rgb(96, 165 ,250)] backdrop-filter backdrop-blur-sm bg-opacity-50 rounded-xl mx-5">
            <Feature name="Chatbot" />
          </div>
        </div>
        <div className="sidebar h-[93%] w-[70%] overflow-hidden">
          <img
            src={bg}
            className="absolute bottom-0 w-full object-contain opacity-[0.07] z-10"
          />
          <div className="overflow-hidden overflow-y-scroll scroll-smooth  relative z-50 h-full pb-28">
            <BotChat message="Hi, I am theDoctBot. Kindly upload the x ray for analysis" />

            <div className="flex mr-4 justify-end mt-10">
              <div
                onClick={handleClick}
                className="flex justify-center border-2  w-[30%] border-[#024035] bg-[#029275] bg-opacity-40 rounded-3xl p-4  z-50 drop-shadow-md mr-4 text-white"
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    className="h-28 object-contain"
                  />
                ) : (
                  <img src={xray} className="h-28 object-contain" />
                )}
              </div>
              <img
                src={profile ? profile : user}
                className=" w-10 h-10 self-center object-contain drop-shadow-md rounded-full"
              />
            </div>
            {prediction === "" ? (
              <></>
            ) : (
              <>
                {messages.map((message, i) => {
                  if (message.isBot == true) {
                    return <BotChat key={i} message={message.text} />;
                  } else if (message.text) {
                    return (
                      <UserChat
                        key={i}
                        message={message.text}
                        img={profile ? profile : user}
                      />
                    );
                  }
                })}
              </>
            )}
            <div ref={msgFocus} />
          </div>
          <div
            className="absolute bottom-2 left-12 w-[90%] bg-[#029275] flex overflow-hidden backdrop-filter backdrop-blur-sm bg-opacity-50 rounded-xl z-50 drop-shadow-md"
            onClick={image ? null : handleClick}
          >
            {!image ? (
              <>
                <p className="w-full p-4 bg-inherit text-white placeholder:text-white focus:outline-none text-lg">
                  Click to upload image
                </p>
                <input
                  type="file"
                  id="file-selector"
                  accept=".jpg, .jpeg, .png"
                  ref={inputRef}
                  style={{ display: "none" }}
                  onChange={handleChange}
                />
              </>
            ) : (
              <input
                type="text"
                name="Chat"
                placeholder={
                  prediction ? "Send a message.." : "Submit to check prediction"
                }
                className="w-full p-4 bg-inherit text-white placeholder:text-white focus:outline-none text-lg"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleEnter}
                disabled={!prediction}
              />
            )}
            <button
              className={
                image == ""
                  ? "py-2 px-4 items-center"
                  : "py-2 px-4 items-center hover:bg-[#08f8cb]"
              }
              onClick={prediction != "" ? sendMessage : handleFileSubmit}
              disabled={image == ""?true:prediction == ""?false:!question}
            >
              <img src={send} className="object-contain w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* <button onClick={handleSubmit}>Submit</button> */}
    </>
  );
}

export default Diagnosis;
