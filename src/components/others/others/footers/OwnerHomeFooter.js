import React, { useEffect, useState } from "react";
import "../../css/OwnerHomeFooter.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

const OwnerHomeFooter = ({
  setHomeUI,
  setSelectedCarInfo,
  setDisplaySelectedCarImage,
  setSelectedCarDetailsModal,
  setEditCarDetailsModal,
  setDisplayEditUserProfileModal,
  setManageCarsModal,
  setRejectUserBookingData,
  setShowCAdetails,
  setShowSelectedPendingBooking,
  setRespondPendingUserModal,
  setFrontUIrejectedModel,
  setOwnerShowMoreCBdetailsModal,
  setRespondToUserModal,
  setResponseText,
  setRejectText,
  setFetchedCarPendingBookings,
  setRejectBookingModal,
  setAcceptBookingForOtherCarModal,
  setResponseTextToOtherBooking,
  setRejectTextToOtherBooking,
  setRejectBookingForOtherCarModal,
  setBookedDataForOtherCars,
}) => {
  const [user, setUser] = useState({});
  const [fetchedCars, setFetchedCars] = useState([]);

  useEffect(() => {
    const fetchCrenditals = () => {
      const user = JSON.parse(localStorage.getItem("userdata"));
      if (user) setUser(user);
    };
    fetchCrenditals();
  }, []);

  const fetchCarsInHistory = async () => {
    try {
      if (user?._id) {
        const token = localStorage.getItem("token");
  
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/getMineCars/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        setFetchedCars(response.data.cars);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.warn("No cars found for this user.");
        setFetchedCars([]);
      } else {
        console.error("Error fetching cars:", error);
        window.alert(
          "An error occurred while fetching cars. Please try again."
        );
      }
    }
  };  

  useEffect(() => {
    fetchCarsInHistory();
  }, [user?._id]);

  const handleShowCarInformation = (car) => {
    setHomeUI(false);
    localStorage.setItem("selectedCar", JSON.stringify(car));
    setSelectedCarInfo(car);
    setDisplaySelectedCarImage(null);
    setSelectedCarDetailsModal(true);
    setEditCarDetailsModal(false);
    setDisplayEditUserProfileModal(false);
    setManageCarsModal(false);
    setShowCAdetails(false);
    setShowSelectedPendingBooking(false);
    setRespondPendingUserModal(false);
    setFrontUIrejectedModel(false);
    setOwnerShowMoreCBdetailsModal(false);
    setFetchedCarPendingBookings([]);
    setRespondToUserModal(false);
    setRejectBookingModal(false);
    setRejectUserBookingData({});
    setRejectText("");
    setAcceptBookingForOtherCarModal(false);
    setResponseText("");
    setResponseTextToOtherBooking("");
    setRejectTextToOtherBooking("");
    setRejectBookingForOtherCarModal(false);
    setBookedDataForOtherCars([]);
  };

  return (
    <>
      <div id="footerBackgroundOHP">
        <div id="footerMCcontainer">
          {fetchedCars.length === 0 ? (
            <p id="footerNCU">No cars in your showroom yet!!</p>
          ) : (
            fetchedCars.map((car, index) => (
              <div
                id="footerMCcarDetails"
                key={index}
                onClick={() => handleShowCarInformation(car)}
              >
                <img
                  id="CAMMcarImageBelowOne"
                  src={`${process.env.REACT_APP_API_URL}${car.carImages[0]}`}
                  alt={car.modelName}
                />
                <div id="CAMMcarMoreDetailsContainer">
                  <p id="CAMMcarName">{car.modelName}</p>
                  <p id="CAMMcarPrice">
                    On ₹ <p id="priceCC"> {car.price}</p>
                  </p>
                  <p id="CAMMcarSeats">Have {car.seatingCapacity} seats</p>
                  <p id="CAMMcarMD">
                    More <FontAwesomeIcon icon={faArrowUpFromBracket} />
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        <p id="footerMCtxt">Your cars in showroom</p>
      </div>
    </>
  );
};

export default OwnerHomeFooter;
