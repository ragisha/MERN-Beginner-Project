import React, { useState,useEffect } from 'react';
import Button from "react-bootstrap/Button"
import Menu from '../components/Menu';
import { useNavigate } from "react-router-dom";
import { addProduct, deleteProduct, getProducts } from '../services/ProductAPI';

export default function ProductsApp() {
  const navigate = useNavigate();
  const [items,setItems] = useState([]);
  const [product,setProduct]= useState({name:'',company:'',code:'',date:'',id:0,city:'',country:''});
  const [bLabel,setBLabel] = useState('Add');
  const loadProducts = async ()=>{
    setItems(await getProducts());
  }
  useEffect(()=>{
    loadProducts();
  },[]);

  const doDelete = async (id) => {
    console.log("Delete");
    await deleteProduct({id});
    setItems(await getProducts());
  }
  
  const doCopy = (name,company,code,date,city,country) => {
    const newItems = {name,company,code,date,city,country};
    if(product.id==0){
    newItems.id=getNextId(items);
    setItems([...items,newItems]);
    }
    }

  let doEdit = (id)=>{
    navigate('/product/edit/'+id);
  }

    return (
      <div>
        <Menu/>
        <h3>Products</h3>
        <Button onClick={()=>{navigate('/product/add')}}>Add</Button>
        <ProductList items={items} doCopy={doCopy} doDelete={doDelete} doEdit={doEdit}/>
      </div>
    );
  };

function ProductList ({items,doCopy,doDelete,doEdit}){
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>company</th>
                    <th>code</th>
                    <th>date</th>
                    <th>city</th>
                    <th>country</th>
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
                <td>{item.company}</td>
                <td>{item.code}</td>
                <td>{item.date}</td>
                <td>{item.city}</td>
                <td>{item.country}</td>
                <td><button onClick={()=>doCopy(item.name,item.company,item.code,item.date,item.city,item.country)} >Copy</button></td>
                <td><button onClick={()=>doEdit(item.id)} >Edit</button></td>
                <td><button onClick={()=>doDelete(item.id)}>Delete</button></td>
                </tr>
          ))}
            </tbody>
        </table>
      );
}
const getNextId = (products) =>{
  if(products.length < 1){
     return 1; 
   }
   let numberArry = products.map((item)=>{return item.id});
   let max = Math.max(...numberArry);// (5,6,6) // spread operator
 return max + 1; 
 }
