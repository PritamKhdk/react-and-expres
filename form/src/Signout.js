import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate =useNavigate()
  const handleLogout = async () => {
    console.log("logout being hit");
    try {
      await axios.get('http://localhost:3000/logout', {
        headers: {
          "Content-Type": "application/json",
          'authorization': `Bearer ${Cookies.get('token')}`
        }
      });
      Cookies.remove("token");
      Cookies.remove("login");
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
