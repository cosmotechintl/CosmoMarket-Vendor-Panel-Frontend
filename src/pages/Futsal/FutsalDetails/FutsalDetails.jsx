import React, { useEffect, useState } from "react";
import "./FutsalDetails.scss";
import { BASE_URL } from "../../../utils/config";
import { adminRequest, updateAuthToken } from "../../../utils/requestMethods";
import Loader from "../../../components/Loader/Loader";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";

const FutsalDetails = () => {
  const [data, setData] = useState([]);

  const location = useLocation();
  const activeURL = location.pathname.split("/")[4];

  const [refresh, setRefresh] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(null);

  const handleImageHover = (imageSrc) => {
    setFeaturedImage(imageSrc);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminRequest.post(
          `${BASE_URL}/futsal/get/detail`,
          {
            uuid: `${activeURL}`,
          }
        );
        console.log(response);
        setData(response.data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch data");
      }
    };
    fetchData();
  }, [activeURL, refresh]);

  updateAuthToken();

  if (!data || !data.data) {
    return <Loader />;
  }

  const handleBlockCourt = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure you want to block this court?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00425A",
      cancelButtonColor: "#FC0000",
      confirmButtonText: "Block",
      html: '<textarea id="blockReason" class="swal2-textarea" placeholder="Enter reason for blocking" rows="3" style="width: 80%;"></textarea>',
      preConfirm: () => {
        const blockReason = Swal.getPopup().querySelector("#blockReason").value;
        if (!blockReason) {
          Swal.showValidationMessage("Please enter a reason for block");
        }
        return { blockReason: blockReason };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await adminRequest.post(`${BASE_URL}/court/block`, {
            name: `${activeURL}`,
            remarks: result.value.blockReason,
          });
          setRefresh(!refresh);
          Swal.fire({
            title: "Blocked!",
            text: `${response.data.message}`,
            icon: "success",
          });
        } catch (error) {
          toast.error(error.message || "Failed to block data");
        }
      }
    });
  };
  const handleUnblockCourt = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure you want to unblock this court?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#00425A",
      cancelButtonColor: "#FC0000",
      confirmButtonText: "Unblock",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await adminRequest.post(
            `${BASE_URL}/court/unblock`,
            {
              name: `${activeURL}`,
            }
          );
          setRefresh(!refresh);
          Swal.fire({
            title: "Unblocked!",
            text: `${response.data.message}`,
            icon: "success",
          });
        } catch (error) {
          toast.error(error.message || "Failed to unblock user");
        }
      }
    });
  };
  const images = [
    "https://t4.ftcdn.net/jpg/01/19/56/97/360_F_119569789_8ynFAQMRNKZ3jqPVsAH4Loaz003Vtzdr.jpg",
    "https://anilblon.wordpress.com/wp-content/uploads/2015/08/futsal-in-nepal.jpg",
    "https://myrepublica.nagariknetwork.com/uploads/media/futsal-1.jpg",
  ];

  return (
    <div className="futsalDetailsContainer">
      <div className="futsalDetailsContents">
        <div className="futsalDetailsHeader">
          <span>Futsal Details</span>
        </div>
        {data && data.data ? (
          <>
            <div className="body">
              <div className="left">
                <div className="futsalFeaturedImageContainer">
                  {featuredImage ? (
                    <img src={featuredImage} className="futsalImg" />
                  ) : (
                    <img
                      src="https://the-anfa.com/storage/images/news/futsal-news_1611562395.jpg"
                      className="futsalImg"
                    />
                  )}
                </div>
                <div className="futsalImgContainer">
                  {images.map((image, index) => (
                    <div className="singleImgContainer">
                      <img
                        key={index}
                        src={image}
                        onMouseEnter={() => handleImageHover(image)}
                        className="futsalImgSmall"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="right">
                <span className="name">{data.data.name}</span>
                <span className="description">{data.data.description}</span>
                <div className="priceContainer">
                  <span className="icon">
                  <GiMoneyStack />
                  </span>
                  <span className="price">Rs. {data.data.price}</span>
                </div>
                <div className="locationContainer">
                  <span className="icon">
                    <FaMapMarkerAlt />
                  </span>
                  <span className="location">{data.data.location}</span>
                </div>
                <div className="bottom">
              <Link to={`/futsal/edit/${activeURL}`}>
                <button
                  type="button"
                  className="edit-btn"
                  disabled={data.data.status.name === "DELETED"}
                >
                  Edit
                </button>
              </Link>
              <button
                type="button"
                className="bottom-btn"
                disabled={data.data.status.name === "DELETED"}
                onClick={
                  data.data.status.name === "BLOCKED"
                    ? handleUnblockCourt
                    : handleBlockCourt
                }
              >
                {data.data.status.name === "BLOCKED" ? "Unblock" : "Block"}
              </button>
            </div>
              </div>
            </div>
            
          </>
        ) : (
          <Loader />
        )}
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default FutsalDetails;
