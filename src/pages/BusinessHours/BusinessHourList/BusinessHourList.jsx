import React, { useEffect, useState } from 'react'
import "./BusinessHourList"
import { adminRequest, updateAuthToken } from '../../../utils/requestMethods';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from '../../../utils/config';
import List from '../../../components/List/List';
import Loader from '../../../components/Loader/Loader';

const BusinessHourList = () => {
    const headers = ["Day", "Start Time", "End Time"];
    const [rows, setRows] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await adminRequest(`${BASE_URL}/businessHour/detail`);
        console.log(response);
        const fetchedRows = response.data.data.map(businessHour => [
            businessHour.day,
            businessHour.startTime,
            businessHour.endTime,
        ]);
        setRows(fetchedRows);
        } catch (error) {
        toast.error(error.message || "Failed to fetch data");
        }
    };
    fetchData();
    }, []);

    updateAuthToken();

  const getMenuItems = (row) => [
    { link: `view/${row[1]}`, text: 'View' },
    { link: `delete/${row[1]}`, text: 'Delete' },
    { link: `block/${row[1]}`, text: 'Block' },
    { link: `reset-password/${row[1]}`, text: 'Reset Password' }
  ];

  return (
    <div className='businessHourListContainer'>
        { rows.length > 0 ? 
            <List
            title="Business Hour"
            createButtonLabel='Edit Business Hour'
            headers={headers}
            rows={rows}
            link="create"
            showEyeViewIcon={true}
            showFilterIcon={true}
            getMenuItems={getMenuItems} 
            />
            : <Loader/>
        }
        <ToastContainer position='top-center' />
    </div>
  )
}

export default BusinessHourList