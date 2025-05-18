import React, { useState ,useEffect } from 'react';
import Button from "react-bootstrap/Button"
import Menu from '../components/Menu';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router';
import { addProduct, getProductById, deleteProduct,updateProduct, getProducts, getNextId } from '../services/ProductAPI';
//functional Comp
export default function AddProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [items,setItems] = useState([]);
  const [product,setProduct]= useState({name:'',company:'',code:'',date:'',id:0,city:'',country:''});
  const [bLabel,setBLabel] = useState('Add');


  const handleChange = (e) => {
    setProduct({...product,[e.target.placeholder.toLowerCase()]: e.target.value });
  }

  const updateEditProduct = async (productId) =>{
    let product = await getProductById(productId);
    setProduct(product);
    setBLabel("Update");
}

useEffect(()=>{
    if(productId){ // not undefined
      updateEditProduct(productId);
    }
  },[]);

  const handleSubmit = async (e) => {
    //e.preventDefault();
    if (!product.name.length) {
      return;
    }
    const newItem = {...product};
    if(product.id == 0){//add
      await addProduct(newItem);
      setItems(await getProducts());
    }else{ // update
      await updateProduct(newItem);
      setItems(await getProducts());
    }
    doCancel();
  }
  const doCancel = ()=>{
    navigate('/product');
  }
    return (
      <div>
        <Menu/>
        <h3>Product App</h3>
        <form>
          <input placeholder='Name'
            onChange={handleChange}
            value={product.name}
          /><br/><br/>
         <input placeholder='company'
            onChange={handleChange}
            value={product.company}
          /><br/><br/>
            <input placeholder='code'
            onChange={handleChange}
            value={product.code}
          /><br/><br/>
            <input placeholder='date'
            onChange={handleChange}
            value={product.date}
          /><br/><br/>
          <input placeholder='City'
            onChange={handleChange}
            value={product.city}
          /><br/><br/>
          <input placeholder='Country'
            onChange={handleChange}
            value={product.country}
          /><br/><br/>
          <Button onClick={handleSubmit}>{bLabel}</Button>
          &nbsp;&nbsp;
          <Button onClick={doCancel}>Cancel</Button>
        </form><br/><br/>
      </div>
    );
  };