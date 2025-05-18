import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Button from "react-bootstrap/Button"
import Menu from '../components/Menu';
import { addCustomer, deleteCustomer, getCustomers, updateCustomer } from '../services/CustomerService';
 export class CustomerAppC extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [
  {id:1,name:'Vivek', email:'vivek@abc.com', phone:'8989389333',address:"Singapore",city:"Queenstown"},
	{id:2,name:'Dev', email:'dev@abc.com', phone:'866389333',address:"India",city:"Bangalore"},
	], name: '',email:'',phone:'',id:0,address:'',city:'', bLabel:'Add'};
    //Another approach to handle this 
    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }
  doDelete = (id) => {
    console.log("delete :"+id);
    let temp = this.state.items.filter((record)=>(record.id != id));
    this.setState({items:temp});
  }
  doEdit = (id) => {
    console.log("edit :"+id);
    let temp = this.state.items.filter((record)=>(record.id == id));
    if(temp.length > 0){
      this.setState({...temp[0],bLabel:'Update'});
    }
  }
  render() {
    return (
      <div>
        <h3>Customer APP</h3>
        <form onSubmit={this.handleSubmit}>
          <input placeholder='Name'
            onChange={this.handleChange}
            value={this.state.name}
          /><br/><br/>
          <input placeholder='Email'
            onChange={this.handleChange}
            value={this.state.email}
          /><br/><br/>
           <input placeholder='Phone'
            onChange={this.handleChange}
            value={this.state.phone}
          /><br/><br/>
           <input placeholder='Address'
            onChange={this.handleChange}
            value={this.state.address}
          /><br/><br/>
           <input placeholder='City'
            onChange={this.handleChange}
            value={this.state.city}
          /><br/><br/>
          <button>{this.state.bLabel}</button>
        </form><br/><br/>
        <CustomerList items={this.state.items}  doDelete={this.doDelete}  doEdit={this.doEdit}/>
      </div>
    );
  }
 
  handleChange = (e) => {
    this.setState({ [e.target.placeholder.toLowerCase()]: e.target.value });
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.name.length) {
      return;
    }
    const newItem = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
      city: this.state.city,
      id: getNextId(this.state.items)
    };
    if(this.state.id == 0){//add
this.setState(prevState => ({items: prevState.items.concat(newItem)}));
    }else{//update
      newItem.id = this.state.id;
      this.state.items.map((record,index)=>{
        if(record.id === this.state.id){
          this.state.items[index] = newItem;
        }
      })
    }
    this.setState({
      name: '',
      email:'',
      phone:'',
      id:0,
      address:'',
      city:'',
      bLabel:'Add'
    });
  }
}
export const CustomerAppF =() =>{
   const [items,setItems] = useState(getCustomers()); 
   const [customer,setCustomer] = useState({name: '',email:'',phone:'',id:0,address:'',city:''});
   const [bLabel,setBLabel] = useState('Add');
  const doDelete = (id) => {
    deleteCustomer({id});
    setItems(getCustomers());
  }
  const doEdit = (id) => {
    let temp = items.filter((record)=>(record.id == id));
    if(temp.length > 0){
      setBLabel('Update');
      setCustomer({...temp[0]});
    }
  }
  const doCopy =(name,email,phone,address,city)=>{
  //  console.log("copy");
    const newItem ={name,email,phone,address,city};
    if(customer.id == 0){
      newItem.id=getNextId(items);
      setItems([...items,newItem]);
    }
  }
  const handleChange = (e) => {
    setCustomer({...customer, [e.target.placeholder.toLowerCase()]: e.target.value });
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer.name.length) {
      return;
    }
    const newItem = {...customer};
    if(customer.id == 0){//add
      addCustomer(newItem);
      setItems(getCustomers());
    }else{//update
     updateCustomer(newItem);
      setItems(getCustomers());
    }
      doCancel();
    }
    const doCancel = ()=>{
      setCustomer({
      name: '',
      email:'',
      phone:'',
      id:0,
      address:'',
      city:'' });
     setBLabel('Add');
  }

    return (
      <div>
        <Menu/>
        <h3>Customer APP</h3>
        <form onSubmit={handleSubmit}>
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
          <Button onClick={handleSubmit}>{bLabel}</Button>&nbsp;&nbsp;
          <input type='button' value ="Cancel" onClick={doCancel}/>
        </form><br/><br/>
        <CustomerList items={items}  doDelete={doDelete}  doEdit={doEdit} doCopy={doCopy}/>
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
                <td><Button variant="danger" onClick={()=>{doDelete(item.id)}}>Delete</Button></td>
                </tr>
          ))}
            </tbody>
        </table>
      );
}

const getNextId = (customers) =>{
  if(customers.length < 1){
     return 1; 
  }
  let numberArry = customers.map((item)=>{return item.id});
  let max = Math.max(...numberArry);// (5,6,6) // spread operator
  return max + 1; 
}
