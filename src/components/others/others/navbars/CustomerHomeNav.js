import React, { useState, useEffect } from "react";
import "../../css/CustomerHomeNav.css";
import {
  faRightFromBracket,
  faShareFromSquare,
  faHouse,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomerHomeNav = ({
  OnHPBtn,
  onLogOutPress,
  showBookings,
  showCloseforBookings,
  hideBookings,
}) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchCrenditals = () => {
      const user = JSON.parse(localStorage.getItem("userdata"));
      if (user) setUser(user);
    };
    fetchCrenditals();
  }, []);

  return (
    <>
      <div id="CustomerNavbarBackground">
        <p id="ownerNavbarMainTxt">Roustuf Sales</p>
        <p id="ownerNavbarMTlogo">RS</p>
        <button id="logoutBtnCustomerHome" onClick={onLogOutPress}>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
        <p id="ownerNavbarEmail">{user.email}</p>
        <p id="ownerNavbarName">{user.firstName}</p>
        <img
          id="ownerNavbarPFP"
          src={
            user.profilePic && user.profilePic !== "undefined"
              ? `${process.env.REACT_APP_API_URL}${user.profilePic}`
              : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          alt="Profile Pic"
        />
        <div id="SLVerNav"></div>
        <button
          id="bookingsButtonCustomerHome"
          onClick={showBookings}
          style={{
            display: !showCloseforBookings ? "block" : "none",
          }}
        >
          {" "}
          <span id="bookingsBtnLogo">
            <FontAwesomeIcon icon={faShareFromSquare} />
          </span>
          My Bookings
        </button>
        <button id="homeButtonCustomerHome" onClick={OnHPBtn}>
          <span id="homeBtnLogoCustomer">
            <FontAwesomeIcon icon={faHouse} />
          </span>{" "}
          Home
        </button>
        <button
          id="closeBookingsCustomerButton"
          style={{
            display: showCloseforBookings ? "block" : "none",
          }}
          onClick={hideBookings}
        >
          Close {<FontAwesomeIcon icon={faClose} />}
        </button>
      </div>
    </>
  );
};

export default CustomerHomeNav;
