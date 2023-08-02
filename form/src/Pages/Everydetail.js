import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Everydetail = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
  },[]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
   
  const filteredData = data.filter((element) => {
    return (
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

  return (
    <>
      <Button variant="success" onClick={handleExportPDF}>
        Export to PDF
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
                <Button variant="primary" >Edit</Button>
                {' '}
              </td>
              <td>
                <Button variant="danger">Delete</Button>
                {' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Everydetail;
