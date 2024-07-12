import React, {useEffect, useState} from 'react';
import { BASE_URL } from '../../../utils/config';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from '../../../utils/requestMethods';
import List from '../../../components/List/List';
import Loader from '../../../components/Loader/Loader';


const ProductList = () => {
  const headers = ["Name","Category","Quantity","Stock","Status","Code"];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminRequest.post(`${BASE_URL}/product/get`, {

          "firstRow": 1,
          "pageSize": 3
        });
        const fetchedRows = response.data.data.records.map(product => [
          product.name,
          product.category.name,
          product.quantity,
          product.inStock ? "Available" : "Unavailable",
          product.status.name,
          product.code
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
  { link: `edit/${row[1]}`, text: 'Edit' }
];
  return (
   <div className='productListContainer'>
     { rows.length > 0 ? 
        <List
          title="Products List"
          createButtonLabel='Create Product'
          headers={headers}
          rows={rows}
          link="create"
          showEyeViewIcon={true}
          showFilterIcon={true}
          getMenuItems={getMenuItems} 
        />
        : <Loader/>
      }
      <ToastContainer position='top-center'/>

   </div>
  );
};

export default ProductList;
