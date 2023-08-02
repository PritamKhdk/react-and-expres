import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Home';
import Database from '../Database';
import MyForm from '../Myform';
import Login from '../Login';
import NavBars from '../component/Navbar';
import Pages from '../Pages/Pages';
import Protected from '../context/Protected';
import Pagedetail from '../Pages/Pagedetail';
import Everydetail from '../Pages/Everydetail';


const Index = () => {
  return (
    <>
      <BrowserRouter>
        <NavBars />
        <Routes>
        <Route path="/home" element={<Protected Component={Home}/>}></Route>
        <Route path="/myform" element={<MyForm />}></Route>
        <Route path="/database" element={<Database />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/page' element={<Protected Component= {Pages} />}></Route>
        <Route path='/pagedetail' element={<Protected Component= {Pagedetail} />}></Route>
        <Route path ='/everydetail'element={<Protected Component ={Everydetail}/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Index;

// import React,{useState} from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Protected from './protected'

// import Home from '../Home';
// import Database from '../Database';
// import MyForm from '../Myform';
// import Login from '../Login';
// import NavBars from '../component/Navbar';


// const Index =()=> {
//   const [isSignedIn, setIsSignedIn] = useState(null)
//   const signin = () => {
//     setIsSignedIn(true)
//   }
  
//   return (
//     <>
//       <BrowserRouter>
//        <NavBars />
//         <Routes>
//           <Route path='/home'  element={
//               <Protected isSignedIn={isSignedIn}>
//                 <Home />
//               </Protected>}>
//           {/* }> */}
//               </Route>
//           <Route path="/myform" element={
//                 <MyForm />
//           }>

//           </Route>
//           <Route path="/database" element={<Database />}></Route>
//           <Route path='/login' element={<Login signin={signin} />}></Route>
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }
// export default Index
// Index.js
// import React, { useState } from 'react';