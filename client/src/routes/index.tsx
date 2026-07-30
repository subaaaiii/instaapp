import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";

export default function AppRoutes() {
  
  return (
    <Routes>
        <Route path="/" element={<LoginPage />} />  
        <Route path="/register" element={<Register />} />  
        <Route path="/home" element={<Home />} />  
        <Route path="/profile" element={<Profile />} />  
    </Routes>
  )
}
    