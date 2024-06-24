import React from 'react'
import "./NotFound.scss"
import { MdErrorOutline } from "react-icons/md";
const NotFound = () => {
  return (
    <div className='notFoundContainer'>
        <div className="notFoundContents">
            <div className="notFoundIcon">
                <MdErrorOutline className='notFoundIcon'/>
            </div>
            <div className="notFoundText">No data found!</div>
        </div>
    </div>
  )
}

export default NotFound