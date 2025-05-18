import { useState } from "react";

const hideb = (flag)=>{
    if(flag){
        return(<button>Show</button>)
    }
}
 function Showhide(){
    const[hide,setHide] = useState(false);
    const show=()=>{
        setHide(!hide);
    }
    return(
        <div>
            <button onClick={show}>click</button>
            {hideb(hide)};
        </div>
    );
 }

 export default Showhide;