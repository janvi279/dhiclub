import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import AddMember from "./components/AddMember";
import MobileVerify from "./components/mobileVerify";
import BusinessDetail from "./components/BusinessDetail";
import References from "./components/Refrences";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}> </Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
             <Route path="/addMember" element={<AddMember />}></Route>
             <Route path="/verification" element={<MobileVerify />}></Route>
             <Route path="BusinessDetail" element={<BusinessDetail/>}></Route>
             <Route path="/refrences" element={<References/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;