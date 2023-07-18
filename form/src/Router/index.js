import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../Home';
import Database from '../Database';
import MyForm from '../Myform';

const Index =()=> {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path="/myform" element={<MyForm />}></Route>
          <Route path="/database" element={<Database />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default Index