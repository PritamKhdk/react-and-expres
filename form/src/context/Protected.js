import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Protected(props) {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    let login = Cookies.get('login'); 
    console.log("log",login)
    if (!login) {
      navigate('/login');
    }
  }, [navigate]);
  
  return (
    <div>
      this is protected
      <Component />
    </div>
  );
}

export default Protected;

