import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header:React.FC<{}> = React.memo(() => {
  return (
    <nav>
      <ul className="nav nav-pills justify-content-center navbar-inverse">
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
    </nav>
  );
});
