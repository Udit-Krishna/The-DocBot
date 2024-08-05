import React, { useContext, useState } from "react";
import "../index.css";
import bg from "../assets/bg.png";
import google from "../assets/google.png";
import back from "../assets/back.png";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});
function Login() {
  const {
    email,
    setEmail,
    loggedIn,
    setLoggedIn,
    name,
    setName,
    setProfile,
    age,
    setAge,
    height,
    setHeight,
    weight,
    setWeight,
    gender,
    setGender,
    dataFound,
    setDataFound,
  } = useContext(UserContext);
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        console.log(res);
        setLoggedIn(true);
        setEmail(res.data.email);
        setName(res.data.given_name);
        setProfile(res.data.picture);
        const content = JSON.stringify({
          unique_id: res.data.email,
        });
        const userCheck = await api.post("/check-user", content);
        if (userCheck.data.Instance == "Not Found") {
          setDataFound(false);
          console.log(userCheck.data.Instance);
        } else {
          setDataFound(true);
          setAge(userCheck.data.Age);
          setGender(userCheck.data.Gender);
          setHeight(userCheck.data.Height);
          setWeight(userCheck.data.Weight);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });
  function Logout() {
    googleLogout();
    setEmail("");
    setName("");
    setLoggedIn(false);
  }
  const Save = async () => {
    const content = JSON.stringify({
      unique_id: email,
      name: name,
      gender: gender,
      age: age,
      height: height,
      weight: weight,
    });
    const response = await api.post("/add-user", content);
    console.log(response);
    setDataFound(true);
  };
  return (
    <div className="home-page flex justify-center items-center">
      <img
        src={bg}
        className="absolute bottom-0 w-full object-cover h-full opacity-5 z-10"
      />
      <div className="relative w-[60%]  h-[70%] bg-[#08f8cb]/40 blur-3xl rounded-full"></div>
      <div className="p-5 z-50 absolute left-[35%] bottom-[25%] w-[500px]  h-[450px] bg-[white]/40 backdrop-blur-[150px] rounded-[40px] drop-shadow-2xl shadow-black">
        <button onClick={() => navigate(-1)} className="absolute">
          <img
            src={back}
            className="w-7 hover:drop-shadow-lg hover:w-8  transition-all"
          />
        </button>
        <h1 className="font-bold text-3xl text-center border-b-2 border-[#08f8cb] pb-3 font-serif text-[#024035]">
          the
          <span className="text-[#08f8cb]  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Doc
          </span>
          bot
        </h1>

        {!loggedIn ? (
          <button
            className="button flex items-center space-x-3 p-3 absolute rounded-xl bottom-10 left-[30%] w-52"
            onClick={login}
          >
            <img src={google} className="w-8" />
            <span className="font-semibold">Login with Google</span>
          </button>
        ) : (
          <>
            <div className="flex items-center justify-center mt-2">
              <h6 className="p-2 bg-inherit text-[#024035] font-semibold text-lg w-20">
                Name:
              </h6>
              <input
                type="text"
                placeholder={name}
                value={name}
                className="p-2 bg-inherit text-white placeholder:text-white focus:outline-none text-lg font-semibold"
                disabled
              />
            </div>
            <div className="flex items-center justify-center">
              <h6 className="p-2 bg-inherit text-[#024035] font-semibold text-lg w-20">
                Email:
              </h6>
              <input
                type="text"
                placeholder={email}
                value={email}
                className="p-2 bg-inherit text-white placeholder:text-white focus:outline-none text-lg font-semibold"
                disabled
              />
            </div>
            <div className="flex items-center justify-center">
              <h6 className="p-2 bg-inherit text-[#024035] font-semibold text-lg w-20">
                Age:
              </h6>
              <input
                type="text"
                placeholder="Enter age"
                value={age}
                className="p-2 bg-inherit text-white placeholder:text-[#4a7b72] focus:outline-none text-lg font-semibold"
                disabled={dataFound}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <h6 className="p-2 bg-inherit text-[#024035] font-semibold text-lg w-20">
                Height:
              </h6>
              <input
                type="text"
                placeholder="Enter height"
                value={height}
                className="p-2 bg-inherit text-white placeholder:text-[#4a7b72] focus:outline-none text-lg font-semibold"
                disabled={dataFound}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <h6 className="p-2 bg-inherit text-[#024035] font-semibold text-lg w-20">
                Weight:
              </h6>
              <input
                type="text"
                placeholder="Enter weight"
                value={weight}
                className="p-2 bg-inherit text-white placeholder:text-[#4a7b72] focus:outline-none text-lg font-semibold "
                disabled={dataFound}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <h6 className="p-2 bg-inherit text-[#024035] font-semibold text-lg w-20">
                Gender:
              </h6>
              <input
                type="text"
                placeholder="Enter gender"
                value={gender}
                className="p-2 bg-inherit text-white placeholder:text-[#4a7b72] focus:outline-none text-lg font-semibold "
                disabled={dataFound}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div className="flex absolute bottom-10 left-[7%] space-x-3">
              <button
                className="button flex items-center space-x-3 p-2  rounded-xl w-52"
                onClick={Logout}
              >
                <img src={google} className="w-8" />
                <span className="font-semibold">Logout</span>
              </button>

              <button
                className="button flex items-center space-x-3 p-2  rounded-xl  w-52 disabled:bg-none disabled:hover:bg-transparent disabled:text-gray-400"
                onClick={Save}
                disabled={dataFound}
              >
                <img src={google} className="w-8" />
                <span className="font-semibold">Save</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
