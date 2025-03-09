/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Verify from "../pages/Verify.jsx";

const Allroute = ({ name, setName, email, setEmail, pass, setPass, postLogin,button,token }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Login
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            pass={pass}
            setPass={setPass}
            postLogin={postLogin}
            button={button}
          />
        }
      />
      <Route path="/verify" element={<Verify token={token}/>} /> 
    </Routes>
  );
};

export default Allroute;
