import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

const MyForm = () => {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
   console.log('A form was submitted: ' + name);
   setName('')

    axios.post('http://localhost:3000/store-data', {
      name: name
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(function(response) {
        console.log(response);
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
      <input type="submit" value="Submit" />
    </form>

    <button onClick={()=>{navigate('/database') }}>To DATABASE</button>
    </>
  );
}

export default MyForm;
