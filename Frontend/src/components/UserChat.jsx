import React from "react";


function UserChat(props) {
  return (
    <div className="flex mr-4 justify-end mt-10">
      <div className="border-2  w-[47%] border-[#024035] bg-[#029275] bg-opacity-40 rounded-3xl p-4  z-50 drop-shadow-md mr-4 text-white">
        {props.message}
      </div>
      <img
        src={props.img}
        className=" w-10 h-10 self-center object-contain drop-shadow-md rounded-full"
      />
    </div>
  );
}

export default UserChat;
