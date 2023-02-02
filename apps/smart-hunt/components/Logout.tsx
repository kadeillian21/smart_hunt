import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export function Logout() {
  const handleClick = (event:any) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };

  return (
    <Link onClick={handleClick} className="nav-link active text-white" aria-current="page" to={""}>
      Logout
    </Link>
  );
}
