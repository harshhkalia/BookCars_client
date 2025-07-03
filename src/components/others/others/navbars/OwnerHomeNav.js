import React, { useEffect, useState } from "react";
import "../../css/OwnerHomeNav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faPenToSquare,
  faCarSide,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

const OwnerNavbar = ({
  onModalBtnPress,
  onShowProfileControlsPress,
  onHomePageBtnPress,
  onLogOutPress,
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
      <div id="ownerNavbarBackground">
        <p id="ownerNavbarMainTxt">Roustuf Sales</p>
        <p id="ownerNavbarMTlogo">RS</p>
        <button id="logoutBtnOwnerHome" onClick={onLogOutPress}>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
        <button id="editProfileHomeOwner" onClick={onShowProfileControlsPress}>
          <FontAwesomeIcon icon={faPenToSquare} />
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
        <button id="manageCarsBtn" onClick={onModalBtnPress}>
          Manage Cars <FontAwesomeIcon icon={faCarSide} />{" "}
        </button>
        <button id="homeButtonNavBar" onClick={onHomePageBtnPress}>
          <FontAwesomeIcon icon={faHouse} /> Home
        </button>
      </div>
    </>
  );
};

export default OwnerNavbar;
