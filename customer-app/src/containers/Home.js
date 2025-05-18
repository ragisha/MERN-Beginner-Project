import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import { getCustomers } from '../services/CustomerAPI';
   function Home() {
      const [count,setCount] = useState('');
      const getCount = async ()=>{
         let result = await getCustomers();
         setCount(result.length);
      }
      
      useEffect(()=>{
         getCount();
      },[]);

      return (
         <div>
            <Menu/>
            <h2>Home</h2>
            <p> System has {count} customer records </p>
         </div>
      );
   }
    export default Home;
