import React from 'react'
import "./CustomerList.scss"
import List from  "../../../components/List/List"
const CustomerList = () => {
    const headers = ["Name", "Username", "Email", "Mobile No", "Address"];
    const rows = [
        ["Manjul Tamang", "manzultmg7", "manjul@gmail.com", "9804567342", "Tinkune, Kathmandu"],
        ["Kiran Khanal", "kirankhanalleo", "kiran@gmail.com", "9804567342", "Tinkune, Kathmandu"],
    ];
  return (
    <div className="customerListContainer">
        <List
            title="Customer Lists"
            showEyeViewIcon={true}
            showFilterIcon={true}
            headers={headers}
            rows={rows}
            createButtonLabel='Create Customer'
        />
    </div>
  )
}

export default CustomerList