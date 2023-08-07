import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../src/styles/myform.css'

const MyForm = () => {
  const [name, setName] = useState('');
  const [caste, setCaste] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    if (event.target.name === 'name') {
      setName(event.target.value);
    } else if (event.target.name === 'caste') {
      setCaste(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setName('');
    setCaste('');

    axios.post('http://localhost:3000/store_data', {
      name: name,
      caste: caste,
    }, {
      headers: {
        "Content-Type": "application/json",
        "authorization": Cookies.get("token"),
      }
    })
      .then(function (response) {
        console.log(response);
        Cookies.set("token", response.data.token)
        setMessage(response.data.message);
        return response.data;
      })
      .catch(function (error) {
        console.error('Error:', error);
        setMessage('Error adding data to the database.');
        Cookies.remove("token");
      });
  };
  const navigate = useNavigate();

  return (
    <div className="my-form-container">
    <h2>My Form</h2>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="form-group" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          name="name"
          placeholder="Enter name"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="form-group" controlId="formBasicPassword">
        <Form.Label>Caste</Form.Label>
        <Form.Control
          type="text"
          value={caste}
          name="caste"
          placeholder="Enter caste"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="form-group" controlId="formBasicCheckbox">
        
      </Form.Group>
      <Button variant="primary" type="submit" className="btn-submit">
        Submit
      </Button>
    </Form>
    {message && <p>{message}</p>}
    <Button  variant="primary" onClick={() => { navigate('/database') }}>To DATABASE</Button>
  </div>
  );
};

export default MyForm;
