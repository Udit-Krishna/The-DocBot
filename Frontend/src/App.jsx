import React, { useState } from "react";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./pages/Generted.routes";
import { UserContext } from "./context/UserContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [dataFound, setDataFound] = useState(false);
  return (
    <>
      <UserContext.Provider
        value={{
          loggedIn,
          setLoggedIn,
          email,
          setEmail,
          name,
          setName,
          profile,
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
        }}
      >
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
}

export default App;
