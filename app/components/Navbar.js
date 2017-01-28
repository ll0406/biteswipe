import React from 'react';

const Navbar = props => {
  return (
    <nav className="nav-extended app-bar">
      <div className="nav-content">
        <ul className="tabs tabs-transparent">
          <li className="tab"><a href="#">History</a></li>
          <li className="tab"><a className="active">Swipe!</a></li>
          <li className="tab"><a href="#">Settings</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;