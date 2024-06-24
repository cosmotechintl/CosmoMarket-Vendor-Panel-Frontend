import React from 'react'
import "./Footer.scss"
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className='footerContainer'>
      <span>Copyright &copy; {year}, Cosmotech International Pvt. Ltd. | All Rights Reserved. </span>
    </div>
  )
}

export default Footer