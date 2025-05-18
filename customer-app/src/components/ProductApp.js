import React, { useState } from 'react';
import ReactDOM from 'react-dom';


export const ProductApp =() =>{
    const [items,setItems] = useState([{id:1,name:'NoteBook',company:'ITC',code:'NOTEBOOK180',date:'2022-09-02',city:'Chennai',country:'India'},
     {id:2,name:'Headset',company:'Boat',code:'HEADSET028',date:'2022-09-01',city:'Bangalore',country:'India'}]); 
    const [product,setProduct] = useState({id:0,name: '',company:'',code:'',date:'',city:'',country:''});
    const [bLabel,setBLabel] = useState('Add_Product');
    const doDelete = (id) => {
      let temp = items.filter((record)=>(record.id != id));
      setItems(temp);
    }
    const doEdit = (id) => {
      let temp = items.filter((record)=>(record.id == id));
      if(temp.length > 0){
        setBLabel('Update');
       setProduct({...temp[0]});
     }
   }
   const handleChange = (e) => {
     setProduct({...product, [e.target.placeholder.toLowerCase()]: e.target.value });
   }
   
   const handleSubmit = (e) => {
     e.preventDefault();
     if (!product.name.length) {
       return;
     }
     const newItem = {...product};
     if(product.id == 0){//add
       newItem.id=getNextId(items);
       setItems([...items,newItem]);
     }else{//update
       newItem.id = product.id;
       items.map((record,index)=>{
         if(record.id === product.id){
           items[index] = newItem;
         }
       })
     }
       doCancel();
     }
     const doCancel = ()=>{
       setProduct({
        name: '',
        company:'',
        code:'',
        date:'',
        city:'',
        id:0,
        country:'' });
      setBLabel('Add_Product');
   }
 
     return (
       <div>
        
         <form onSubmit={handleSubmit}>
           <input placeholder='Name'
             onChange={handleChange}
             value={product.name}
           /><br/><br/>
           <input placeholder='Company'
             onChange={handleChange}
             value={product.company}
           /><br/><br/>
            <input placeholder='Code'
             onChange={handleChange}
             value={product.code}
           /><br/><br/>
            <input placeholder='Date'
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
           <button>{bLabel}</button>
           &nbsp;&nbsp;
           <input type='button' value ="Cancel" onClick={doCancel}/>
         </form><br/><br/>
         <ProductList items={items}  doDelete={doDelete}  doEdit={doEdit}/>
       </div>
     );
   };
  
 function ProductList ({items,doDelete,doEdit}){
     return (
         <table className="table table-striped">
             <thead>
                 <tr>
                     <th>ID</th>
                     <th>Product Name</th>
                     <th>Company</th>
                     <th>Product Code</th>
                     <th>Date</th>
                     <th>City</th>
                     <th>Country</th>
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
                 <td><button onClick={()=>{doEdit(item.id)}}>Edit</button></td>
                 <td><button onClick={()=>{doDelete(item.id)}}>Delete</button></td>
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
 