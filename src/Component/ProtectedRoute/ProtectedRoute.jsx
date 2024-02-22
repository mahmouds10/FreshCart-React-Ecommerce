import NotAutherizedErr from "../NotAutherizedErr/NotAutherizedErr";
import "./ProtectedRoute.css";
import React from "react";



export default function ProtectedRoute({ children }) {
  if (localStorage.getItem("tkn") == null) {
    return <NotAutherizedErr/>
  }
  return children
}
