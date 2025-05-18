import React, { useState,useEffect } from 'react';
import Button from "react-bootstrap/Button"
import Menu from '../components/Menu';
import { useNavigate } from "react-router-dom";
import { addCustomer, deleteCustomer, getCustomers } from '../services/CustomerAPI';

export default function CustomersApp() {
  const navigate = useNavigate();
  const [items,setItems] = useState([]);
  const [customer,setCustomer]= useState({name:'',email:'',phone:'',id:0,address:'',city:''});
  const [bLabel,setBLabel] = useState('Add');

  const loadCustomers = async ()=>{
    setItems(await getCustomers());
  }
  useEffect(()=>{
    loadCustomers();
  },[]);

  const doDelete = async (id) => {
    await deleteCustomer({id});
    setItems(await getCustomers());
  }
    const doEdit = (id) => {
      navigate('/customer/edit/'+id);
    }
    const doCopy = async (name,email,phone,address,city) => {
      
      await addCustomer({name,email,phone,address,city})
        const newItems ={name,email,phone,address,city};
        if(customer.id==0){
           newItems.id=getNextId(items);
        setItems([...items,newItems]);
    }
    }
        return (
            <div>
              <Menu/>
              <h3>Customers</h3>
              <Button onClick={()=>{navigate('/customer/add')}}>Add</Button>
              <CustomerList items={items}  doDelete={doDelete} doEdit={doEdit} doCopy={doCopy}/>
            </div>
          );
        };
 
function CustomerList ({items,doDelete,doEdit,doCopy}){
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Copy</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {items.map(item => (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>{item.city}</td>
                <td><button onClick={()=>{doCopy(item.name,item.email,item.phone,item.address,item.city)}}>Copy</button></td>
                <td><button onClick={()=>{doEdit(item.id)}}>Edit</button></td>
                <td><button onClick={()=>doDelete(item.id)}>Delete</button></td>
                </tr>
          ))}
            </tbody>
        </table>
      );      
}
const getNextId = (customer) =>{
  if(customer.length < 1){
     return 1; 
   }
   let numberArry = customer.map((item)=>{return item.id});
   let max = Math.max(...numberArry);// (5,6,6) // spread operator
 return max + 1; 
 }
 