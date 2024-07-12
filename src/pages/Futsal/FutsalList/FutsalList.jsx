import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethods";
import List from "../../../components/List/List";
import Loader from "../../../components/Loader/Loader";

const FutsalList = () => {
  const headers = ["Name", "Price", "Location", "Status"];
  const [futsals, setFutsals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminRequest.post(`${BASE_URL}/futsal/get`, {
          firstRow: 1,
          pageSize: 3,
        });
        setFutsals(response.data.data.records);
        console.log(response.data.data.records)
      } catch (error) {
        toast.error("Internal Server Error");
      }
    };
    fetchData();
  }, []);

  updateAuthToken();

  const getMenuItems = (futsal) => [
    { link: `view/${futsal.uuid}`, text: "View" },
    { link: `delete/${futsal.uuid}`, text: "Delete" },
    { link: `block/${futsal.uuid}`, text: "Block" },
  ];
  
  const rows = futsals.map((futsal) => [
    futsal.name,
    futsal.price,
    futsal.location,
    futsal.status.name,
  ]);

  return (
    <div className="futsalListContainer">
      {futsals ? (
        <List
          title="Futsal List"
          createButtonLabel="Create Futsal"
          headers={headers}
          rows={rows}
          link="create"
          showEyeViewIcon={true}
          showFilterIcon={true}
          getMenuItems={(futsal) =>
            getMenuItems(futsals.find((f) => f.name === futsal[0]))
          }
        />
      ) : (
        <Loader />
      )}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default FutsalList;
