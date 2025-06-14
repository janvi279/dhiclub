import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import UserList from "./components/UserList";
import Dashboard from "./components/Dashboard";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}> </Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/userList" element={<UserList />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;