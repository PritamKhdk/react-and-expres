import React, { useState, useEffect } from "react";
import axios from "axios";
import './styles/login.css'
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login() {
  const [name, setName] = useState('');
  const [caste, setCaste] = useState('');
  const [loginResult, setLoginResult] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        name: name,
        caste: caste
      }, {
        headers: {
          "Content-Type": "application/json",
          "authorization": Cookies.get("token"), 
        }
      });
      const data = response.data;
      console.log("data",data.token)
      if (data.success) {
        Cookies.set('token', data.token); 
        Cookies.set('login', true);
        setLoginResult("Logged in successfully");
        navigate('/home');
      } else {
        setLoginResult(data.message || "Error occurred during login.");
        Cookies.remove('token');
        Cookies.remove('login');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      setLoginResult("Error occurred during login.");
      Cookies.remove('token');
      Cookies.remove('login');
    }

    setName("");
    setCaste("");
  };

  useEffect(() => {
    const login = Cookies.get('login');
    if (login) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <>
      <div className="App">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          <label htmlFor="caste">Caste:</label>
          <input type="text" id="caste" value={caste} onChange={(e) => setCaste(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
        <div>{loginResult}</div>
      </div>
    </>
  );
}