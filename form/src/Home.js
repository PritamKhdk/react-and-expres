import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate =useNavigate();
  return (
    <>
    <div>Hello from Home.wlecome to home</div>
    <button onClick={()=>navigate("/page")}>TO pages</button>
    </>
  )
}

export default Home