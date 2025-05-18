import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
function Menu(){
    return(
        <div>
            <h2>Customer App Management</h2>
          <Link to={'/home'}>Home</Link> &nbsp;|  &nbsp;
          <Link to={'/customer'}>Customers</Link>  &nbsp;|  &nbsp;
          <Link to={'/product'}>Products</Link>  &nbsp;|  &nbsp;
          <Link to={'/about'}>About</Link>  &nbsp;|  &nbsp;
          <Link to={'/login'}>Logout</Link>
       <hr />
        </div>
    );
}
export default Menu;