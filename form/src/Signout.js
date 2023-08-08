import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate =useNavigate()
  const handleLogout = async () => {
    console.log("logout being hit");
    try {
      const response =  await axios.get('http://localhost:3000/logout', {
        headers: {
          "Content-Type": "application/json",
          'authorization': `Bearer ${Cookies.get('token')}`
        }
      });
      console.log("logre",response)

      Cookies.remove("token");
      Cookies.remove("login");
      Cookies.remove("refreshToken")
      navigate('/')
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
