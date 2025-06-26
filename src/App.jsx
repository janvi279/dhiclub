import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import AddMember from "./components/AddMember";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}> </Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
             <Route path="/addMember" element={<AddMember />}></Route>
             <Route path="/verification" element={<AddMember />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;