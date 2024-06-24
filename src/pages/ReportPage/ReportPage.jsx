import React from 'react'
import Card from "../../components/Card/Card"
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { MdOutlineInventory2 } from "react-icons/md";
import { IoBusinessOutline } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";
import { BiWorld } from "react-icons/bi";
import { Link } from 'react-router-dom';
import "./ReportPage.scss"
const ReportPage = () => {
  return (  
    <div className="reportPageContainer">
        <div className="reportPageContents">
            <div className="headerTitle">Reports</div>
            <div className="reportsCard">
            <Link to ="#" style={{ textDecoration:"none" }}>
                <Card icon={<LiaFileInvoiceDollarSolid/>} title="Financial Report"/>
            </Link>
                <Card icon={<GiMoneyStack/>} title="Loan Report"/>
                <Card icon={<BiWorld/>} title="Marketing Report"/>
                <Card icon={<MdOutlineInventory2/>} title="Inventory Report"/>
                <Card icon={<LiaFileInvoiceDollarSolid/>} title="Annual Report"/>
                <Card icon={<IoBusinessOutline/>} title="Department Report"/>
            </div>  
        </div>
    </div>
  )
}

export default ReportPage