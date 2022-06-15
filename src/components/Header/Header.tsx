import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/Logo.png';

export const Header:React.FC<{}> = React.memo(() => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <NavLink to="/home" className="navbar-brand d-flex align-items-center p-0">
          <img
            src={logo}
            alt="MDB Logo"
            height="50"
          />
          <span className="navbar-brand mb-0 h1 nav-link">
            Rick and Morty
          </span>
        </NavLink>
        <ul className="nav">
          <li className="nav-item">
            <NavLink to="/home" className="nav-link">
              Home page
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/list" className="nav-link">
              List of characters
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
});
