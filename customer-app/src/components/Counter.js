import React, { useEffect, useState } from "react";

 export function CounterF({name,email}) {
  
    const [count,setCount] = useState(0);
    useEffect(()=>{
      console.log("UseEffect setup Listner");
      return ()=>{
        console.log("UseEffect return cleaning listner");
      }
    },[count]);
    const increment = () =>{
        setCount(count+1)
    }
    const reset = () =>{
        setCount(0)
    }
    const decrement = () =>{
        setCount(count-1)
    }
    return (
        <div>
        <h3>CountF {count} </h3>
        <button onClick={increment}>Increment </button>
        <button onClick={reset}>Reset to 0 </button>
        <button onClick={decrement}>Decrement </button>
      </div>
    );
  }
  export class CounterC extends React.Component {
    state={count:0,name:""};
    increment = ()=>{
     // this.state.count = this.state.count+1;
      console.log("count "+this.state.count);
      this.setState({count:this.state.count+1,name:"Vivek"});//call render
    }
    decrement = ()=>{
      //assignment
      console.log("count "+this.state.count);
      this.setState({count:this.state.count-1});
    }
    reset = ()=>{
      //assignment
      console.log("Reset to 0 "+this.state.count);
      this.setState({count:0});
    }
    render(){
      console.log(">> render")
        return (
            <div>
              <h3>CountC {this.state.count} </h3>
              <button onClick={this.increment}>Increment </button>
              <button onClick={this.reset}>Reset to 0 </button>
              <button onClick={this.decrement}>Decrement </button>
            </div>
          );

    }
}
  