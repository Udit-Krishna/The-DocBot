import React from 'react'
import logo from "../assets/app1.png";

function BotChat(props) {
  return (
    <div className="flex ml-4 mt-10">
      <img src={logo} className="object-contain w-12 drop-shadow-md" />
      <div className="border-2  w-[47%] border-[#024035] bg-[#029275] bg-opacity-40 rounded-3xl p-4  z-50 drop-shadow-md ml-4 text-white">
        {props.message}
      </div>
    </div>
  );
}

export default BotChat