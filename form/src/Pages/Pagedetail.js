import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Pagedetail = () => {
  const [data, setData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [values, setValues] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/pagedetail", {
          headers: {
            "Content-Type": "application/json",
            'authorization': `Bearer ${Cookies.get('token')}`
          }
        });
        setData(response?.data?.result);
        console.log("pagedata",data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [showEditModal,showDeleteModal]);

  function handelEdit(){
    console.log("edit pressed")
    setShowEditModal(true);
  }

  function handelDelete(){
    console.log("delete pressed")
    setShowDeleteModal(true);
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    console.log("formvalue",values)

    try {
      const user_id =1
      console.log("id",user_id)
      axios.put(
       `http://localhost:3000/pageid`,
       {
         user_id: user_id , 
        name: values.Name,
        caste: values.Caste,
        class: values.Class,
        phone: values.Phone,
        address: values.Address,
        bloodgroup: values.Blood_group,
        education: values.Education,
        sex: values.Sex
       },
       {
         headers: {
           "Content-Type": "application/json",
           'authorization': `Bearer ${Cookies.get('token')}`,
         },
       }
     );
   } catch (error) {
     console.error(error);
   }
   setShowEditModal(false);
  }
  function handleCloseModal(){
    setShowEditModal(false);
  }

  function handleCloseEditModal() {
    setShowEditModal(false);
  }

  function handelCloseDeleteModal(){
    setShowDeleteModal(false)
  }

function confirmDelete(){
  try {
    axios.delete('http://localhost:3000/pagedelete',{
    headers: {
     "Content-Type": "application/json",
     'authorization': `Bearer ${Cookies.get('token')}`,
    }})
 
   } catch (error) {
     console.error(error);
   }

  console.log("deleeted")
  setShowDeleteModal(false)
}

  // }
  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Caste</th>
            <th>Class</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Blood Group</th>
            <th>Education</th>
            <th>Sex</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((mapele, index) => (
            <tr key={mapele.user_id}>
              <td>{index + 1}</td>
              <td>{mapele.Name}</td>
              <td>{mapele.Caste}</td>
              <td>{mapele.Class}</td>
              <td>{mapele.Phone}</td>
              <td>{mapele.Address}</td>
              <td>{mapele.bloodgroup}</td>
              <td>{mapele.Education}</td>
              <td>{mapele.Sex}</td>
              <td><Button variant="primary" onClick={handelEdit}>Edit</Button>{' '}</td>
              <td><Button variant="danger"onClick={handelDelete}>Delete</Button>{' '}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
          <label>
         Name:
         <input type="text" name="Name"  onChange={handleChange}/>
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
         <input type="text" name="Phone" onChange={handleChange}  />
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
         <input type="text" name="Blood_group" onChange={handleChange}  />
      </label>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showDeleteModal} onHide={handelCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this userdetails?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Pagedetail;
