import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Modal from 'react-bootstrap/Modal';
import { BsFiletypePdf } from "react-icons/bs";

const Everydetail = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal,setShowEditModel] =useState(false)
  const [values,setValues]=useState({})


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/everydetail", {
          headers: {
            "Content-Type": "application/json",
            'authorization': `Bearer ${Cookies.get('token')}`
          }
        });
        setData(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  },[showDeleteModal,showEditModal]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
   
  const filteredData = data.filter((element) => {
    return (
      element.user_id.toString().includes(searchTerm)||
      element.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.Caste.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.Class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.Phone.toString().includes(searchTerm) ||
      element.Address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.bloodgroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.Education.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.Sex.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  console.log("fil",filteredData)

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['user_id', 'Name', 'Caste', 'Class', 'Phone', 'Address', 'Blood Group', 'Education', 'Sex']],
      body: filteredData.map(mapele => [mapele.user_id, mapele.Name, mapele.Caste, mapele.Class, mapele.Phone, mapele.Address, mapele.bloodgroup, mapele.Education, mapele.Sex]),
    });
    doc.save('everydetail.pdf');
  };

  function handelDelete() {
    console.log("delete pressed");
    setShowDeleteModal(true);
  }

  function handelCloseDeleteModal() {
    setShowDeleteModal(false);
  }

  async function confirmDelete() {
    try {
      const userToDelete = filteredData[0]; 
      await axios.delete('http://localhost:3000/everydetdel', {
        headers: {
          "Content-Type": "application/json",
          'authorization': `Bearer ${Cookies.get('token')}`,
        },
        data: {
          phone: userToDelete.Phone,
        },
      });
      console.log("deleted");
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  }

  function handelEdit(){
    setShowEditModel(true)
    console.log("edit is being handel")
  }

  function handelCloseEditModel(){
    setShowEditModel(false)
  }

  function handleChange(event){
    event.preventDefault()
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }


  async function confirmEdit(){
    console.log(values)
    try {
      const userToEdit = filteredData[0]; 
      console.log("k",userToEdit)
      await axios.put('http://localhost:3000/everydetput', {
        user_id:values.user_id , 
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
        })
      }catch (error) {
      console.error(error);
      }
    setShowEditModel(false)
  }

  return (
    <>
      <Button  onClick={handleExportPDF}>
    <BsFiletypePdf />
      </Button>
      <div className="d-flex justify-content-end mb-3">
        <div className="input-group">
          <input
            type="search"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>user_id</th>
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
          {filteredData.map((mapele, index) => (
            <tr key={mapele.user_id}>
              <td>{mapele.user_id}</td>
              <td>{mapele.Name}</td>
              <td>{mapele.Caste}</td>
              <td>{mapele.Class}</td>
              <td>{mapele.Phone}</td>
              <td>{mapele.Address}</td>
              <td>{mapele.bloodgroup}</td>
              <td>{mapele.Education}</td>
              <td>{mapele.Sex}</td>

              <td>
                <Button variant="primary" onClick={handelEdit}>Edit</Button>
                {' '}
              </td>
              <td>
                <Button variant="danger" onClick={handelDelete}>Delete</Button>
                {' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showEditModal} onHide={handelCloseEditModel}>
        <Modal.Header closeButton>
        <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <label>
          Name:
          <input type="text" name="Name" onChange={handleChange} />
        </label>
        <label>
          Caste:
          <input type="text" name="Caste" onChange={handleChange}/>
        </label>
        <label>
          Class:
          <input type="text" name="Class" onChange={handleChange} />
        </label>
        <label>
          Education:
          <input type="text" name="Education" onChange={handleChange}/>
        </label>
        <label>
          Phone:
          <input type="text" name="Phone"onChange={handleChange} />
        </label>
        <label>
          Sex:
          <input type="text" name="Sex" onChange={handleChange} />
        </label>
        <label>
          Address:
          <input type="text" name="Address"onChange={handleChange}  />
        </label>
        <label>
          Blood group:
          <input type="text" name="Blood_group"onChange={handleChange} />
        </label>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() =>  setShowEditModel(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmEdit}>
            Confirm Edit
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

export default Everydetail;
