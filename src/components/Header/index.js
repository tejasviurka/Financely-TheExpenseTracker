import React from 'react';
import "./style.css";


function Header() {
    function logoutFnc() {
        alert("Logout!");
      }

  return (
    <div className="navbar">
        <p className="logo">Financely</p>
        <p className="logo link" onClick={logoutFnc}>Logout</p>
      
    </div>
  );
}

export default Header;
