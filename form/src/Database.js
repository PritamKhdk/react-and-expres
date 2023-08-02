import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Database() {
  const [data, setData] = useState([]);
  const [update, setupdate] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showTextBox, setShowTextBox] = useState(false);
  const [firstinput, setFirstInput] = useState("");
  const [secondtinput, setSecondInput] = useState("");
 
  useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await axios.get("http://localhost:3000/get_data",{
          headers: {
            "Content-Type": "application/json",
            'authorization': `Bearer ${Cookies.get('token')}`
          }
        });
        setData(response?.data?.result);
       }
      catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [update,]);

  function handleEdit(id) {
    setEditId(id);  
    setShowTextBox(!showTextBox);
  }

  function handleChange(event) {
    if(event.target.name==='firstinput'){
      setFirstInput(event.target.value)
    }else if(event.target.name ==='secondinput'){
      setSecondInput(event.target.value)
    }
  
  } 
   function handleClick() {
    try {
       axios.put(
        `http://localhost:3000/put_data`,
        {
          id: editId,
          name: firstinput,
          caste: secondtinput,
        },
        {
          headers: {
            "Content-Type": "application/json",
            'authorization': `Bearer ${Cookies.get('token')}`,
          },
        }
      );
      setData(data.map(element => {
        if (element.id === editId) {
          return { ...element, Name: firstinput,Caste:secondtinput };
        }
        return element;
      }));
  
      setFirstInput("");
      setSecondInput("");
    } catch (error) {
      console.error(error);
    }
  }

    function handleDelete(id) {
    try {
     axios.delete(`http://localhost:3000/delete?id=${id}`,{
     headers: {
      "Content-Type": "application/json",
      'authorization': `Bearer ${Cookies.get('token')}`,
    }});
     setupdate(!update)
  
    } catch (error) {
      console.error(error);
    }
  }
  
  const navigate = useNavigate()

  return (
    <>
    <h1>Database Data</h1>
    <ul className="data-list">
      {data.map((element) => (
        <li key={element.id} className="list-item">
          {element.Name} {element.Caste}
          <button className="edit-button" onClick={() => handleEdit(element.id)}>
            Edit
          </button>
          {showTextBox && editId === element.id && (
            <>
            <label>
            First Name:
              <input
                type="text"
                name="firstinput"
                value={firstinput}
                onChange={handleChange}
                className="edit-input"
              />
            </label>
              <label>
              Last Name:
               <input
                type="text"
                name="secondinput"
                value={secondtinput}
                onChange={handleChange}
                className="edit-input"
              />
              </label>
              <button className="done-button" onClick={handleClick}>
                Done
              </button>
            </>
          )}
          <button className="delete-button" onClick={() => handleDelete(element.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
    <button className="add-user-button" onClick={() => navigate('/myform')}>
      Add User
    </button>
  </>
  );
}

