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
import Firstpage from '../Pages/Firstpage';


const Index = () => {
  return (
    <>
      <BrowserRouter>
        <NavBars />
        <Routes>
        <Route path="/" element={<Firstpage />}></Route>
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

