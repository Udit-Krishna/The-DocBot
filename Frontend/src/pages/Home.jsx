import React from "react";
import "../index.css";
import logo from "../assets/app1.png";
import user from "../assets/profile-user2.png";
import bg from "../assets/bg.png";
import Slider from "../components/Slider";
import Feature from "../components/Feature";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Home() {
    const navigate = useNavigate();
    const {profile,name}=useContext(UserContext)
  return (
    <div className="home-page">
      <img
        src={bg}
        className="absolute bottom-0 w-full object-contain opacity-[0.07] z-0"
      />
      <img
        src={logo}
        alt="logo"
        className="w-28 object-contain absolute top-5 left-8"
      />
      <a className="absolute font-bold text-3xl top-10 left-40 font-serif text-[#008f70]">
        the
        <span className="text-[#08f8cb] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Doc
        </span>
        bot
      </a>
      <div className="absolute right-12 top-5 space-x-16 flex items-center">
        <button
          onClick={() => navigate("login")}
          className="flex items-center pt-3"
        >
          <span className="text-[#4cfdd4] font-semibold text-base mr-12">
            {name?name:"Login"}
          </span>
          <img
            src={profile ? profile : user}
            className="w-8 object-contain rounded-full hover:w-9 absolute right-0 drop-shadow-lg shadow-black transition-all"
          ></img>
        </button>
      </div>
      <div className="home-page-container overflow-hidden">
        <img
          src={bg}
          className="absolute bottom-0 w-full object-contain opacity-[0.1] z-10"
        />
        <h6 className="text-3xl font-bold text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] relative mt-20 z-50">
          Diagnose, connect, stay healthy.
          <span className="text-[#4cfdd4]"> theDocbot!</span>
        </h6>
        <div className="flex relative z-50">
          <div className="pt-12 pl-16">
            <div className="px-20 py-5 mt-8 ml-5 bg-[rgb(96, 165 ,250)] backdrop-filter backdrop-blur-sm bg-opacity-50 border-2 border-[#4cfdd4] rounded-xl">
              <h6 className="text-2xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-center">
                How can we help you today?
              </h6>
              <Feature name="Chatbot" />
              <Feature name="Diagnosis" />
              <Feature name="Medical record diagnosis" />
            </div>
          </div>
          <div className="pl-16 absolute right-20 -top-20">
            <Slider />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
