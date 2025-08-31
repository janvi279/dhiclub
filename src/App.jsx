import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login"
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound"
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
                   <Route path='/' element={<Home />} />
            {/* <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} /> */}
          </Route>
          <Route>
              {/* <Route element={<PrivateRoute />}> */}
            <Route element={<DefaultLayout />}>
              {AllRoutes.map((route, index) => {
                return (
                  <Route key={index} path={route.path} element={route.element} />
                )
              })}
            </Route>
            {/* </Route> */}
          </Route>
        </Routes>
      {/* </AuthProvider> */}
    </BrowserRouter>
  );
};

export default App;