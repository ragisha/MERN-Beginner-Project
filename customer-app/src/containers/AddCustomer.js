import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import Button from "react-bootstrap/Button"
import Menu from '../components/Menu';
import {useNavigate,useParams } from "react-router";
import { addCustomer, deleteCustomer, getCustomers, updateCustomer,getCustomerById } from '../services/CustomerAPI';

export default function AddCustomer() {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const [items,setItems] = useState([]);
  const [customer,setCustomer] = useState({name: '',email:'',phone:'',id:0,address:'',city:''});
   const [bLabel,setBLabel] = useState('Add');
  
   const handleChange = (e) => {
    setCustomer({...customer,[e.target.placeholder.toLowerCase()]: e.target.value });
  }
  const updateEditCustomer = async (customerId) =>{
    let customer = await getCustomerById(customerId);
    setCustomer(customer);
    setBLabel("Update");
  }
  useEffect(()=>{
    if(customerId){ 
    updateEditCustomer(customerId);
  }
},[]);

  const handleSubmit = async (e) => {
    //e.preventDefault();
    if (!customer.name.length) {
      return;
    }
    const newItem = {...customer};
    if(customer.id == 0){//add
      await addCustomer(newItem);
      setItems(await getCustomers());
    }else{ // update
      await updateCustomer(newItem);
      setItems(await getCustomers());
    }
    doCancel();
  }
  const doCancel = ()=>{
    navigate('/customer');
  }
  return (
    <div>
      <Menu/>
      <h3>CustomerApp</h3>
      <form>
        <input placeholder='Name'
          onChange={handleChange}
          value={customer.name}
        /><br/><br/>
       <input placeholder='Email'
          onChange={handleChange}
          value={customer.email}
        /><br/><br/>
          <input placeholder='Phone'
          onChange={handleChange}
          value={customer.phone}
        /><br/><br/>
          <input placeholder='Address'
          onChange={handleChange}
          value={customer.address}
        /><br/><br/>
        <input placeholder='City'
          onChange={handleChange}
          value={customer.city}
        /><br/><br/>
        <Button onClick={handleSubmit}>{bLabel}</Button>
        &nbsp;&nbsp;
        <input type={'button'} value="Cancel" onClick={doCancel} />
      </form><br/><br/>
    </div>
  );
};