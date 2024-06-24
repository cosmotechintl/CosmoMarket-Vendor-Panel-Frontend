import React, { useEffect, useState } from 'react'
import "./AccessGroupList.scss"
import List from '../../../components/List/List'
import { adminRequest, updateAuthToken } from '../../../utils/requestMethods';
import { BASE_URL } from '../../../utils/config';
import toast, { Toaster } from 'react-hot-toast';
import Loader from "../../../components/Loader/Loader"

const AccessGroupList = () => {
  const headers=["Name","Type"];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminRequest.post(`${BASE_URL}/accessGroup`, {
          "firstRow": 0,
          "pageSize": 0
        });
        console.log(response);
        const fetchedRows = response.data.data.records.map(accessGroup => [
          accessGroup.name,
          accessGroup.type.name
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
    { link: `view/${row[0]}`, text: 'View' },
    { link: `/delete/${row[1]}`, text: 'Edit' },
    { link: `/delete/${row[1]}`, text: 'Delete' },
  ];

  return (
    <div className='accessGroupContainer'>
      <div className="accessGroupContents">
        {rows ? 
        <List 
          title="Access Groups" 
          createButtonLabel="Create Access Group"
          headers={headers}
          rows={rows}
          link="create"
          showEyeViewIcon = {false}
          showFilterIcon = {false}
          getMenuItems={getMenuItems} 
        />
        : <Loader/>
        }
      </div>
      <Toaster />
    </div>
  )
}

export default AccessGroupList