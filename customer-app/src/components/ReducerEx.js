import React,{useContext,useReducer, useState} from 'react';

const initialState = {count: 0};

function reducer(state, action) { //just like service
    // Action(dispatch) => State => Views
    // Actions increment and decrement

    //  const [state, dispatch] = useReducer(reducer, initialState);
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1}; // next State
    case 'decrement':
      return {count: state.count - 1}; // next State
    default:
      throw new Error();
  }
}

function Counter() {
  const [name, setName] = useState("initial");
  const [state, dispatch] = useReducer(reducer, initialState);
 
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}

export default Counter;