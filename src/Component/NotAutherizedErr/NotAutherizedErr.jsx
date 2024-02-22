import React, { useEffect } from 'react' 
import img from "../../Imgs/401Error Unauthorized-amico.svg"
export default function NotAutherizedErr() { 
  useEffect(()=>{
    document.title = "Not Autherized Error"
  },[])
  return ( 
    <> 
      <div style={{minHeight:"77vh"}} className="w-100 d-flex align-items-center justify-content-center">
        <img src={img} style={{width:37 +"%"}} alt="Not Autherized" />
      </div>
    </> 
  ) 
} 
