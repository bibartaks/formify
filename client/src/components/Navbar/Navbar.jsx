import React from "react"
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav>
      <div className="container">
        <div className="logo">
          <h1>
            {" "}
            <span className="logo-first-text">F</span>ormify
          </h1>
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/user">User Data</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
