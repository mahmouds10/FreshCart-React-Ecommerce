import React, { useEffect } from "react";
import errImg from "../../Imgs/error.svg";
export default function NotFound() {
  useEffect(() =>{
    document.title = "Not Found";
  },[])
  return (
    <>
      <div style={{height:"77vh"}} className="w-100 d-flex align-items-center justify-content-center">
        <img src={errImg} alt="Not Found" />
      </div>
    </>
  );
}
