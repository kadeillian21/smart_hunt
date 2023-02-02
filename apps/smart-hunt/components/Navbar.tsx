import { Link } from "react-router-dom";
import { Logout } from "./Logout";
import React from "react";


export function Navbar() {
  return(
    <nav className="navbar navbar-expand-lg fixed-top navbar-background">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
          Smart Hunt
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-white" aria-current="page" to="/species">
                Species
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active text-white" aria-current="page" to="/charts">
                Charts
              </Link>
            </li>
          </ul>
        </div>
        <Logout />
      </div>
    </nav>
  )
}
