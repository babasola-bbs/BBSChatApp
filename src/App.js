import React, { useContext } from "react";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Home from "./pages/home.jsx";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthContext } from "./context/AuthContext.js";

function App() {
  const {currentUser} = useContext(AuthContext)
  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/login"/>
    }
    return children
  }

  return (
      <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={ <ProtectedRoute><Home /></ProtectedRoute> } />
              <Route path="login" element={ <Login /> } />
              <Route path="register" element={ <Register /> } />
            </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
