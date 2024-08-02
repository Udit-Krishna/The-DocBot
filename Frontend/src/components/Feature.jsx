import React, { useContext } from "react";
import chatbot from "../assets/chatbot2.png";
import { useNavigate} from "react-router-dom";
import "../index.css";
import { UserContext } from "../context/UserContext";

function Feature({ name }) {
  const navigate = useNavigate();
   const { loggedIn } = useContext(UserContext);
  return (
    <button
      onClick={() =>loggedIn? navigate(name):navigate("/Login")}
      className="flex button w-full"
    >
      <img src={chatbot} className="w-10 object-contain pt-1.5"></img>

      <span className="mt-3.5 pl-2 font-semibold">{name}</span>
    </button>
  );
}

export default Feature;
