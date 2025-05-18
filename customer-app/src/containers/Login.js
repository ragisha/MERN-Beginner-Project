import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";

function Login(props) {
   var usernameInput = React.createRef(); //document.getById
   var passwordInput = React.createRef();
    const navigate = useNavigate();

      var doLogin = () =>{
              // Uncontrolled
              console.log("usernameInput:"+usernameInput.current.value);
              console.log("passwordInput:"+passwordInput.current.value);
     
              if(usernameInput.current.value == passwordInput.current.value 
                    && usernameInput.current.value!= ""){
                      navigate("/home");
              }else{
                 alert('username or password is incorrect.')
              }
                
      }
      return (
         <div>
            <h2>Login</h2>
            <form>
               <input ref={usernameInput} placeholder="username" /><br/><br/>
               <input ref={passwordInput} type="password" placeholder="password" /><br/><br/>
               <input type="button" onClick={doLogin} value="Submit" />

            </form>
         </div>
      );
}
export default Login