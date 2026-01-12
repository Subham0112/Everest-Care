import React from 'react';
import { FaBars } from "react-icons/fa";

function Navbar2() {
  const handleClick = () => {
    const sidebar = document.getElementById('mySidebar');
    if (sidebar) {
      sidebar.classList.add('visibleNav');
    }
  };

  return (
    <nav className="custom-nav">
      <div className="container-fluid">
        <button onClick={handleClick} className='menu-btn2'>
          <FaBars />
        </button>
      </div>
    </nav>
  );
}

export default Navbar2;
