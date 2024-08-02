import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Chatbot from "./Chatbot";
import Login from "./Login";
import Diagnosis from "./Diagnosis";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/Chatbot", element: <Chatbot /> },
  { path: "/Login", element: <Login /> },
  { path: "/Diagnosis", element: <Diagnosis /> },
]);
