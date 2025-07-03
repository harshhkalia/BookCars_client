import React, { useEffect, useState } from "react";
import CustomerHomeNav from "../others/others/navbars/CustomerHomeNav";
import "../others/css/CustomerHome.css";
import CustomerHomeFooter from "../others/others/footers/CustomerHomeFooter";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const CustomerHome = () => {
  const [customerHomeUI, setCustomerHomeUI] = useState(true);
  const [fetchedShowrooms, setFetchedShowrooms] = useState([]);
  const [viewAllSuggestedCarsModal, setViewAllSuggestedCarsModal] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedShowrooms, setSearchedShowrooms] = useState([]);
  const [enteredTerm, setEnteredTerm] = useState("");
  const [moreSearchedShowroomsContainer, setMoreSearchedShowroomsContainer] =
    useState(false);
  const [showUserProfileModal, setShowUserProfileModal] = useState(false);
  const [user, setUser] = useState({});
  const [editUserProfileModal, setEditUserProfileModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [editDetails, setEditDetails] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [newUserPFP, setNewUserPFP] = useState(null);
  const [selectedSRdata, setSelectedSRdata] = useState({});
  const [selectedCar, setSelectedCar] = useState(false);
  const [selectedSRcars, setSelectedSRcars] = useState([]);
  const [VCdata, setVCdata] = useState({});
  const [VCcarShowImage, setVCcarShowImage] = useState(false);
  const [VCcarImage, setVCcarImage] = useState(null);
  const [showroomHistory, setShowroomHistory] = useState([]);
  const [appointmentContent, setAppointmentContent] = useState("");
  const [showBookingMoreButtons, setShowBookingMoreButton] = useState(false);
  const [showCustomerPendingBookings, setShowCustomerPendingBookings] =
    useState(false);
  const [customerPendingBookings, setCustomerPendingBookings] = useState([]);
  const [customerAcceptedBookings, setCustomerAcceptedBookings] = useState([]);
  const [showCustomerAcceptedBookings, setShowCustomerAcceptedBookings] =
    useState(false);
  const [customerRejectedBookings, setCustomerRejectedBookings] = useState([]);
  const [showCustomerRejectBookings, setShowCustomerRejectedBookings] =
    useState(false);
  const [showCloseforBookings, setShowCloseForBookings] = useState(false);

  const navigate = useNavigate();

  const fetchAllTheShowrooms = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/getAllShowrooms`
      );
      setFetchedShowrooms(response.data.owners);
      console.log(response.data);
    } catch (err) {
      console.error("Error in fetching all the showrooms:", err);
    }
  };

  const fetchUser = () => {
    const user = JSON.parse(localStorage.getItem("userdata"));
    if (user) setUser(user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchAllTheShowrooms();
  }, []);

  const handleShowViewSuggestedCarsModal = () => {
    setViewAllSuggestedCarsModal(true);
  };

  const handleHideViewSuggestedCarsModal = () => {
    setViewAllSuggestedCarsModal(false);
  };

  const handleSearchShowrooms = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/search/showrooms/${searchTerm}`
      );
      setSearchedShowrooms(response.data.showRooms);
      console.log("You searched for showrooms:", response.data.showRooms);
      setSearchTerm("");
      setEnteredTerm(searchTerm);
    } catch (err) {
      console.error("Error in searching for showrooms:", err);
      window.alert("No showrooms found for this location!!");
    }
  };

  const handleShowMoreSearchedShowrooms = () => {
    setMoreSearchedShowroomsContainer(true);
  };

  const handleHideMoreSearchedShowrooms = () => {
    setMoreSearchedShowroomsContainer(false);
    setSearchTerm("");
    setEnteredTerm("");
    setSearchedShowrooms([]);
  };

  const handleShowUserProfileModal = () => {
    setShowUserProfileModal(true);
  };

  const handleHideUserProfileModal = () => {
    setShowUserProfileModal(false);
  };

  const handleShowEditControlsForUser = () => {
    setEditUserProfileModal(true);
    setShowUserProfileModal(false);
  };

  const handleClsEditControlsForUser = () => {
    setEditUserProfileModal(false);
    setShowUserProfileModal(true);
  };

  const handleShowNotificationsForUser = () => {
    setShowUserProfileModal(false);
    setShowNotificationsModal(true);
  };

  const handleCloseNotificationsForUser = () => {
    setShowNotificationsModal(false);
    setShowUserProfileModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeInUserPFP = (e) => {
    const file = e.target.files[0];
    setNewUserPFP(file);
  };

  const handleProfileDetailsChange = async (e) => {
    e.preventDefault();
  
    if (
      !editDetails.firstName &&
      !editDetails.lastName &&
      !editDetails.password &&
      !newUserPFP
    ) {
      return window.alert("Please do some changes to save changes.");
    }
  
    const formData = new FormData();
    formData.append("confirmPassword", editDetails.confirmPassword);
    if (editDetails.firstName)
      formData.append("firstName", editDetails.firstName);
    if (editDetails.lastName) formData.append("lastName", editDetails.lastName);
    if (editDetails.password) formData.append("password", editDetails.password);
    if (newUserPFP) formData.append("newProfilePic", newUserPFP);
  
    try {
      const token = localStorage.getItem("token");
  
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/changeUserProfileDetails`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        window.alert(response.data.message);
        localStorage.setItem("userdata", JSON.stringify(response.data.user));
        window.location.reload();
      } else {
        window.alert("Something went wrong while changing your details!!");
      }
    } catch (error) {
      console.error("Failed to edit details of your account due to : ", error);
      window.alert(error.response.data.message);
    }
  };  

  const handleNavToHomePage = () => {
    localStorage.removeItem("selectedSR");
    setCustomerHomeUI(true);
    setSelectedSRdata({});
    setSelectedSRcars([]);
    localStorage.removeItem("VCdata");
    setSelectedCar(false);
    setVCcarShowImage(false);
    setVCcarImage(null);
    window.alert("We will reload page once to do some changes.");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // useEffect(() => {
  //   handleFetchSelectedSRcars();
  // }, [selectedSRdata]);

  useEffect(() => {
    fetchShowroomData();
  }, []);

  const handleSelectedAshowRoom = (showroom) => {
    localStorage.setItem("selectedSR", JSON.stringify(showroom));
    setCustomerHomeUI(false);
    setSelectedSRdata(showroom);
    setVCcarShowImage(false);
    setVCcarImage(null);
    handlefetchshowroomcars(showroom._id);
  };

  const handlefetchshowroomcars = async (ownerId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/showroom/${ownerId}/cars`
      );
      if (response.status === 200) {
        setSelectedSRcars(response.data.cars);
      }
    } catch (err) {
      console.error("Failed to fetch selected showroom cars due to: ", err);
    }
  };
  

  const fetchShowroomData = () => {
    const showroomData = JSON.parse(localStorage.getItem("selectedSR"));
    if (showroomData) {
      setSelectedSRdata(showroomData);
    }
  };

  // const handleFetchSelectedSRcars = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/getMineCars`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     if (response.status === 200) {
  //       setSelectedSRcars(response.data.cars);
  //     }
  //   } catch (err) {
  //     console.error("Failed to fetch selected showroom cars due to: ", err);
  //   }
  // };  

  const handleViewSelectedCar = (car) => {
    setSelectedCar(true);
    localStorage.setItem("VCdata", JSON.stringify(car));
    fetchVC();
    setVCcarShowImage(false);
    setVCcarImage(null);
  };

  const fetchVC = () => {
    const VCdata = JSON.parse(localStorage.getItem("VCdata"));
    if (VCdata) {
      setVCdata(VCdata);
    }
  };

  const handleDisplayVCcarImage = (image) => {
    setVCcarImage(image);
    setVCcarShowImage(true);
  };

  const handleHideVCcarImage = () => {
    setVCcarShowImage(false);
    setVCcarImage(null);
  };

  const handleSendEmailToOwner = () => {
    const myEmail = user?.email;
    const ownerEmail = selectedSRdata?.email;
    const subject = "Query Regarding Your Showroom";
    const body = `Hello ${selectedSRdata?.firstName}, \n\nThis is ${user?.firstName} ${user?.lastName} and I am seeking some information regarding your showroom at ${selectedSRdata?.showroomDetails?.location}. Please reach out to me at ${myEmail}.`;
    window.open(`mailto:${ownerEmail}?subject=${subject}&body=${body}`);
  };

  const handleLogOutFromUser = () => {
    const confirmation = window.confirm("Are you sure you want to logout?");
    if (!confirmation) return;
    localStorage.removeItem("userdata");
    localStorage.removeItem("token");
    navigate("/");
  };

  if (user && selectedSRdata) {
    const handleSaveShowroomHistory = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/customers/recentlyVisitedShowrooms`,
          {
            ownerId: selectedSRdata?._id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
    
        if (response.status === 200) {
          console.log("Showroom visit saved successfully:", response.data);
        } else {
          console.error(
            "Failed to save showroom history due to: ",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Failed to save showroom history due to: ", error);
      }
    };
    handleSaveShowroomHistory();
  }

  const handleFetchAllUserVisits = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/customers/allVisitedShowrooms`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setShowroomHistory(response.data.visitedShowrooms);
      }
    } catch (error) {
      console.error(
        "Failed to fetch history of visits to showrooms by user due to : ",
        error
      );
    }
  };  

  useEffect(() => {
    handleFetchAllUserVisits();
  }, [user]);

  const handleSendAnAppointmentToOwner = async (e) => {
    e.preventDefault();

    if (!appointmentContent) {
      return window.alert("Please add some content to your appointment.");
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/customers/saveCarBooking?ownerId=${selectedSRdata?._id}&carId=${VCdata?._id}`,
        {
          bookingContent: appointmentContent,
        }
      );
      if (response.status === 200) {
        window.alert(response.data.message);
        setAppointmentContent("");
      } else {
        window.alert("Something went wrong while sending your appointment!!");
      }
    } catch (error) {
      console.error("Failed to send appointment to owner due to : ", error);
      if (error.response?.data?.errors) {
        window.alert(error.response.data.errors.join("\n"));
      } else if (error.response?.data?.message) {
        window.alert(error.response.data.message);
      } else {
        window.alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleShowBookingsButtonCustomer = () => {
    setShowBookingMoreButton(true);
    setShowCloseForBookings(true);
  };

  const handleShowBookingsAcceptedFromUser = () => {
    setShowCustomerAcceptedBookings(true);
    setShowBookingMoreButton(false);
    handleFetchCustomerAcceptedBookings();
    setShowCloseForBookings(false);
  };

  const handleHideBookingsButtonCustomer = () => {
    setShowBookingMoreButton(false);
    setShowCloseForBookings(false);
  };

  const handleFetchCustomerPendingBookings = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/customer/fetchPendingBookingsForCustomer`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setCustomerPendingBookings(response.data.bookings);
      }
    } catch (error) {
      console.error(
        "Failed to fetch pending bookings for customer due to : ",
        error
      );
    }
  };  

  useEffect(() => {
    handleFetchCustomerPendingBookings();
    handleFetchCustomerAcceptedBookings();
    handleFetchCustomerRejectedBookingsFromFunction();
  }, [user]);

  const showCustomerPendingBookingContainer = () => {
    setShowCustomerPendingBookings(true);
    setShowBookingMoreButton(false);
    handleFetchCustomerPendingBookings();
    setShowCloseForBookings(false);
  };

  const handleCloseCustomerPendingBookings = () => {
    setCustomerPendingBookings([]);
    setShowCustomerPendingBookings(false);
  };

  const handleFetchCustomerAcceptedBookings = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/customer/fetchAcceptedBookingsForCustomer`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setCustomerAcceptedBookings(response.data.bookings);
      }
    } catch (error) {
      console.error(
        "Failed to fetch accepted bookings for customer due to : ",
        error
      );
    }
  };  

  const handleCloseCustomerAcceptedBookingModal = () => {
    setCustomerAcceptedBookings([]);
    setShowCustomerAcceptedBookings(false);
  };

  const handleFetchCustomerRejectedBookings = () => {
    setShowCustomerRejectedBookings(true);
    handleFetchCustomerRejectedBookingsFromFunction();
    setShowBookingMoreButton(false);
    setShowCloseForBookings(false);
  };

  const handleHideCustomerRejectBooking = () => {
    setShowCustomerRejectedBookings(false);
    setCustomerRejectedBookings([]);
  };

  const handleFetchCustomerRejectedBookingsFromFunction = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/customer/fetchRejectedBookingsForCustomer`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setCustomerRejectedBookings(response.data.bookings);
      }
    } catch (error) {
      console.error(
        "Failed to fetch rejected bookings for customer due to : ",
        error
      );
    }
  };  

  console.log("Rejected bookings for owner ", customerRejectedBookings);

  return (
    <>
      <CustomerHomeNav
        OnHPBtn={handleNavToHomePage}
        onLogOutPress={handleLogOutFromUser}
        showBookings={handleShowBookingsButtonCustomer}
        showCloseforBookings={showCloseforBookings}
        hideBookings={handleHideBookingsButtonCustomer}
      />
      <div
        id="customerHomeUIcontainer"
        style={{
          display: customerHomeUI ? "block" : "none",
        }}
      >
        <img
          id="homePageBackgroundImage"
          src={`${process.env.REACT_APP_API_URL}/public/images/homePageBG.jpg`}
          alt="Background Image"
        />
        <div id="customerHomeSearchContainer">
          <p id="customerHomeSearchText">Search Showrooms By Location</p>
          <input
            type="text"
            id="customerHomeSearchInput"
            placeholder="Enter Location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button id="customerHomeSearchButton" onClick={handleSearchShowrooms}>
            Search Showrooms
          </button>
          <div id="customerHomeSCSL"></div>
          <div id="customerHomeSearchContainerDefaultDiv">
            {searchedShowrooms.length > 0 ? (
              <>
                <p id="searchedShowroomContainerHead">
                  Showing results for {enteredTerm}
                </p>
                {searchedShowrooms.slice(0, 3).map((showroom, index) => (
                  <div key={showroom._id}>
                    <div id="searchedShowroomBGcontainer">
                      <img
                        id="searchedShowroomImagesOfST"
                        src={`${process.env.REACT_APP_API_URL}${showroom.showroomDetails?.coverPFP}`}
                        alt={`${showroom.showroomDetails?.carName} Photo`}
                      />
                      <p id="searchedShowroomTextOfST">
                        {showroom.showroomDetails?.carName}
                      </p>
                      <p id="searchedShowroomLocationOfST">
                        {showroom.showroomDetails?.location}
                      </p>
                      <p id="searchedShowroomsTotalModelCount">
                        {showroom.modelCount} Models available
                      </p>
                      <p
                        id="searchedShowroomsViewP"
                        onClick={() => handleSelectedAshowRoom(showroom)}
                      >
                        View
                        <span id="uparrowBtnSC">
                          <FontAwesomeIcon icon={faArrowUpFromBracket} />
                        </span>
                      </p>
                    </div>
                    {index === 2 && (
                      <div id="showSearchedResultsTxt">
                        <p
                          id="showSearchedResultsText"
                          onClick={handleShowMoreSearchedShowrooms}
                        >
                          Show All Results
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <p id="customerHomeSearchContainerNoShowroomsText">
                Enter location and we will find you the best showrooms for you
              </p>
            )}
          </div>
        </div>
        <div id="customerHomeSuggestedShowroomsContainer">
          <p id="customerHomeSuggestedContainerText">Suggested for you</p>
          <div id="customerHSCSL"></div>
          <div id="customerHomeSuggestedMainDataContainer">
            {Array.isArray(fetchedShowrooms) &&
            fetchedShowrooms.length === 0 ? (
              <p id="customerHomeNoShowroomsText">No Showrooms Found!!</p>
            ) : (
              Array.isArray(fetchedShowrooms) &&
              fetchedShowrooms.slice(0, 3).map((showroom, index) => (
                <>
                  <div id="suggestedShowroomBackground" key={showroom._id}>
                    <img
                      id="showroomImageCoverSuggestedContainerDiv"
                      src={`${process.env.REACT_APP_API_URL}${showroom.showroomDetails?.coverPFP}`}
                      alt={`${showroom.showroomDetails?.carName} Photo`}
                    />
                    <p id="showroomNameSuggestedContainer">
                      {showroom.showroomDetails?.carName}
                    </p>
                    <p id="showroomLocationSuggestedContainer">
                      {showroom.showroomDetails?.location}
                    </p>
                    <p id="showroomtotalCarsCount">Total models</p>
                    <p id="showroomTotalCC">{showroom.count}</p>
                    <p
                      id="showroomSuggestedContainerViewP"
                      onClick={() => handleSelectedAshowRoom(showroom)}
                    >
                      View
                      <span id="uparrowBtnSC">
                        <FontAwesomeIcon icon={faArrowUpFromBracket} />
                      </span>
                    </p>
                  </div>
                  {index === 2 && (
                    <div id="viewAllShowroomsContainer">
                      <p
                        id="viewAllShowroomsText"
                        onClick={handleShowViewSuggestedCarsModal}
                      >
                        View All Showrooms
                      </p>
                    </div>
                  )}
                </>
              ))
            )}
          </div>
        </div>
        <img
          id="CustomerHomePageLogoImage"
          src={`${process.env.REACT_APP_API_URL}/public/images/RSimg.jpg`}
          alt="Roustuf Image"
          onClick={handleShowUserProfileModal}
        />
        <div id="customerHomePageFirstLine"></div>
        <div id="customerHomePageSecondLine"></div>
        <div id="customerHomePageThirdLine"></div>
        <div id="customerHomePageFourthLine"></div>
        <div id="customerHomePageFifthLine"></div>
        <div id="customerHomePageSixthLine"></div>
        <div id="customerHomePageSeventhLine"></div>
        <div id="customerHomePageEightLine"></div>
        <p id="viewProfileText">View Profile</p>
        <div
          id="viewSuggestedCarsModalBackground"
          style={{
            display: viewAllSuggestedCarsModal ? "block" : "none",
          }}
        >
          <p id="viewSuggestedCarsMBtext">More suggestions</p>
          <p id="viewSuggestedCarsMBSL"></p>
          <div id="moreSuggestedCarsContainer">
            {Array.isArray(fetchedShowrooms) &&
              fetchedShowrooms.map((showroom, index) => (
                <div id="moreSuggestedCarsBGcontainer" key={index}>
                  <img
                    id="moresuggestedCarsImagesBG"
                    src={`${process.env.REACT_APP_API_URL}${showroom.showroomDetails?.coverPFP}`}
                    alt={`${showroom.showroomDetails?.carName} Photo`}
                  />
                  <p id="moreSuggestedCarsNameBG">
                    {showroom.showroomDetails?.carName}
                  </p>
                  <p id="moreSuggestedCarsLocationBG">
                    {showroom.showroomDetails?.location}
                  </p>
                  <p id="moreSuggestedCarsCountBG">Total models</p>
                  <p id="moreSuggestedCarsCCBG">{showroom.count}</p>
                  <p
                    id="moreSuggestedCarsMoreP"
                    onClick={() => handleSelectedAshowRoom(showroom)}
                  >
                    More
                    <span id="uparrowBtnSC">
                      <FontAwesomeIcon icon={faArrowUpFromBracket} />
                    </span>
                  </p>
                </div>
              ))}
          </div>
          <p
            id="viewSuggestedCarsMBclose"
            onClick={handleHideViewSuggestedCarsModal}
          >
            Close
          </p>
        </div>
        <div
          id="moreSearchedShowroomsContainer"
          style={{
            display: moreSearchedShowroomsContainer ? "block" : "none",
          }}
        >
          <p id="moreSearchedShowroomsContainerFirstHead">
            More results for {enteredTerm}
          </p>
          <div id="moreSearchedShowroomsMainContainer">
            {searchedShowrooms.map((showroom, index) => (
              <div id="moreSearchedShowroomBG" key={index}>
                <img
                  id="moreSearchedShowroomImagesOfST"
                  src={`${process.env.REACT_APP_API_URL}${showroom.showroomDetails?.coverPFP}`}
                  alt={`${showroom.showroomDetails?.carName} Photo`}
                />
                <p id="moreSearchedShowroomTextOfST">
                  {showroom.showroomDetails?.carName}
                </p>
                <p id="moreSearchedShowroomLocationOfST">
                  {showroom.showroomDetails?.location}
                </p>
                <p id="moreSearchedShowroomsTotalModelCount">
                  {showroom.modelCount} Models available
                </p>
                <p
                  id="moreSearchedShowroomsViewP"
                  onClick={() => handleSelectedAshowRoom(showroom)}
                >
                  View
                  <span id="uparrowBtnSC">
                    <FontAwesomeIcon icon={faArrowUpFromBracket} />
                  </span>
                </p>
              </div>
            ))}
          </div>
          <div id="moreSearchedShowroomsSL"></div>
          <p
            id="moreSearchedShowroomCloseP"
            onClick={handleHideMoreSearchedShowrooms}
          >
            Close
          </p>
        </div>
        <div
          id="customerUserProfileContainer"
          style={{
            display: showUserProfileModal ? "block" : "none",
          }}
        >
          <p id="customerUserProfileMainText">The details of your profile</p>
          <div id="customerUPSL"></div>
          <div id="customerUPProfilePicContainer">
            <img
              id="customerUPProfilePic"
              src={`${process.env.REACT_APP_API_URL}${user.profilePic}`}
            />
            <div id="customerUPsecondContainer">
              <p id="customerUPSCMoreOptionsText">More Options</p>
              <div id="customerUPSCSL"></div>
              <button
                id="customerUPeditButton"
                onClick={handleShowEditControlsForUser}
              >
                Edit Button
              </button>
            </div>
          </div>
          <p id="customerUPName">
            {user.firstName} {user.lastName}
          </p>
          <p id="customerUPEmail">{user.email}</p>
          <p id="customerUPcloseP" onClick={handleHideUserProfileModal}>
            Close
          </p>
        </div>
      </div>
      <div
        id="editUserProfileDetailsContainer"
        style={{
          display: editUserProfileModal ? "block" : "none",
        }}
      >
        <p id="editUserProfileContainerMainText">
          Fill the details you want to change
        </p>
        <div id="editUserProfileSL"></div>
        <p id="editUserProfileFirstName">Enter First Name</p>
        <form
          id="editCustomerProfileForm"
          onSubmit={handleProfileDetailsChange}
        >
          <input
            type="text"
            id="editCustomerProfileFirstName"
            name="firstName"
            value={editDetails.firstName}
            onChange={handleInputChange}
          />
          <p id="editUserProfileLastName">Enter Last Name</p>
          <input
            type="text"
            id="editCustomerProfileLastName"
            name="lastName"
            value={editDetails.lastName}
            onChange={handleInputChange}
          />
          <p id="editUserProfilePassword">Enter Password</p>
          <input
            type="password"
            id="editCustomerProfilePassword"
            name="password"
            value={editDetails.password}
            onChange={handleInputChange}
          />
          <div class="upload-button-wrapperOFCEP">
            <label class="upload-buttonOFCEP">
              Change ProfilePic
              <input
                type="file"
                class="upload-inputOFCEP"
                accept="image/*"
                onChange={handleChangeInUserPFP}
              />
            </label>
          </div>
          <div id="editCustomerProfileCSL"></div>
          <p id="editCustomerProfilePassHead">Enter password to continue</p>
          <input
            type="password"
            id="editCustomerProfilePassToContinue"
            name="confirmPassword"
            value={editDetails.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <button id="changeDetailsOFuser" type="submit">
            Change Details
          </button>
        </form>
        <p id="editUserProfileclosePTag" onClick={handleClsEditControlsForUser}>
          Close
        </p>
      </div>
      <div
        id="customerNotificationsContainer"
        style={{
          display: showNotificationsModal ? "block" : "none",
        }}
      >
        <p id="customerNotificationsHead">Your Notifications</p>
        <div id="customerNotificationsSL"></div>
        <div id="customerAllNotificationsContainer"></div>
        <p
          id="customerAllNotificationsCloseHead"
          onClick={handleCloseNotificationsForUser}
        >
          Close
        </p>
      </div>
      <div
        id="customerShowCarInfoUIContainer"
        style={{
          display: !customerHomeUI ? "block" : "none",
        }}
      >
        <div id="showroomUserDetailsContainer">
          <img
            id="showroomUDimage"
            src={`${process.env.REACT_APP_API_URL}${selectedSRdata.showroomDetails?.coverPFP}`}
          />
          <p id="showroomUDshowroomCarNameP">
            {selectedSRdata.showroomDetails?.carName}
          </p>
          <p id="showroomUDshowroomCarLocationP">
            {selectedSRdata.showroomDetails?.location}
          </p>
          <img
            id="showroomOwnerPFP"
            src={`${process.env.REACT_APP_API_URL}${selectedSRdata.profilePic}`}
          />
          <p id="showroomOwnerFullname">
            {selectedSRdata.firstName}
            <span id="lastnameOwnerSpan">{selectedSRdata.lastName}</span>
          </p>
          <p id="showroomTotalCarCount">{selectedSRdata.count} car models</p>
        </div>
        <div id="showroomCarMainDataContainer">
          {selectedSRcars.length === 0 ? (
            <p id="noCarsInShowroomText">No Cars Available!!</p>
          ) : (
            <>
              <p id="showroomCarHead">Cars in this showroom</p>
              <div id="showroomcarSL"></div>
              {selectedSRcars.map((car, index) => (
                <div
                  key={index}
                  id="showroomCarBackground"
                  onClick={() => handleViewSelectedCar(car)}
                >
                  <img
                    id="showroomCarPFP"
                    src={`${process.env.REACT_APP_API_URL}${car.carImages[0]}`}
                    alt="Car image"
                  />
                  <p id="showroomCarModelName">{car.modelName}</p>
                  <p id="showroomCarPrice">₹ {car.price}/-</p>
                  <p id="showroomCarBGTextt">Press here to view details</p>
                </div>
              ))}
            </>
          )}
        </div>
        <div id="showroomCarPageSL"></div>
        <div
          id="noCarSelectedContainer"
          style={{
            display: !selectedCar ? "block" : "none",
          }}
        >
          <img
            id="defaultNoCarSelectedImage"
            src={`${process.env.REACT_APP_API_URL}/public/images/CustomerPageBG.webp`}
          />
        </div>
        <div
          id="carSelectedToDisplayContainer"
          style={{
            display: selectedCar ? "block" : "none",
          }}
        >
          <p id="carSTDfirstHead">Car Images</p>
          <div id="carsImagesContainer">
            {Array.isArray(VCdata.carImages) && VCdata.carImages.length > 0 ? (
              VCdata.carImages.map((imagePath, index) => (
                <img
                  key={index}
                  id="selectedCarAllImages"
                  src={`${process.env.REACT_APP_API_URL}${imagePath}`}
                  alt={`Car Image ${index + 1}`}
                  onClick={() => handleDisplayVCcarImage(imagePath)}
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
          <div id="selectedcarPageSLahead"></div>
          <div id="selectedcarMainDetailsContainer">
            <p id="selectedcarModelnameDetail">Model Name</p>
            <p id="selectedCarModelName">{VCdata.modelName}</p>
            <p id="selectedCarModelPriceDetail">Model Price</p>
            <p id="selectedCarModelPrice">₹ {VCdata.price} /-</p>
            <p id="selectedCarModelMileageandEngineDetail">
              Mileage, Transmissions and Seats
            </p>
            <p id="selectedCarModelMileageAndEngine">
              {VCdata.mileage} kmpl, {VCdata.transmissionType} transmissions,{" "}
              {VCdata.seatingCapacity} seats
            </p>
            <p id="selectedCarModelColorAndEngineDetail">
              Color and Engine Type
            </p>
            <p id="selectedCarModelColorandEngine">
              Available in {VCdata.color} color and have {VCdata.engineType}{" "}
              engine
            </p>
            <p id="selectedCarModelEmiHead">EMI/Month</p>
            <p id="selectedCarModelEmi">₹ {VCdata.emiPerMonth} /-</p>
            <p id="selectedCarModelMoreDetailsHead">
              More details about model{" "}
            </p>
            <div id="selectedCarModelDescription">
              <p id="selectedcarDescriptionText">{VCdata.description}</p>
            </div>
          </div>
          <div id="selectedCarModelBookingContainer">
            <p id="selectedCarModelBookingFirstHead">
              Book an Appointment and contact owner
            </p>
            <div id="selectedCarModelBookinContainerSL"></div>
            <p id="selectedCarModelBookinSecondHead">
              Enter booking context in below box with timing and date{" "}
            </p>
            <form id="sendBookingForm">
              <textarea
                id="selectedCarModelBookinContainer"
                value={appointmentContent}
                onChange={(e) => setAppointmentContent(e.target.value)}
                required
              ></textarea>
              <p id="selectedCarModelBookinThirdHead">
                Note - We will send your email and name to owner automatically
              </p>
              <p
                id="selectedCarModelBookinImpHead"
                onClick={handleSendAnAppointmentToOwner}
              >
                Send The Appointment
              </p>
            </form>
            <p id="selectedCarModelSecondLastHead">
              More option to contact owner{" "}
            </p>
            <div id="selectedCarModelSecondSL"></div>
            <p id="selectedCarModelEmailHead">
              You can send an email to{" "}
              <span id="emailSelectedOwner" onClick={handleSendEmailToOwner}>
                {selectedSRdata.email}
              </span>
            </p>
            <p id="selectedCarModelLastHead">
              Press on user email and we will redirect you to your email
            </p>
          </div>
        </div>
        <div
          id="showSelectedCarImageContainer"
          style={{
            display: VCcarShowImage ? "block" : "none",
          }}
        >
          <img
            id="showSelectedCarImage"
            src={`${process.env.REACT_APP_API_URL}${VCcarImage}`}
          />
          <p id="showSelectedCarImageFirstHead" onClick={handleHideVCcarImage}>
            Press here to close
          </p>
        </div>
      </div>
      <div
        id="moreButtonsdivCustomerHome"
        style={{
          display: showBookingMoreButtons ? "block" : "none",
        }}
      >
        <div id="moreButtonsCustomerHomeContainer">
          <button
            id="pendingBookingsCustomerbtn"
            onClick={showCustomerPendingBookingContainer}
          >
            Pending
          </button>
          <button
            id="AcceptedBookingsCustomerbtn"
            onClick={handleShowBookingsAcceptedFromUser}
          >
            Accepted
          </button>
          <button
            id="rejectedBookingsCustomerbtn"
            onClick={handleFetchCustomerRejectedBookings}
          >
            Rejected
          </button>
        </div>
      </div>
      <div
        id="pendingBookingsModal"
        style={{
          display: showCustomerPendingBookings ? "block" : "none",
        }}
      >
        <div id="modalBackground">
          <div id="pendingBookingsModalBG">
            <p id="pendingBookingsModalFirstHead">
              Showing bookings by you that are still pending
              <span
                id="closeBtnhead"
                onClick={handleCloseCustomerPendingBookings}
              >
                Close
              </span>
            </p>
            <div id="pendingBookingsModalSL"></div>
            <div id="pendingBookingsModalMainContainer">
              {customerPendingBookings.length === 0 ? (
                <p id="noPendingBookingsForCustmer">
                  No booking founded that are still in pending state.
                </p>
              ) : (
                customerPendingBookings.map((booking, index) => (
                  <div key={index} id="pendingBookingBackground">
                    <div id="pendingBookingImageContainer">
                      <img
                        id="pendingBookingsImage"
                        src={`${process.env.REACT_APP_API_URL}${booking.carPFP?.[0]}`}
                      />
                    </div>
                    <p id="pendingBookingsCarName">{booking.carName}</p>
                    <p id="pendingBookingsCarPrice">
                      <span id="pendingCarSpanPrice">
                        ₹ {booking.carPrice} /-{" "}
                      </span>{" "}
                      and{" "}
                      <span id="pendingCarCarCountSpan">
                        {booking.carCount}
                      </span>{" "}
                      left in showroom!!
                    </p>
                    <div id="pendingBookingContainerTextContainer">
                      <p id="pendingBookingTextP">{booking.bookingText}</p>
                    </div>
                    <p id="pendingBookingDateText">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </p>
                    <p id="emailOfOwnerPB">
                      You can email owner on{" "}
                      <span id="ownerEmailSpanPB">{booking.ownerEmail}</span>
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        id="customerAcceptedBookingsContainer"
        style={{
          display: showCustomerAcceptedBookings ? "block" : "none",
        }}
      >
        <div id="modalBackground">
          <div id="customerAcceptedBookingsModalBG">
            <p id="customerAcceptedBookingsFirstHead">
              Showing bookings by you that were accepted
              <span
                id="customerAcceptedBookingsCloseSpan"
                onClick={handleCloseCustomerAcceptedBookingModal}
              >
                Close
              </span>
            </p>
            <div id="customerAcceptedBookingsContainerSL"></div>
            <div id="customerAcceptedBookingsMainContainer">
              {customerAcceptedBookings.length === 0 ? (
                <p id="customerAcceptedBookingNoData">
                  No accepted booking found that is related to you.
                </p>
              ) : (
                customerAcceptedBookings.map((booking) => (
                  <div id="acceptedBookingContainerBG" key={booking._id}>
                    <div id="carImageContainerAcceptedBookings">
                      <img
                        id="carImageacceptedBookingContainer"
                        src={`${process.env.REACT_APP_API_URL}${booking.carPFP?.[0]}`}
                      />
                    </div>
                    <p id="carImageAcceptedCarName">{booking.carName}</p>
                    <p id="carDateTextP">
                      You sent this booking on{" "}
                      <span id="carBookingSentDate">
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </span>{" "}
                      and got response on{" "}
                      <span id="carBookingReceiveDate">
                        {new Date(
                          booking.ownerReplyToBookingDate
                        ).toLocaleDateString()}
                      </span>
                    </p>
                    <img
                      id="carOwnerPFPacceptedBooking"
                      src={`${process.env.REACT_APP_API_URL}${booking.ownerPFP}`}
                    />
                    <p id="carBookingOwnerAnswerP">
                      <span id="bookingOwnerNameSpan">{booking.ownerName}</span>{" "}
                      answered to your question
                    </p>
                    <div id="carBookingOwnerAnswerTextContainer">
                      <p id="carBookingTextP">{booking.ownerReplyToBooking}</p>
                    </div>
                    <p
                      id="carBookingAcceptedMyQuestionP"
                      onClick={() => window.alert(booking.bookingText)}
                    >
                      <u>View Question</u>
                    </p>
                    <p id="carBookingAcceptedMoreLineP">
                      You can't send another booking for same car now but you
                      can contact user with their email
                    </p>
                    <p id="carBookingAcceptedEmailP">
                      Owner Email :{" "}
                      <span id="carBookingEmailSpan">{booking.ownerEmail}</span>
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        id="customerRejectBookingsModal"
        style={{
          display: showCustomerRejectBookings ? "block" : "none",
        }}
      >
        <div id="modalBackground">
          <div id="customerRejectModalBG">
            <p id="customerRejectModalFirstHead">
              Showing booking by you that were rejected{" "}
              <span
                id="customerRejectModalFirstSpan"
                onClick={handleHideCustomerRejectBooking}
              >
                Close
              </span>
            </p>
            <div id="customerRejectModalSL">
              <div id="customerRejectModalMainContainer">
                {customerRejectedBookings.length === 0 ? (
                  <p id="customerRejectedBookingsP">
                    No booking related to you has been rejected.
                  </p>
                ) : (
                  customerRejectedBookings.map((booking, index) => (
                    <div key={index} id="customerRejectBookingDataBG">
                      <div id="customerRejectBookingCarContainer">
                        <img
                          id="customerRejectBookingCarImage"
                          src={`${process.env.REACT_APP_API_URL}${booking.carPFP?.[0]}`}
                        />
                      </div>
                      <p id="customerRejectBookingCarName">{booking.carName}</p>
                      <p id="customerRejectBookingCarDateP">
                        You sent this booking on{" "}
                        <span id="bookingDateRejectedOne">
                          {new Date(booking.bookingDate).toLocaleDateString()}
                        </span>{" "}
                        and got rejected on{" "}
                        <span id="rejectedDateBookingOne">
                          {new Date(booking.updatedAt).toLocaleDateString()}
                        </span>
                      </p>
                      <img
                        id="rejectedContainerBookingOwnerPFP"
                        src={`${process.env.REACT_APP_API_URL}${booking.ownerPFP}`}
                      />
                      <p id="rejectContainerOwnerAnswerP">
                        <span id="bookingRejectedOwnerName"></span>
                        {booking.ownerName} responded as rejection
                      </p>
                      <div id="rejectContainerOwnerText">
                        <p id="rejectedContainerPtext">{booking.whyRejected}</p>
                      </div>
                      <p
                        id="rejectContainerAnswerP"
                        onClick={() => window.alert(booking.bookingText)}
                      >
                        <u>View Question</u>
                      </p>
                      <p id="rejectContainerMoreTextP">
                        You can't send another booking for same car now but you
                        can contact user with their email
                      </p>
                      <p id="rejectContainerMoreTextSecondP">
                        Owner Email :{" "}
                        <span id="bookingContainerEmailOwner">
                          {booking.ownerEmail}
                        </span>
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomerHomeFooter
        showroomHistory={showroomHistory}
        user={user}
        setShowroomHistory={setShowroomHistory}
      />
    </>
  );
};

export default CustomerHome;
