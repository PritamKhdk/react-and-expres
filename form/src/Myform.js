import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const MyForm = () => {
  const [name, setName] = useState('');
  const[caste,setCaste] =useState('');

  const handleChange = (event) => {
    if(event.target.name ==='name'){
      setName(event.target.value);
    }
    else if(event.target.name ==='caste'){
      setCaste(event.target.value)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
   setName('')
   setCaste('')
   

    axios.post('http://localhost:3000/store_data', {
      name: name,
      caste:caste
     }, 
     {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": Cookies.set("token"),
      }
    })
      .then(function(response) {
        console.log(response);
         Cookies.set("token", response.data.token)
        return response.data;

      })
      .then(function(data) {
        console.log(data);
      })
      .catch(function(error) {
        console.error('Error:', error);
      });
  }
  const navigate = useNavigate(); 

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} name="name" onChange={handleChange} />
      </label>
      <label>
        Caste:
        <input type="text" value={caste} name="caste" onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>

    <button onClick={()=>{navigate('/database') }}>To DATABASE</button>
    </>
  );
}

export default MyForm;
