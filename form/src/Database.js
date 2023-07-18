import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Database() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [input, setInput] = useState("");
  const [showTextBox, setShowTextBox] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-data");
        setData(response?.data?.result);
      } 
      
      catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  function handleEdit(id) {
    setEditId(id);  
    setShowTextBox(!showTextBox);
    
  }

  function handleChange(event) {
    setInput(event.target.value);
  }
 
    function handleClick() {
     try {
        axios.put(`http://localhost:3000/put_data`, {
         id: editId,
         Name: input,
       });
       setData(data.map(element => {
        if (element.id === editId) {
          return { ...element, Name: input };
        }
        return element;
      }));
      } catch (error) {
        console.error(error);
      }
      setInput("")
   }

    function handleDelete(id) {
    try {
     axios.delete(`http://localhost:3000/delete?id=${id}`);
     setData(data.filter((element) => element.id !== id));
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
          {element.Name}
          <button className="edit-button" onClick={() => handleEdit(element.id)}>
            Edit
          </button>
          {showTextBox && editId === element.id && (
            <>
              <input
                type="text"
                value={input}
                onChange={handleChange}
                className="edit-input"
              />
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
