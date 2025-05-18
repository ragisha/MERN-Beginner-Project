import React from "react";

 export function StudentFunc({name,email}) {
    return (
      <div className="App">
        <h5>StudentF Name:{name} | Email: {email}</h5>
      </div>
    );
  }
  export class StudentC extends React.Component{
    render(){
        return (
            <div className="App">
              <h5>StudentC Name:{this.props.name} | Email: {this.props.email}</h5>
            </div>
          );
    }
  }