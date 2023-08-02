import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import "../styles/page.css";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export default function Pages() {
  const [values, setValues] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form values:", values);
    setValues('');
    
    const user_id =1
    
    
    axios.post('http://localhost:3000/page', {
      user_id: user_id , 
      name: values.Name,
      caste: values.Caste,
      class: values.Class,
      phone: values.Phone,
      address: values.Address,
      bloodgroup: values.Blood_group,
      education: values.Education,
      sex: values.Sex
    }, {
      headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${Cookies.get('token')}`, 
      }
    })
    .then(function (response) {
        console.log(response);
        setMessage(response.data);
        // console.log("response",response)
        return response.data;
      })
      .then(function (data) {
        console.log("datapage",data.message);
        if(data.message==="Duplicate entry"){
          setMessage("Data for this user already exists")
        }
        else{
        setMessage("Saved to database");
        }
      })
      .catch(function (error) {
        console.error('Error:', error);
        setMessage('Error adding data to the database.');
      });
    }
    
    return (   
    <>
      <form className="Page" onSubmit={handleSubmit}>
       <label>
         Name:
         <input type="text" name="Name" onChange={handleChange} />
       </label>
       <label>
         Caste:
         <input type="text" name="Caste" onChange={handleChange} />
       </label>
       <label>
         Class:
         <input type="text" name="Class" onChange={handleChange} />
       </label>
       <label>
         Education:
         <input type="text" name="Education" onChange={handleChange} />
       </label>
       <label>
         Phone:
         <input type="text" name="Phone" onChange={handleChange} />
       </label>
       <label>
         Sex:
         <input type="text" name="Sex" onChange={handleChange} />
       </label>
       <label>
         Address:
         <input type="text" name="Address" onChange={handleChange} />
       </label>
       <label>
         Blood group:
         <input type="text" name="Blood_group" onChange={handleChange} />
      </label>
     
     <Button variant="primary" type="Submit">Submit</Button>{' '}
      {message && <p>{message}</p>}
    </form>
    <Button variant="info" onClick={()=>{
      navigate('/pagedetail')
    }}>Display Data</Button>{' '}
    </>
  );
}

