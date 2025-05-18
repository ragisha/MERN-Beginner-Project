import React, { useState , useEffect} from 'react';

export class TimerC extends React.Component {
  constructor(props) {
    super(props);
    console.log(">>constructor");
    this.state = { seconds: 0 };
  }

  tick() {
    this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }));
  }
  componentDidMount() {
    console.log(">>componentDidMount");
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    console.log(">>componentWillUnmount");
    clearInterval(this.interval);
  }
stop=()=>{
    clearInterval(this.interval);
}
reset=()=>{
    this.setState({seconds: 0});
}
reStart=()=>{
    clearInterval(this.interval);
    this.interval = setInterval(() => this.tick(),1000);
}
  render() {
    return (
      <div>
        Seconds C: {this.state.seconds} <br/><br/>
        <button onClick={this.stop}> Stop</button>&nbsp;
        <button onClick={this.reset}> Reset to 0</button>&nbsp;
        <button onClick={this.reStart}> Start</button>
      </div>
    );
  }
}
export const TimerF=()=>{
    console.log(">> TimerF");
    const [seconds,setSeconds] = useState(0);
    const [secInterval,setSecondInterval] = useState(0);

  const tick= () => {
    setSeconds(prevVal => (prevVal + 1));
  }
    useEffect(()=>{
        console.log(">> onMount");
        reStart();
        return ()=>{
            console.log(">> onUnMount");
        }
    },[])
    const stop =()=>{
        clearInterval(secInterval);
    }
    const reset =()=>{
        setSeconds(0);
    }
    const reStart =()=>{
        stop();
        const interval = setInterval(() => tick(), 1000);
        setSecondInterval(interval);
    }
    return (
        <div>
          Seconds F: {seconds}<br/><br/>
          <button onClick={stop}> Stop</button>&nbsp;
          <button onClick={reset}> Reset to 0</button>&nbsp;
          <button onClick={reStart}> ReStart</button>
        </div>
      );

}