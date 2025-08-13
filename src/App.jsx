import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login"
import PageNotFound from "./pages/PagenotFound";
import DefaultLayout from "./layout/DefaultLayout";
import { Toaster } from 'react-hot-toast';
import AllRoutes from "./navigation";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      {/* <AuthProvider> */}
        <Routes>
          <Route path='/*' element={<PageNotFound />} />
          <Route>
            <Route path='/login' element={<Login />} />
                   <Route path='/' element={<Login />} />
            {/* <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} /> */}
          </Route>
          <Route>
            <Route element={<DefaultLayout />}>
              {AllRoutes.map((route, index) => {
                return (
                  <Route key={index} path={route.path} element={route.element} />
                )
              })}
            </Route>
          </Route>
        </Routes>
      {/* </AuthProvider> */}
    </BrowserRouter>
  );
};

export default App;