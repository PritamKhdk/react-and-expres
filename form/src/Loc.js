// import axios from "axios";
// import { useState,useEffect} from "react";
// // import Cookies from 'js-cookie'

// export default function Loc(){
//     const[data,setData]=useState([])
//     useEffect(() => {
//     const fetchData = async () => {
//         try {
//           const headers = {
//             "Content-Type": "application/json",
//             "x-access-token": localStorage.getItem("token"),
//           };
          
//           console.log("headers",headers); 
      
//           const response = await axios.get("http://localhost:3000/get_data", {
//             headers: headers, 
//           });
      
//           setData(response?.data?.result);
//         } catch (error) {
//           console.error(error);
//       }
//       };   
//       fetchData();
// },[])
//       return(
//         <>
//         <p>{data}</p>
//         </>
//       )  
// }