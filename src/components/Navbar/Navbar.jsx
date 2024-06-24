import React, { useEffect, useRef, useState } from 'react'
import "./Navbar.scss"
import { IoChevronDownSharp } from "react-icons/io5";
import { getUsername } from '../../auth';
import Menu from '../Menu/Menu';
const Navbar = () => {
  const[isMenuOpen,setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleClickOutside = (event) => {
    if(menuRef.current && !menuRef.current.contains(event.target)){
      setIsMenuOpen(false);
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const username = getUsername();
  return (
    <div className='navbarContainer'>
      <div className="logoContainer">
        {/* <div className="left">
          <img src={logo} alt="logo" className='logoImg' />
        </div> */}
        <div className="right">
          <h1 className='header'>cosmo<span>VENDOR</span> </h1>
          {/* <small>Admin Panel</small> */}
        </div>
      </div>
      <div className="profileContainer" onClick={toggleMenu} ref={menuRef}>
        <div className="profile">
          <img src="https://www.w3schools.com/howto/img_avatar.png" alt="profile" className='profileImg' />
          <span className='profileName'>Namaste, {username}</span>
          <span className="chevron"><IoChevronDownSharp/></span>
        </div>
        { isMenuOpen && <Menu/> }
      </div>
    </div>
  )
}

export default Navbar