// import logo from './logo.svg';
// import './App.css';
// import {StudentFunc,StudentC} from './components/Student';
// import Login from './components/Login';
// import { CounterC, CounterF} from './components/Counter';
// import {TimerC,TimerF} from './components/Timer';
// import Showhide from './components/ShowHide';
// import {CustomerAppF} from './components/CustomerApp';
// import {ProductApp} from './components/ProductApp';
// const heading=<h2>React App</h2>

// function App() {
//   return (
//     <div style={{marginLeft: '10px'}}>
//       {heading}
//       <CustomerAppF/>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import About from './containers/About';
import PageNotFound from './containers/PageNotFound';
import Customer from './containers/Customer';
import AddCustomer from './containers/AddCustomer';
import Product from './containers/Product';
import AddProduct from './containers/AddProduct';
import { CustomerAppF } from './containers/CustomerApp';
const App = () => {
   return (
     <Router>
      <div style={{marginLeft: '10px'}}>
         <Routes>
           <Route exact path="/" element={<Home/>}/>
           <Route exact path="/customer" element={<Customer/>}/>
           <Route exact path="/customer/add" element={<AddCustomer/>}/>
           <Route exact path="/customer/edit/:customerId" element={<AddCustomer/>}/>
           <Route exact path="/product" element={<Product/>}/>
           <Route exact path="/product/add" element={<AddProduct/>}/>
           <Route exact path="/product/edit/:productId" element={<AddProduct/>}/>
           <Route exact path="/login" element={<Login/>}/>
           <Route exact path="/about" element={<About/>}/>
           <Route exact path="/home" element={<Home/>}/>
           <Route path="*" element={<PageNotFound/>}/>
         </Routes>
      </div>
     </Router>
   );
 }
export default App;