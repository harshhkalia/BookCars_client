import React from "react";
import "../../css/CustomerHomeFooter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const CustomerHomeFooter = ({ showroomHistory, user, setShowroomHistory }) => {
  const visitedShowrooms = showroomHistory?.visitedShowrooms || [];

  const handleRemoveOneVisit = async (showroom) => {
    const confirmation = window.confirm("We will remove this visit?");
    if (!confirmation) return;
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/customers/removeVisitedShowroom?ownerId=${showroom?.ownerId?._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data.visitedShowrooms);
        setShowroomHistory((prevShowrooms) => ({
          ...prevShowrooms,
          visitedShowrooms: response.data.visitedShowrooms,
        }));
      }
    } catch (error) {
      console.error("Failed to remove the showroom visit due to:", error);
      window.alert(error.response.data.message);
    }
  };  
  
  return (
    <>
      <div id="customerHomeFooter">
        <p id="customerHomeFirstText">Your last 5 visited showrooms</p>
        <div id="customerHomeFooterMainContainer">
          {visitedShowrooms.length === 0 ? (
            <p id="customerHomeSecondText">No data available at the moment</p>
          ) : (
            <>
              {visitedShowrooms.map((showroom, index) => (
                <div key={index} id="historyShowroomContainer">
                  <img
                    id="historyShowroomImg"
                    src={`${process.env.REACT_APP_API_URL}${showroom?.ownerId?.showroomDetails?.coverPFP}`}
                    alt={`${
                      showroom?.ownerId?.showroomDetails?.carName || "Showroom"
                    } Cover`}
                  />
                  <p id="historyShowroomCarName">
                    {showroom?.ownerId?.showroomDetails?.carName}
                  </p>
                  <p id="historyShowroomLocation">
                    {showroom?.ownerId?.showroomDetails?.location}
                  </p>
                  <p id="historyShowroomTimeViewedP">Last Viewed</p>
                  <p id="historyShowroomTimeViewed">
                    {new Date(showroom?.visitedAt).toLocaleTimeString()}
                  </p>
                  <p id="historyShowroomDateViewed">
                    {new Date(showroom?.visitedAt).toLocaleDateString()}
                  </p>
                  <p
                    id="historyShowroomViewP"
                    onClick={() => handleRemoveOneVisit(showroom)}
                  >
                    <span id="uparrowBtnSC">
                      <FontAwesomeIcon icon={faRemove} />
                    </span>
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomerHomeFooter;
