import React, { useEffect, useState } from "react";
import OwnerNavbar from "../others/others/navbars/OwnerHomeNav";
import "../others/css/OwnerHome.css";
import OwnerHomeFooter from "../others/others/footers/OwnerHomeFooter";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faPenToSquare,
  faAnglesLeft,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const OwnerHome = () => {
  const [homeUI, setHomeUI] = useState(true);
  const [manageCarsModal, setManageCarsModal] = useState(false);
  const [showCAdetails, setShowCAdetails] = useState(false);
  const [user, setUser] = useState({});
  const [carsInfo, setCarsInfo] = useState({
    modelName: "",
    engineType: "",
    modelPrice: "",
    modelColor: "",
    sittingCapacity: "",
    modelMileage: "",
    transmissionType: "",
    modelDescription: "",
    emiRate: "",
    carsCount: "",
  });
  const [carImages, setCarImages] = useState([]);
  const [fetchedCars, setFetchedCars] = useState([]);
  const [selectedCarInfo, setSelectedCarInfo] = useState({});
  const [selectedCarDetailsModal, setSelectedCarDetailsModal] = useState(true);
  const [displaySelectedCarImage, setDisplaySelectedCarImage] = useState(null);
  const [editCarDetailsModal, setEditCarDetailsModal] = useState(false);
  const [displayEditUserProfileModal, setDisplayEditUserProfileModal] =
    useState(false);

  const [userData, setUserData] = useState({
    userPassword: "",
    userFirstName: "",
    userLastName: "",
    userLocation: "",
    userConfirmPassword: "",
  });
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [newShowroomCoverPic, setShowroomCoverPic] = useState(null);
  const [changeCarDetailsData, setChangeCarDetailsData] = useState({
    newCarPrice: "",
    newCarCount: "",
    newCarDescription: "",
  });
  const [newCarImages, setNewCarImages] = useState([]);
  const [middleContainerDefaultPhase, setMiddleContainerDefaultPhase] =
    useState(true);
  const [pendingBookingsOwner, setPendingBookingsOwner] = useState([]);
  const [showSelectedPendingBooking, setShowSelectedPendingBooking] =
    useState(false);
  const [storeUserInfoPB, setStoreUserInfoPB] = useState({});
  const [PBcardata, setPBcarData] = useState({});
  const [respondPendingUserModal, setRespondPendingUserModal] = useState(false);
  const [pendingBookinUserData, setPendingBookinUserData] = useState({});
  const [ownerRespond, setOwnerRespond] = useState("");
  const [frontUIrejectBooking, setFrontUIrejectBooking] = useState({});
  const [frontUIrejectedModel, setFrontUIrejectedModel] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [completedOwnerBookings, setCompletedOwnerBookings] = useState([]);
  const [ownerShowMoreCBdetailsModal, setOwnerShowMoreCBdetailsModal] =
    useState(false);
  const [ownerSelectedBooking, setOwnerSelectedBooking] = useState({});
  const [fetchedCarPendingBookings, setFetchedCarPendingBookings] = useState(
    []
  );
  const [respondToUserModal, setRespondToUserModal] = useState(false);
  const [rejectBookingUserModal, setRejectBookingModal] = useState(false);
  const [responduserData, setRespondUserData] = useState({});
  const [rejectUserBookingData, setRejectUserBookingData] = useState({});
  const [responseText, setResponseText] = useState("");
  const [rejectText, setRejectText] = useState("");
  const [bookedDataForOtherCars, setBookedDataForOtherCars] = useState([]);
  const [acceptBookingForOtherCarModal, setAcceptBookingForOtherCarModal] =
    useState(false);
  const [selectedOtherBookedCar, setSelectedOtherBookedCar] = useState({});
  const [responseTextToOtherBooking, setResponseTextToOtherBooking] =
    useState("");
  const [rejectBookingForOtherCarModal, setRejectBookingForOtherCarModal] =
    useState(false);
  const [selectedRejectedData, setSelectedRejectedData] = useState({});
  const [rejectTextToOtherBooking, setRejectTextToOtherBooking] = useState("");

  const navigate = useNavigate();

  const fetchCrenditals = () => {
    const user = JSON.parse(localStorage.getItem("userdata"));
    if (user) setUser(user);
  };

  useEffect(() => {
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

  const fetchSelectedCarInfo = () => {
    const selectedCar = JSON.parse(localStorage.getItem("selectedCar"));
    if (selectedCar) setSelectedCarInfo(selectedCar);
  };

  useEffect(() => {
    fetchSelectedCarInfo();
  }, []);

  useEffect(() => {
    fetchCarsInHistory();
  }, [user?._id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarsInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChangeInUserData = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeInCarData = (e) => {
    const { name, value } = e.target;
    setChangeCarDetailsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeInCarImages = (e) => {
    const files = Array.from(e.target.files);
    setNewCarImages(files);
  };

  const handleChangeInUserPFP = (e) => {
    const file = e.target.files[0];
    setNewProfilePic(file);
  };

  const handleChangeInShowroomCover = (e) => {
    const file = e.target.files[0];
    setShowroomCoverPic(file);
  };

  const handleChangeInImages = (e) => {
    const files = Array.from(e.target.files);
    setCarImages(files);
  };

  const handleMCmodal = () => {
    setManageCarsModal(true);
  };

  const handleShowCAdetails = () => {
    setShowCAdetails(true);
    setManageCarsModal(false);
  };

  const handleHideCAdetails = () => {
    setShowCAdetails(false);
    setManageCarsModal(true);
  };

  const handleCloseCAmodal = () => {
    setShowCAdetails(false);
    window.location.reload();
  };

  const handleSaveCarDetails = async (event) => {
    event.preventDefault();

    if (carImages.length === 0) {
      window.alert("Please select at least one image");
      return;
    }

    const formData = new FormData();
    formData.append("modelName", carsInfo.modelName);
    formData.append("engineType", carsInfo.engineType);
    formData.append("carPrice", carsInfo.modelPrice);
    formData.append("carColor", carsInfo.modelColor);
    formData.append("seatingCapacity", carsInfo.sittingCapacity);
    formData.append("carMileage", carsInfo.modelMileage);
    formData.append("carTransmission", carsInfo.transmissionType);
    formData.append("carDescription", carsInfo.modelDescription);
    formData.append("emiCount", carsInfo.emiRate);
    formData.append("carsCount", carsInfo.carsCount);
    formData.append("id", user._id);

    carImages.forEach((image) => {
      formData.append("carImages", image);
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/addNewCar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 201) {
        window.alert(response.data.message);
        setShowCAdetails(true);
        setManageCarsModal(false);
        fetchCarsInHistory();
        setCarsInfo({
          modelName: "",
          engineType: "",
          modelPrice: "",
          modelColor: "",
          sittingCapacity: "",
          modelMileage: "",
          transmissionType: "",
          modelDescription: "",
          emiRate: "",
          carsCount: "",
        });
        setCarImages([]);
      }
    } catch (error) {
      console.error("Error adding new car:", error);
      window.alert(error.response.data.message);
    }
  };

  const handleShowSelectedCarImages = (image) => {
    setSelectedCarDetailsModal(false);
    setDisplaySelectedCarImage(image);
  };

  const handleShowDetailsOfCarAgain = () => {
    setSelectedCarDetailsModal(true);
    setDisplaySelectedCarImage(false);
  };

  const handleShowCarDetailsControls = () => {
    setEditCarDetailsModal(true);
  };

  const handleShowUserProfileModal = () => {
    setDisplayEditUserProfileModal(true);
  };

  const handleHideUserProfileModal = () => {
    setDisplayEditUserProfileModal(false);
    setUserData({
      userFirstName: "",
      userLastName: "",
      userPassword: "",
      userConfirmPassword: "",
      userLocation: "",
    });
    setNewProfilePic(null);
    setShowroomCoverPic(null);
  };

  const handleShowHomePage = () => {
    setHomeUI(true);
    setDisplayEditUserProfileModal(false);
    setShowSelectedPendingBooking(false);
  };

  const handleLogoutOfUser = () => {
    const logoutAlert = window.confirm("Are you sure you want to logout ?");
    if (logoutAlert) {
      localStorage.removeItem("token");
      localStorage.removeItem("userdata");
      navigate("/");
    }
  };

  const handleChangeUserDetails = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (userData.userFirstName)
      formData.append("firstName", userData.userFirstName);
    if (userData.userLastName)
      formData.append("lastName", userData.userLastName);
    if (userData.userPassword)
      formData.append("password", userData.userPassword);
    if (userData.userLocation)
      formData.append("newLocation", userData.userLocation);
    if (userData.userConfirmPassword)
      formData.append("confirmPassword", userData.userConfirmPassword);
    if (newProfilePic) formData.append("newProfilePic", newProfilePic);
    if (newShowroomCoverPic)
      formData.append("newShowroomCover", newShowroomCoverPic);
    formData.append("id", user?._id);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/changeUserProfileDetails`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        window.alert(response.data.message);
        localStorage.setItem("userdata", JSON.stringify(response.data.user));
        setDisplayEditUserProfileModal(false);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      window.alert(err.response.data.message);
    }
  };

  const handleChangeInCarDetails = async (event) => {
    event.preventDefault();

    if (
      !changeCarDetailsData.newCarPrice &&
      !changeCarDetailsData.newCarCount &&
      !changeCarDetailsData.newCarDescription &&
      newCarImages.length === 0
    ) {
      window.alert("You have to change something in car details.");
      return;
    }

    const formData = new FormData();
    if (changeCarDetailsData.newCarPrice)
      formData.append("carPrice", changeCarDetailsData.newCarPrice);
    if (changeCarDetailsData.newCarCount)
      formData.append("carCount", changeCarDetailsData.newCarCount);
    if (changeCarDetailsData.newCarDescription)
      formData.append("carDescription", changeCarDetailsData.newCarDescription);
    formData.append("carId", selectedCarInfo?._id);

    if (newCarImages)
      newCarImages.forEach((image) => {
        formData.append("carImages", image);
      });

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/changeCarDetails`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        window.alert(response.data.message);
        setEditCarDetailsModal(false);
        localStorage.setItem("selectedCar", JSON.stringify(response.data.car));
        window.location.reload();
      }
    } catch (error) {
      console.error("Error changing car details:", error);
      window.alert(error.response.data.message);
    }
  };

  const handleCloseCarDetailsModal = () => {
    setEditCarDetailsModal(false);
    setChangeCarDetailsData({
      newCarPrice: "",
      newCarCount: "",
      newCarDescription: "",
    });
    setNewCarImages([]);
  };

  const handleDeleteCarFromShowroom = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to remove this car with all it's data from showroom?"
    );
    if (!confirmation) return;
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/deleteCar/${selectedCarInfo._id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        window.alert(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting car:", error);
      window.alert(error.response.data.message);
    }
  };

  const handleShowUserProfileInContainer = () => {
    setMiddleContainerDefaultPhase(false);
    fetchCrenditals();
  };

  const handleHideUserProfileInContainer = () => {
    setMiddleContainerDefaultPhase(true);
  };

  const handleAllFetchPendingBookings = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/owner/fetchAllPendingAppointmentsForOwner?ownerId=${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setPendingBookingsOwner(response.data.bookings);
      }
    } catch (error) {
      console.error(
        "Error fetching pending bookings for owner due to :",
        error
      );
    }
  };  

  useEffect(() => {
    handleAllFetchPendingBookings();
  }, [user]);

  const handleShowSPcontainer = (booking) => {
    setShowSelectedPendingBooking(true);
    setStoreUserInfoPB(booking);
  };

  useEffect(() => {
    handleFetchSPBcarDetails();
  }, [storeUserInfoPB]);

  useEffect(() => {
    handleFetchPBuserData();
  }, [PBcardata, storeUserInfoPB]);

  const handleFetchSPBcarDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/owner/fetchPBcardetails?carId=${storeUserInfoPB?.carId}`
      );
      if (response.status === 200) {
        setPBcarData(response.data.car);
      }
    } catch (error) {
      console.error("Failed to get data for PB car due to : ", error);
    }
  };

  const handleFetchPBuserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/owner/fetchPBuserdetails?id=${storeUserInfoPB?.customerId}`
      );
      if (response.status === 200) {
        setPendingBookinUserData(response.data.user);
      }
    } catch (error) {
      console.error("Failed to get data for PB user due to : ", error);
    }
  };

  const handleClosePBuserContainer = () => {
    setShowSelectedPendingBooking(false);
    setStoreUserInfoPB({});
    setPBcarData({});
    setRespondPendingUserModal(false);
    setPendingBookinUserData({});
  };

  const handleShowSelectedPendinBookinContainer = () => {
    setRespondPendingUserModal(true);
  };

  const handleClosePendingBookingResponseContainer = () => {
    setRespondPendingUserModal(false);
    setPendingBookinUserData({});
  };

  const handleSendEmailToPendingUser = () => {
    const reciepentEmail = pendingBookinUserData.email;
    const userFullName = user?.firstName + " " + user?.lastName;
    const subject = "Email regarding your booking in our showroom";
    const body = `We have received your booking in our showroom and we will like to talk with you in person, could you please reach out to us in the next 24 hours. Thank you, regards ${userFullName}`;
    window.open(`mailto:${reciepentEmail}?subject=${subject}&body=${body}`);
  };

  const handleSendRespondToCustomer = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/owner/acceptCustomerPB?bookingId=${storeUserInfoPB._id}&carId=${storeUserInfoPB.carId}`,
        {
          ownerReplyToCustomer: ownerRespond,
        }
      );

      if (!ownerRespond) {
        return window.alert("Please add some content to your response.");
      }

      if (response.status === 200) {
        window.alert(response.data.message);
        setShowSelectedPendingBooking(false);
        setStoreUserInfoPB({});
        setPBcarData({});
        setRespondPendingUserModal(false);
        setPendingBookinUserData({});
        setPendingBookingsOwner((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== storeUserInfoPB._id)
        );
      } else {
        window.alert("Something went wrong while responding to customer.");
      }
    } catch (error) {
      console.error("Failed to respond to customer due to : ", error);
      if (error.response?.data?.errors) {
        window.alert(error.response.data.errors.join("\n"));
      } else if (error.response?.data?.message) {
        window.alert(error.response.data.message);
      } else {
        window.alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleShowFRBUI = (booking) => {
    setFrontUIrejectBooking(booking);
    setFrontUIrejectedModel(true);
  };

  const handleCloseFRUI = () => {
    setFrontUIrejectBooking({});
    setFrontUIrejectedModel(false);
    setRejectionReason("");
  };

  const handleRejectBookingThroughFrontUI = async () => {
    try {
      const confirmation = window.confirm(
        "Do you want to reject this booking ?"
      );
      if (!confirmation) return;
  
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/owner/rejectCustomerPB?bookingId=${frontUIrejectBooking._id}`,
        {
          reasonforRejection: rejectionReason,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (response.status === 200) {
        window.alert(response.data.message);
        setPendingBookingsOwner((prevBookings) =>
          prevBookings.filter(
            (booking) => booking._id !== frontUIrejectBooking._id
          )
        );
        setFrontUIrejectedModel(false);
        setFrontUIrejectBooking({});
        setShowSelectedPendingBooking(false);
        setStoreUserInfoPB({});
      } else {
        window.alert("Something went wrong while rejecting customer.");
      }
    } catch (error) {
      console.error("Failed to reject booking due to : ", error);
      if (error.response?.data?.errors) {
        window.alert(error.response.data.errors.join("\n"));
      } else if (error.response?.data?.message) {
        window.alert(error.response.data.message);
      } else {
        window.alert("An unexpected error occurred. Please try again.");
      }
    }
  };  

  const handleRejectBookingFromInside = (storeUserInfoPB) => {
    setFrontUIrejectBooking(storeUserInfoPB);
    setFrontUIrejectedModel(true);
  };

  useEffect(() => {
    handleFetchCompletedBookingsForOwner();
  }, [user]);

  const handleFetchCompletedBookingsForOwner = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/owner/fetchCompletedBookingsForOwner?ownerId=${user?._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setCompletedOwnerBookings(response.data.bookings);
      }
    } catch (error) {
      console.error(
        "Failed to fetch completed bookings for owner due to : ",
        error
      );
    }
  };  

  const handleShowCBmodalForOwner = (booking) => {
    setOwnerShowMoreCBdetailsModal(true);
    setOwnerSelectedBooking(booking);
  };

  const handleCloseCBmodalForOwner = () => {
    setOwnerShowMoreCBdetailsModal(false);
    setOwnerSelectedBooking({});
  };

  useEffect(() => {
    if (selectedCarInfo && selectedCarInfo._id) {
      handleFetchedPendingBookingsForaCar();
    }
  }, [selectedCarInfo]);

  const handleFetchedPendingBookingsForaCar = async () => {
    if (!selectedCarInfo || !selectedCarInfo._id) {
      console.error("Car information is not available yet.");
      return;
    }
  
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/owner/fetchPendingcarBookings?carId=${selectedCarInfo._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setFetchedCarPendingBookings(response.data.bookings);
      }
    } catch (error) {
      console.error(
        "Failed to fetch pending bookings for selected car due to : ",
        error
      );
    }
  };  

  const handleContactWithEmail = (pendingBooking) => {
    const email = pendingBooking.customerEmail;
    const subject = "Response regarding your booking in our showroom";
    const body = `Hello, ${pendingBooking.customerName} \n\n We have received your response and we will like to talk with you in person, could you please reach out to us in the next 24 hours. Thank you, regards ${user?.firstName} ${user?.lastName}`;
    const url = `mailto:${email}?subject=${subject}&body=${body}`;
    window.open(url);
  };

  const handleShowResponseTouserModal = (pendingBooking) => {
    setRespondToUserModal(true);
    setRespondUserData(pendingBooking);
  };

  const handleRejectUserBooking = (pendingBooking) => {
    setRejectBookingModal(true);
    setRejectUserBookingData(pendingBooking);
  };

  const handleCloseResponseToUserModal = () => {
    setRespondToUserModal(false);
    setRespondUserData({});
    setResponseText("");
  };

  const handleCloseRejectUserModal = () => {
    setRejectBookingModal(false);
    setRejectUserBookingData({});
    setRejectText("");
  };

  const handleSendResponseToUserSuccessfully = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/owner/acceptCustomerPB?bookingId=${responduserData._id}&carId=${responduserData.carId}`,
        { ownerReplyToCustomer: responseText }
      );

      if (!responseText) {
        return window.alert("Please add some content to your response.");
      }

      if (response.status === 200) {
        window.alert(response.data.message);
        setRespondToUserModal(false);
        setRespondUserData({});
        setResponseText("");
        setFetchedCarPendingBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== responduserData._id)
        );
      } else {
        window.alert("Something went wrong while responding to customer.");
      }
    } catch (error) {
      console.error("Failed to respond to customer due to : ", error);
      if (error.response?.data?.errors) {
        window.alert(error.response.data.errors.join("\n"));
      } else if (error.response?.data?.message) {
        window.alert(error.response.data.message);
      } else {
        window.alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleRejectBookingOfUser = async () => {
    try {
      const confirmation = window.confirm(
        "Are you sure, you want to reject booking of this customer ?"
      );
      if (!confirmation) return;
  
      if (!rejectText) {
        return window.alert("Please enter some reason for rejection.");
      }
  
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/owner/rejectCustomerPB?bookingId=${rejectUserBookingData._id}`,
        {
          reasonforRejection: rejectText,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (response.status === 200) {
        window.alert(response.data.message);
        setRejectBookingModal(false);
        setRejectUserBookingData({});
        setRejectText("");
        setFetchedCarPendingBookings((prevBookings) =>
          prevBookings.filter(
            (booking) => booking._id !== rejectUserBookingData._id
          )
        );
      } else {
        window.alert("Something went wrong while rejecting customer.");
      }
    } catch (error) {
      console.error("Failed to reject customer due to : ", error);
      if (error.response?.data?.errors) {
        window.alert(error.response.data.errors.join("\n"));
      } else if (error.response?.data?.message) {
        window.alert(error.response.data.message);
      } else {
        window.alert("An unexpected error occurred. Please try again.");
      }
    }
  };  

  const handleFetchOtherCarsBookings = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/owner/fetchPendingBookingsForOtherCars?carId=${selectedCarInfo._id}&ownerId=${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setBookedDataForOtherCars(response.data.bookings);
      }
    } catch (error) {
      console.error("Failed to fetch bookings for other cars due to : ", error);
    }
  };  

  useEffect(() => {
    handleFetchOtherCarsBookings();
  }, [selectedCarInfo]);

  const handleViewSelectedOtherBooking = (booking) => {
    setAcceptBookingForOtherCarModal(true);
    setSelectedOtherBookedCar(booking);
  };

  console.log("Selected pending booking : ", selectedOtherBookedCar);

  const handleCloseSelectedOtherBookingModal = () => {
    setAcceptBookingForOtherCarModal(false);
    setSelectedOtherBookedCar({});
    setResponseTextToOtherBooking("");
  };

  const handleShowSelectedRejectBookingContainer = (booking) => {
    setRejectBookingForOtherCarModal(true);
    setSelectedRejectedData(booking);
  };

  const handleHideRejectBookingContainer = () => {
    setRejectBookingForOtherCarModal(false);
    setSelectedRejectedData({});
    setRejectTextToOtherBooking("");
  };

  const handleRejectBookingWithEmail = () => {
    const customerEmail = selectedRejectedData.customerEmail;
    const subject = "Response regarding your booking in our showroom";
    const body =
      "We regret to inform you that your booking has been rejected. Please contact us for further details. Thank you for your interest in our showroom.";
    window.open(`mailto:${customerEmail}?subject=${subject}&body=${body}`);
  };

  const handleRespondToBookingWithEmail = () => {
    const customerEmail = selectedOtherBookedCar.customerEmail;
    const subject = "Response regarding your booking in our showroom";
    const body = `Dear ${selectedOtherBookedCar.customerName}, We are delighted to inform you that your booking has been confirmed. Please be ready to meet us at our showroom. We look forward to seeing you. Best regards, ${user.firstName} ${user.lastName}`;
    window.open(`mailto:${customerEmail}?subject=${subject}&body=${body}`);
  };

  const handleAcceptBookingForOtherCar = async () => {
    try {
      if (!responseTextToOtherBooking) {
        return window.alert("Please add some content to your response.");
      }
  
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/owner/acceptCustomerPB?bookingId=${selectedOtherBookedCar._id}&carId=${selectedOtherBookedCar.carId}`,
        {
          ownerReplyToCustomer: responseTextToOtherBooking,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (response.status === 200) {
        window.alert(response.data.message);
        setAcceptBookingForOtherCarModal(false);
        setSelectedOtherBookedCar({});
        setResponseTextToOtherBooking("");
        setBookedDataForOtherCars((prevBookings) =>
          prevBookings.filter(
            (booking) => booking._id !== selectedOtherBookedCar._id
          )
        );
      } else {
        window.alert("Something went wrong while accepting customer.");
      }
    } catch (error) {
      console.error("Failed to accept customer due to : ", error);
      if (error.response?.data?.errors) {
        window.alert(error.response.data.errors.join("\n"));
      } else if (error.response?.data?.message) {
        window.alert(error.response.data.message);
      } else {
        window.alert("An unexpected error occurred. Please try again.");
      }
    }
  };  

  const handleRejectBookingForOtherCar = async () => {
    try {
      const confirmation = window.confirm(
        "Are you sure you want to reject this booking ?"
      );
      if (!confirmation) return;
  
      if (!rejectTextToOtherBooking) {
        return window.alert("Please add some content to your response.");
      }
  
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/owner/rejectCustomerPB?bookingId=${selectedRejectedData._id}`,
        {
          reasonforRejection: rejectTextToOtherBooking,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (response.status === 200) {
        window.alert(response.data.message);
        setRejectBookingForOtherCarModal(false);
        setSelectedRejectedData({});
        setRejectTextToOtherBooking("");
        setBookedDataForOtherCars((prevBookings) =>
          prevBookings.filter(
            (booking) => booking._id !== selectedRejectedData._id
          )
        );
      } else {
        window.alert("Something went wrong while rejecting customer.");
      }
    } catch (error) {
      console.error("Failed to reject customer due to : ", error);
      if (error.response?.data?.errors) {
        window.alert(error.response.data.errors.join("\n"));
      } else if (error.response?.data?.message) {
        window.alert(error.response.data.message);
      } else {
        window.alert("An unexpected error occurred. Please try again.");
      }
    }
  };  

  return (
    <>
      <OwnerNavbar
        onModalBtnPress={handleMCmodal}
        displayEditUserProfileModal={displayEditUserProfileModal}
        setDisplayEditUserProfileModal={setDisplayEditUserProfileModal}
        selectedCarInfo={selectedCarInfo}
        onShowProfileControlsPress={handleShowUserProfileModal}
        onHomePageBtnPress={handleShowHomePage}
        onLogOutPress={handleLogoutOfUser}
      />
      <div id="homeUIBG" style={{ display: homeUI ? "block" : "none" }}>
        <img
          id="homePageBackgroundImage"
          src={`${process.env.REACT_APP_API_URL}/public/images/homePageBG.jpg`}
          alt="Background Image"
        />
        <div id="homePageFirstContainer">
          <p id="homePageFirstHeading">Pending Bookings</p>
          <div id="homePageFCSL"></div>
          <div id="homePagePendingBC">
            {pendingBookingsOwner.length === 0 ? (
              <p id="noPendingBookinForOwner">No Data Found.</p>
            ) : (
              pendingBookingsOwner.map((booking) => (
                <div key={booking._id} id="bookingPendingBGContainerT">
                  <div id="bookingContainerPendingImageBC">
                    <img
                      id="bookingContainerPendingImageElement"
                      src={`${process.env.REACT_APP_API_URL}${booking.customerPFP}`}
                    />
                  </div>
                  <div id="bookingContainerPendingMainContainer">
                    <p id="bookingContainerPendingName">
                      {booking.customerFullName}
                    </p>
                    <p id="bookingContainerPendingContent">
                      {booking.bookingText.split(" ").length > 10
                        ? booking.bookingText
                            .split(" ")
                            .slice(0, 10)
                            .join(" ") + "..."
                        : booking.bookingText}
                    </p>
                    <p
                      id="viewPendingBooking"
                      onClick={() => handleShowSPcontainer(booking)}
                    >
                      View Booking
                    </p>
                    <p
                      id="rejectPendingBooking"
                      onClick={() => handleShowFRBUI(booking)}
                    >
                      Reject
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div id="homePageSecondContainer">
          <p id="homePageSecondHeading">Completed Bookings</p>
          <div id="homePageFCSL"></div>
          <div id="homePageCompletedBC">
            {completedOwnerBookings.length === 0 ? (
              <p id="noCompletedBookings">No Data Found.</p>
            ) : (
              completedOwnerBookings.map((booking) => (
                <div key={booking._id} id="completedBookingOwnerBG">
                  <div id="completedBookingOwnerImageBC">
                    <img
                      id="completedBookingOwnerImageElement"
                      src={`${process.env.REACT_APP_API_URL}${booking.customerPFP}`}
                    />
                  </div>
                  <div id="completedBookingsOwnerMainContainer">
                    <p id="completedBookingOwnerAnsHead">Your answer</p>
                    <p id="completedBookingTimeHead">
                      {new Date(
                        booking.ownerReplyToBookingDate
                      ).toLocaleTimeString()}
                    </p>
                    <p id="completedBookingOwnerAns">
                      {booking.ownerReplyToBooking.split(" ").length > 10
                        ? booking.ownerReplyToBooking
                            .split(" ")
                            .slice(0, 10)
                            .join(" ") + "..."
                        : booking.ownerReplyToBooking}
                    </p>
                    <p id="completedBookingCustomerName">
                      {booking.customerFullName}
                    </p>
                    <p
                      id="completedBookingViewBookingP"
                      onClick={() => handleShowCBmodalForOwner(booking)}
                    >
                      View
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div id="homePageFirstLine"></div>
        <div id="homePageSecondLine"></div>
        <div id="homePageThirdLine"></div>
        <div id="homePageFourthLine"></div>
        <div id="homePageFifthLine"></div>
        <div id="middleContainerDefaultUI">
          <div
            id="middleContainerCircleDiv"
            style={{
              display: middleContainerDefaultPhase ? "block" : "none",
            }}
          >
            <img
              id="MCimageBackground"
              src={`${process.env.REACT_APP_API_URL}/public/images/RSimg.jpg`}
              alt="Roustuf Image"
              onClick={handleShowUserProfileInContainer}
            />
          </div>
        </div>
        <div
          id="middleContainerModifiedUI"
          style={{
            display: middleContainerDefaultPhase ? "none" : "block",
          }}
        >
          <img
            id="MCMUimage"
            src={`${process.env.REACT_APP_API_URL}${user.profilePic}`}
            alt="Profile Pic"
          />
          <div id="MCMUSLOCMC"></div>
          <p id="MCMUemailHead">{user.email}</p>
          <p id="MCMUotherHead">
            {user.showroomDetails?.carName}, {user.showroomDetails?.location}
          </p>
          <p id="MCMUnameHead">
            {user.firstName} {user.lastName}
          </p>
          <p id="MCMUcloseHead" onClick={handleHideUserProfileInContainer}>
            Close
          </p>
        </div>
      </div>
      <div id="displayCDBG" style={{ display: !homeUI ? "block" : "none" }}>
        <p id="DCPFtext">{selectedCarInfo.modelName} images</p>
        <div id="DCIcontainer">
          {selectedCarInfo.carImages && selectedCarInfo.carImages.length > 0 ? (
            selectedCarInfo.carImages.map((image, index) => (
              <img
                key={index}
                src={`${process.env.REACT_APP_API_URL}${image}`}
                alt={`Car Image ${index + 1}`}
                id="DCIcarImage"
                onClick={() => handleShowSelectedCarImages(image)}
              />
            ))
          ) : (
            <p>No images founded for this car.</p>
          )}
        </div>
        <div
          id="moreSelectedCarDetails"
          style={{ display: selectedCarDetailsModal ? "block" : "none" }}
        >
          <div id="MSCDSL"></div>
          <p id="MSCDmainText">
            All details related to {selectedCarInfo.modelName}
          </p>
          <div id="MSCDcontainer">
            <p id="MSCDmodelName">
              Model Name :{" "}
              <span id="colorModelname">{selectedCarInfo.modelName}</span>
            </p>
            <p id="MSCDengineType">Car Engine : {selectedCarInfo.engineType}</p>
            <p id="MSCDcolorCar">
              Cars are available in {selectedCarInfo.color} color.
            </p>
            <p id="MSCDmileageOfCar">
              This car offers a mileage of {selectedCarInfo.mileage} km/l,
              making it highly fuel-efficient.
            </p>
            <p id="MSCDsittingCapacityOfCar">
              This model has {selectedCarInfo.seatingCapacity} seats in total.{" "}
            </p>
            <p id="MSCDtransmittionType">
              The model supports {selectedCarInfo.transmissionType}{" "}
              transmissions.
            </p>
            <p id="MSCDtotalCarsCount">
              We have {selectedCarInfo.carsCount} cars in our showroom.
            </p>
            <p id="MSCDdescHead">More description -</p>
            <div id="MSCDdescriptionContainer">
              <p id="MSCDdescription">{selectedCarInfo.description}</p>
            </div>
            <p id="MSCDcostP">
              cost you at ₹{" "}
              <span id="priceOfCar"> {selectedCarInfo.price} </span>
            </p>
            <p id="MSCDemiHead">
              EMI starts as{" "}
              <span id="MSCDemitextcolor"> {selectedCarInfo.emiPerMonth} </span>{" "}
              /- month
            </p>
            <p id="MSCDedittext" onClick={handleShowCarDetailsControls}>
              Edit car <FontAwesomeIcon icon={faPenToSquare} />
            </p>
          </div>
          <p id="MSCDsecondLine">Your other cars pending bookings</p>
          <div id="MSCDsecondContainer">
            {bookedDataForOtherCars.length === 0 ? (
              <p id="noPendingBookingsForOtherCarsInshowroom">
                There is no pending booking for other cars in your showroom.{" "}
              </p>
            ) : (
              bookedDataForOtherCars.map((data, index) => (
                <div key={index} id="bookedDataForOtherCarsBG">
                  <div id="bookedDataForOtherCarsImageContainer">
                    <img
                      id="bookedDataForOtherCarsImage"
                      src={`${process.env.REACT_APP_API_URL}${data.customerPFP}`}
                    />
                  </div>
                  <p id="bookedDataForOtherCarsCustomerName">
                    {data.customerName}
                  </p>
                  <div id="bookedDataForOCTextContainer">
                    <p id="bookedDataForOCtext">{data.bookingText}</p>
                  </div>
                  <p id="bookedDataForOCdate">
                    {new Date(data.bookingDate).toLocaleDateString()}
                  </p>
                  <p
                    id="bookedDataRejectP"
                    onClick={() =>
                      handleShowSelectedRejectBookingContainer(data)
                    }
                  >
                    Reject booking
                  </p>
                  <p
                    id="bookedDataViewP"
                    onClick={() => handleViewSelectedOtherBooking(data)}
                  >
                    View <FontAwesomeIcon icon={faArrowUpFromBracket} />
                  </p>
                </div>
              ))
            )}
          </div>
          <p id="MSCDthirdText">Pending bookings of the car</p>
          <div id="MSCDpendingbookingsContainer">
            {fetchedCarPendingBookings.length === 0 ? (
              <p id="noPendingBookingsForSelectedCar">
                <u>No bookings found.</u>
              </p>
            ) : (
              <>
                <div id="fetchedCarPendingBookingsMainContainer">
                  {fetchedCarPendingBookings.map((pendingBooking) => (
                    <div
                      key={pendingBooking._id}
                      id="fetchedPendingBookingCarBG"
                    >
                      <div id="fetchedPcarBImageContainer">
                        <img
                          id="fetchedPcarBimage"
                          src={`${process.env.REACT_APP_API_URL}${pendingBooking.customerPFP}`}
                        />
                      </div>
                      <p id="fetchedPcarBCustomerName">
                        {pendingBooking.customerName}
                      </p>
                      <div id="fetchedPcarBTextContainer">
                        <p id="fetchedPcarBTxt">{pendingBooking.bookingText}</p>
                      </div>
                      <p
                        id="fetchedPcarBemailText"
                        onClick={() => handleContactWithEmail(pendingBooking)}
                      >
                        Contact with email!
                      </p>
                      <button
                        id="fetchedPcarBrespondButton"
                        onClick={() =>
                          handleShowResponseTouserModal(pendingBooking)
                        }
                      >
                        Respond
                      </button>
                      <button
                        id="fetchedPcarBrejectButton"
                        onClick={() => handleRejectUserBooking(pendingBooking)}
                      >
                        Reject
                      </button>
                      <p id="fetchedPcarBmoreDetails">Select actions</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div
          id="SCimageContainer"
          style={{ display: !selectedCarDetailsModal ? "block" : "none" }}
        >
          <img
            src={`${process.env.REACT_APP_API_URL}${displaySelectedCarImage}`}
            alt="Selected Car Image"
            id="SCimageData"
          />
          <button
            id="goBackFromSelectedImageDisplayBtn"
            onClick={handleShowDetailsOfCarAgain}
          >
            <FontAwesomeIcon icon={faAnglesLeft} /> Go Back
          </button>
        </div>
        <div id="DCISL"></div>
        <div
          id="editCarDM"
          style={{
            display: !editCarDetailsModal ? "none" : "block",
          }}
        >
          <div id="modalBackground"></div>
          <div id="editCarElementsModel">
            <p id="editCEMFirstHead">Fill in details you want to change</p>
            <div id="ECEMcontainerSL"></div>
            <form id="changeCarDetailsForm" onSubmit={handleChangeInCarDetails}>
              <input
                type="number"
                id="editCarPriceInput"
                placeholder="Change price"
                value={changeCarDetailsData.newCarPrice}
                onChange={handleChangeInCarData}
                name="newCarPrice"
              />
              <input
                type="number"
                id="editCarCountInput"
                placeholder="Change car count"
                value={changeCarDetailsData.newCarCount}
                onChange={handleChangeInCarData}
                name="newCarCount"
              />
              <textarea
                id="editCarDescriptionInput"
                value={changeCarDetailsData.newCarDescription}
                onChange={handleChangeInCarData}
                name="newCarDescription"
              />
              <p id="descriptionSPtext">Change Description</p>
              <label class="upload-btn" for="imageInput">
                Upload Images
              </label>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                onChange={handleChangeInCarImages}
                multiple
              />
              <button id="saveChangeInDetailsBtn">Commit Changes</button>
            </form>
            <p id="someInfoOC">
              Some details like model name, color, mileage, etc. are not
              editable. For that you can{" "}
              <span id="deleteTheCarWord" onClick={handleDeleteCarFromShowroom}>
                Delete This Car
              </span>{" "}
              and then add it again.
            </p>
            <p id="someInfoOCnote">Note - </p>
            <p id="closeSIcontainer" onClick={handleCloseCarDetailsModal}>
              <u>Close Panel</u>
            </p>
          </div>
        </div>
      </div>
      <div
        id="MCmodalBG"
        style={{ display: manageCarsModal ? "block" : "none" }}
      >
        <div id="modalBackground">
          <div id="MCmainModal">
            <p id="MCmainModalFT">
              Add {user.showroomDetails?.carName} model to showroom
            </p>
            <form id="MCaddCarForm" onSubmit={handleSaveCarDetails}>
              <input
                type="text"
                id="modalNameCarInput"
                placeholder="Car Model Name"
                name="modelName"
                value={carsInfo.modelName}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                id="modalPriceCarInput"
                placeholder="Enter Model Price"
                name="modelPrice"
                value={carsInfo.modelPrice}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                id="modalSeatsInput"
                placeholder="Number Of Seats"
                name="sittingCapacity"
                value={carsInfo.sittingCapacity}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                id="modalMileageInput"
                name="modelMileage"
                placeholder="Enter Mileage"
                value={carsInfo.modelMileage}
                onChange={handleInputChange}
                required
              />
              <select
                id="modalEngineSelect"
                name="engineType"
                value={carsInfo.engineType}
                onChange={handleInputChange}
                required
              >
                <option disabled value="">
                  Select Engine
                </option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              <select
                id="modalTransmissionSelect"
                name="transmissionType"
                value={carsInfo.transmissionType}
                onChange={handleInputChange}
                required
              >
                <option disabled value="">
                  Select Transmission
                </option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
              <select
                id="modalColorSelect"
                name="modelColor"
                value={carsInfo.modelColor}
                onChange={handleInputChange}
                required
              >
                <option disabled value="">
                  Select Color
                </option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="White">White</option>
                <option value="Black">Black</option>
              </select>
              <div className="image-upload-container">
                <label htmlFor="file-input" className="upload-button">
                  Choose Images
                </label>
                <input
                  type="file"
                  id="file-input"
                  accept="image/*"
                  multiple
                  className="hidden-input"
                  onChange={handleChangeInImages}
                />
              </div>
              <input
                type="number"
                id="modalNOCinput"
                name="carsCount"
                placeholder="Enter Cars Count"
                value={carsInfo.carsCount}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                id="modalEMIinput"
                name="emiRate"
                placeholder="Enter EMI/Month"
                value={carsInfo.emiRate}
                onChange={handleInputChange}
              />
              <textarea
                id="modalDescriptionInput"
                placeholder="Write something about this model"
                name="modelDescription"
                value={carsInfo.modelDescription}
                onChange={handleInputChange}
                required
              />
              <button id="saveNewModalBtn" type="submit">
                Add Model
              </button>
            </form>
            <button id="showHistoryModel" onClick={handleShowCAdetails}>
              Show History
            </button>
          </div>
        </div>
      </div>
      <div
        id="CAdetailsBG"
        style={{ display: showCAdetails ? "block" : "none" }}
      >
        <div id="modalBackground">
          <div id="CAMMcontainer">
            <p id="CAMMCtextFirst">Cars you added recently</p>
            <div id="CAMMcontainerMain">
              {fetchedCars.length === 0 ? (
                <p id="CAMMtextNoCars">No cars you added yet!!</p>
              ) : (
                fetchedCars.map((car, index) => (
                  <div id="CAMMcardetails" key={index}>
                    <img
                      id="CAMMcardImage"
                      src={`${process.env.REACT_APP_API_URL}${car.carImages[0]}`}
                      alt={car.modelName}
                    />
                    <p id="CAMMcardName">{car.modelName}</p>
                    <p id="CAMMcardPrice">Price = ₹ {car.price}</p>
                    <p id="CAMMcardSeats">
                      Total Seats = {car.seatingCapacity}
                    </p>
                    <p id="CAMMcardMD">
                      More <FontAwesomeIcon icon={faArrowUpFromBracket} />
                    </p>
                  </div>
                ))
              )}
            </div>
            <button id="CAMMcloseBtn" onClick={handleCloseCAmodal}>
              Close History
            </button>
            <button id="CAMMGBbtn" onClick={handleHideCAdetails}>
              Go Back
            </button>
          </div>
        </div>
      </div>
      <div
        id="editUPmodalOwner"
        style={{ display: displayEditUserProfileModal ? "block" : "none" }}
      >
        <div id="editUPmodalBackground">
          <div id="editUPelementsContainer">
            <form id="editUPform" onSubmit={handleChangeUserDetails}>
              <p id="editUP1Text">Change password</p>
              <input
                type="password"
                id="editUPnewPass"
                name="userPassword"
                value={userData.userPassword}
                onChange={handleInputChangeInUserData}
              />
              <p id="editUP2Text">Change Firstname</p>
              <input
                type="text"
                id="editUPnewFirstName"
                value={userData.userFirstName}
                onChange={handleInputChangeInUserData}
                name="userFirstName"
              />
              <p id="editUP3Text">Change Lastname</p>
              <input
                type="text"
                id="editUPnewLastName"
                value={userData.userLastName}
                onChange={handleInputChangeInUserData}
                name="userLastName"
              />
              <div class="container">
                <label for="fileInput" class="custom-input-button">
                  Change ProfilePic
                </label>
                <input
                  type="file"
                  id="fileInput"
                  multiple
                  style={{ display: "none" }}
                  onChange={handleChangeInUserPFP}
                />
              </div>
              <p id="moreDetHeadPara">More details about showroom</p>
              <div id="moreDCslOC"></div>
              <input
                type="text"
                id="moreDetailsNewLocation"
                placeholder="Enter Location"
                value={userData.userLocation}
                onChange={handleInputChangeInUserData}
                name="userLocation"
              />
              <label for="fileInput2" class="custom-input-button-alt">
                Change cover
              </label>
              <input
                type="file"
                id="fileInput2"
                multiple
                style={{ display: "none" }}
                onChange={handleChangeInShowroomCover}
              />
              <div id="moreDCSL"></div>
              <p id="confirmationHeadMD">Enter password to continue</p>
              <input
                type="password"
                id="confirmationPasswordTC"
                value={userData.userConfirmPassword}
                onChange={handleInputChangeInUserData}
                name="userConfirmPassword"
                required
              />
              <button id="editUserSaveButton" type="submit">
                Save Changes
              </button>
            </form>
            <div id="formSLOEC"></div>
            <p id="noteOEC">Note - This is an irreversible action</p>
            <span id="deleteACCSpanNOEC">Delete The Account ?</span>
          </div>
          <p
            id="closeEditUserProfilePanel"
            onClick={handleHideUserProfileModal}
          >
            <u>Close</u>
          </p>
          <p id="editUPECtext">Edit your profile details</p>
        </div>
      </div>
      <div
        id="showPendingSelectedContainer"
        style={{
          display: showSelectedPendingBooking ? "block" : "none",
        }}
      >
        <div id="showUserDetailsContainerPB">
          <img
            id="showUserDetailsContainerUserImage"
            src={`${process.env.REACT_APP_API_URL}${storeUserInfoPB.customerPFP}`}
          />
          <p id="customerUserNamePB">{storeUserInfoPB.customerFullName}</p>
          <p id="customerDatePB">
            {`${new Date(
              storeUserInfoPB.bookingDate
            ).toDateString()} ${new Date(
              storeUserInfoPB.bookingDate
            ).toTimeString()}`}
          </p>
          <div id="customerContainerPBSL"></div>
          <button
            id="replyToCustomerPBbtn"
            onClick={handleShowSelectedPendinBookinContainer}
          >
            Respond
          </button>
          <button
            id="rejectCustomerPBbtn"
            onClick={() => handleRejectBookingFromInside(storeUserInfoPB)}
          >
            Reject
          </button>
          <p id="customerQueryText">User query from us</p>
          <div id="customerQueryContainerPB">
            <p id="customerQueryContainerPBtext">
              {storeUserInfoPB.bookingText}
            </p>
          </div>
          <p id="customerCarSelectedNamePB">
            Car selected : <span id="carsNamePB">{PBcardata.modelName}</span>{" "}
          </p>
          <p id="customerCarSelectedPricePB">
            Car price : <span id="carsPricePB"> ₹ {PBcardata.price} /- </span>{" "}
          </p>
          <p id="customerCarSelectedCountPB">
            We have <span id="carsCountPB">{PBcardata.carsCount}</span> cars in
            showroom
          </p>
          <p id="customerCarMoreDetailsSelected">
            ( You can view more details of car from footer below )
          </p>
          <p
            id="customerCarSelectedModelClosePB"
            onClick={handleClosePBuserContainer}
          >
            Close details
          </p>
        </div>
      </div>
      <div
        id="showReplyToUserPendingBookingContainer"
        style={{
          display: respondPendingUserModal ? "block" : "none",
        }}
      >
        <p id="showReplyToUserPendingBookingHead">
          Respond to{" "}
          <span id="showRTUPBUname">{storeUserInfoPB.customerFullName}</span>
        </p>
        <div id="showReplyToUserPBSL"></div>
        <img
          id="showReplyToUserCarImage"
          src={`${process.env.REACT_APP_API_URL}${PBcardata?.carImages?.[0]}`}
        />
        <p id="showReplyToUserCarName">
          <span id="showReplyToUserCarNameSpan">{PBcardata.modelName}</span>{" "}
          image
        </p>
        <div id="showReplyToUserPBSL2"></div>
        <p id="showReplyToUserSecondHead">Enter your response</p>
        <textarea
          id="showReplyToUserTextArea"
          value={ownerRespond}
          onChange={(e) => setOwnerRespond(e.target.value)}
        ></textarea>
        <p
          id="showReplytoUserSendResponse"
          onClick={handleSendRespondToCustomer}
        >
          Send response <FontAwesomeIcon icon={faPaperPlane} />
        </p>
        <div id="showReplyToUserPBSL3"></div>
        <p id="showReplyToUserThirdHead">
          You can respond to this user with email as well
        </p>
        <p id="showReplyToUserEmail" onClick={handleSendEmailToPendingUser}>
          {pendingBookinUserData.email}
        </p>
        <p
          id="showReplyToUserCloseP"
          onClick={handleClosePendingBookingResponseContainer}
        >
          Cancel
        </p>
      </div>
      <div
        id="showRejectBeforeModal"
        style={{
          display: frontUIrejectedModel ? "block" : "none",
        }}
      >
        <div id="modalBackground">
          <div id="showRejectBeforeBackground">
            <p id="showRejectBeforeFirstHead">
              We need a reason to reject{" "}
              <span id="beforeRejectSpanCustomerName">
                {frontUIrejectBooking.customerFullName}
                's{" "}
              </span>{" "}
              Booking
            </p>
            <div id="showRejectContainerFirstSL"></div>
            <textarea
              id="showRejectContainerContent"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            ></textarea>
            <p id="showRejectContainerCancelHead" onClick={handleCloseFRUI}>
              Cancel
            </p>
            <button
              id="showRejectContainerSubmitBtn"
              onClick={handleRejectBookingThroughFrontUI}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
      <div
        id="showCompletedBookingsMoreDetailsModal"
        style={{
          display: ownerShowMoreCBdetailsModal ? "block" : "none",
        }}
      >
        <div id="showCompletedBookingsMoreDetailsBackground">
          <img
            id="showCompletedBookingsMDcustomerPFP"
            src={`${process.env.REACT_APP_API_URL}${ownerSelectedBooking.customerPFP}`}
          />
          <p id="showCompletedBookingsMDCustomerName">
            {ownerSelectedBooking.customerFullName}
          </p>
          <p id="showCompletedBookingsMDbookedAt">
            {`${new Date(
              ownerSelectedBooking.bookingDate
            ).toDateString()} ${new Date(
              ownerSelectedBooking.bookingDate
            ).toTimeString()}`}
          </p>
          <div id="showCompletedBookingsMDSL"></div>
          <p id="showCompletedBookingCompletedAthead">Accepted by you at</p>
          <p id="showCompletedBookingCompletedAt">
            {`${new Date(
              ownerSelectedBooking.ownerReplyToBookingDate
            ).toDateString()} ${new Date(
              ownerSelectedBooking.ownerReplyToBookingDate
            ).toTimeString()}`}
          </p>
          <p id="showCompletedBookingsCustomerQueHead">User Query</p>
          <div id="showCompletedBookingsCustomerQueContainer">
            <p id="showCompletedBookingsCustomerQueText">
              {ownerSelectedBooking.bookingText}
            </p>
          </div>
          <p id="showCompletedBookingsOwnerQueHead">Your Answer</p>
          <div id="showCompletedBookingsOwnerQueContainer">
            <p id="showCompletedOwnerBookingQueText">
              {ownerSelectedBooking.ownerReplyToBooking}
            </p>
          </div>
          <p
            id="showCompletedBookingUserQueryBelowHead"
            onClick={() => window.alert(ownerSelectedBooking.bookingText)}
          >
            View Query
          </p>
          <p
            id="showCompletedBookingUserQueryBelowText"
            onClick={() =>
              window.alert(ownerSelectedBooking.ownerReplyToBooking)
            }
          >
            View Answer
          </p>
          <p id="showCompletedBookingsCarName">
            Car Name :{" "}
            <span id="showCompletedBookingsCarNameSpan">
              {ownerSelectedBooking.carName}
            </span>
          </p>
          <p id="showCompletedBookingsCarModel">
            Car Price : {""}
            <span id="showCompletedBookingsCarModelSpan">
              ₹ {ownerSelectedBooking.carPrice} /-
            </span>
          </p>
          <p id="showCompletedBookingsCarCount">
            We have{" "}
            <span id="showCompletedBookingsCarCountSpan">
              {" "}
              {ownerSelectedBooking.carCount}
            </span>{" "}
            cars in showroom
          </p>
          <p id="showCompletedBookingsCarMoreDetailsP">
            ( You can view more details of car from footer below )
          </p>
          <p
            id="showCompletedBookingsCloseContainer"
            onClick={handleCloseCBmodalForOwner}
          >
            Close booking
          </p>
        </div>
      </div>
      <div
        id="respondToUserModal"
        style={{ display: respondToUserModal ? "block" : "none" }}
      >
        <div id="modalBackground">
          <div id="respondToUserModalContainer">
            <p id="respondToUserModalFirstHead">
              We will send respond to{" "}
              <span id="respondToUserNameSpan">
                {responduserData.customerName}
              </span>
            </p>
            <p id="respondToUserModalBookedAt">
              Booking was sent at {""}
              <span id="respondToUserBookedAt">
                {new Date(responduserData.bookingDate).toDateString()}
              </span>{" "}
              on{" "}
              <span id="respondToUserBookedDate">
                {new Date(responduserData.bookingDate).toLocaleTimeString()}
              </span>
            </p>
            <div id="respondTouserModalSL"></div>
            <p id="respondToUserModalSecondHead">Enter your response</p>
            <textarea
              id="respondToUserModalMainContainer"
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
            ></textarea>
            <button
              id="respondToUserModalSubmitBtn"
              onClick={handleSendResponseToUserSuccessfully}
            >
              Send Respond
            </button>
            <p
              id="respondToUserModalCancelP"
              onClick={handleCloseResponseToUserModal}
            >
              Cancel
            </p>
          </div>
        </div>
      </div>
      <div
        id="rejectUserBookingModal"
        style={{
          display: rejectBookingUserModal ? "block" : "none",
        }}
      >
        <div id="modalBackground">
          <div id="rejectUserBookingModalContainer">
            <p id="rejectUserBookingModalFirstHead">
              Please tell us reason in some lines
            </p>
            <div id="rejectUserBookingModalSL"></div>
            <textarea
              id="rejectUserMainContainerData"
              value={rejectText}
              onChange={(e) => setRejectText(e.target.value)}
            ></textarea>
            <button
              id="rejectUserBookingModalSubmitBtn"
              onClick={handleRejectBookingOfUser}
            >
              Reject Booking
            </button>
            <p
              id="rejectUserBookingCloseP"
              onClick={handleCloseRejectUserModal}
            >
              Cancel
            </p>
          </div>
        </div>
      </div>
      <div
        id="otherBookedCarModal"
        style={{
          display: acceptBookingForOtherCarModal ? "block" : "none",
        }}
      >
        <div id="modalBackground">
          <div id="otherBookedCarModalContainer">
            <img
              id="otherBookedCarModalImage"
              src={`${process.env.REACT_APP_API_URL}${selectedOtherBookedCar.carPFP?.[0]}`}
            />
            <p id="otherBookedCarImagenName">
              <span id="selectedCarBookedByUser">
                {selectedOtherBookedCar.carName}
              </span>{" "}
              car booked by user
            </p>
            <p id="otherBookedCarModalPrice">
              <span id="selectedCarPriceBookedByUser">
                {" "}
                ₹ {selectedOtherBookedCar.carPrice} /-
              </span>{" "}
              and we have{" "}
              <span id="selectedCarCountBookedByUser">
                {selectedOtherBookedCar.carCount}
              </span>{" "}
              cars in showroom
            </p>
            <p id="otherBookedCarModalUserQueryHead">
              Query received from user
            </p>
            <div id="otherBookedCarModalQueryContainer">
              <p id="otherBookedCarModalPText">
                {selectedOtherBookedCar.bookingText}
              </p>
            </div>
            <div id="otherBookedCarModalSL"></div>
            <div id="otherBookedCarImageContainer">
              <img
                id="otherBookedCarImageData"
                src={`${process.env.REACT_APP_API_URL}${selectedOtherBookedCar.customerPFP}`}
              />
            </div>
            <p id="otherBookedCarUserNameHead">Name of user</p>
            <p id="otherBookedCarUserFullName">
              {selectedOtherBookedCar.customerName}
            </p>
            <p id="otherBookedCarBookedAtDate">Sent booking at</p>
            <p id="otherBookedCarBookedDate">
              {new Date(
                selectedOtherBookedCar.bookingDate
              ).toLocaleDateString()}
            </p>
            <textarea
              id="otherBookedCarModalMainContainer"
              value={responseTextToOtherBooking}
              onChange={(e) => setResponseTextToOtherBooking(e.target.value)}
            ></textarea>
            <p id="otherBookedCarModalExtraP">
              Enter text to answer this query
            </p>
            <div id="otherBookedCarPositionEmail">
              <p id="otherBookedCarEmailFirstHead">
                You can contact user through
              </p>
              <p
                id="otherBookedCarEmailText"
                onClick={handleRespondToBookingWithEmail}
              >
                {selectedOtherBookedCar.customerEmail}
              </p>
            </div>
            <p id="otherBookedCarTimeP">
              {new Date(
                selectedOtherBookedCar.bookingDate
              ).toLocaleTimeString()}
            </p>
            <button
              id="sendResponseToOtherBookingUser"
              onClick={handleAcceptBookingForOtherCar}
            >
              Send Response
            </button>
            <p
              id="cancelRespondToOtherBookingUser"
              onClick={handleCloseSelectedOtherBookingModal}
            >
              Cancel
            </p>
          </div>
        </div>
      </div>
      <div
        id="rejectBookingForOtherCarModal"
        style={{
          display: rejectBookingForOtherCarModal ? "block" : "none",
        }}
      >
        <div id="modalBackground">
          <div id="otherBookedCarModalContainer">
            <img
              id="otherBookedCarModalImage"
              src={`${process.env.REACT_APP_API_URL}${selectedRejectedData.carPFP?.[0]}`}
            />
            <p id="otherBookedCarImagenName">
              <span id="selectedCarBookedByUser">
                {selectedRejectedData.carName}
              </span>{" "}
              car booked by user
            </p>
            <p id="otherBookedCarModalPrice">
              <span id="selectedCarPriceBookedByUser">
                {" "}
                ₹ {selectedRejectedData.carPrice} /-
              </span>{" "}
              and we have{" "}
              <span id="selectedCarCountBookedByUser">
                {selectedRejectedData.carCount}
              </span>{" "}
              cars in showroom
            </p>
            <p id="otherBookedCarModalUserQueryHead">
              Query received from user
            </p>
            <div id="otherBookedCarModalQueryContainer">
              <p id="otherBookedCarModalPText">
                {selectedRejectedData.bookingText}
              </p>
            </div>
            <div id="otherBookedCarModalSL"></div>
            <div id="otherBookedCarImageContainer">
              <img
                id="otherBookedCarImageData"
                src={`${process.env.REACT_APP_API_URL}${selectedRejectedData.customerPFP}`}
              />
            </div>
            <p id="otherBookedCarUserNameHead">Name of user</p>
            <p id="otherBookedCarUserFullName">
              {selectedRejectedData.customerName}
            </p>
            <p id="otherBookedCarBookedAtDate">Sent booking at</p>
            <p id="otherBookedCarBookedDate">
              {new Date(selectedRejectedData.bookingDate).toLocaleDateString()}
            </p>
            <textarea
              id="otherBookedCarModalMainContainer"
              value={rejectTextToOtherBooking}
              onChange={(e) => setRejectTextToOtherBooking(e.target.value)}
            ></textarea>
            <p id="otherBookedCarModalExtraP">
              Enter reason to reject this query
            </p>
            <div id="otherBookedCarPositionEmail">
              <p id="otherBookedCarEmailFirstHead">
                You can contact user through
              </p>
              <p
                id="otherBookedCarEmailText"
                onClick={handleRejectBookingWithEmail}
              >
                {selectedRejectedData.customerEmail}
              </p>
            </div>
            <p id="otherBookedCarTimeP">
              {new Date(selectedRejectedData.bookingDate).toLocaleTimeString()}
            </p>
            <button
              id="sendResponseToOtherBookingUser"
              onClick={handleRejectBookingForOtherCar}
            >
              Send Reason
            </button>
            <p
              id="cancelRespondToOtherBookingUser"
              onClick={handleHideRejectBookingContainer}
            >
              Cancel
            </p>
          </div>
        </div>
      </div>
      <OwnerHomeFooter
        setHomeUI={setHomeUI}
        setSelectedCarInfo={setSelectedCarInfo}
        setDisplaySelectedCarImage={setDisplaySelectedCarImage}
        setSelectedCarDetailsModal={setSelectedCarDetailsModal}
        setEditCarDetailsModal={setEditCarDetailsModal}
        setDisplayEditUserProfileModal={setDisplayEditUserProfileModal}
        setManageCarsModal={setManageCarsModal}
        setShowCAdetails={setShowCAdetails}
        setShowSelectedPendingBooking={setShowSelectedPendingBooking}
        setRespondPendingUserModal={setRespondPendingUserModal}
        setFrontUIrejectedModel={setFrontUIrejectedModel}
        setOwnerShowMoreCBdetailsModal={setOwnerShowMoreCBdetailsModal}
        setFetchedCarPendingBookings={setFetchedCarPendingBookings}
        setRespondToUserModal={setRespondToUserModal}
        setRejectBookingModal={setRejectBookingModal}
        setRejectUserBookingData={setRejectUserBookingData}
        setResponseText={setResponseText}
        setRejectText={setRejectText}
        setAcceptBookingForOtherCarModal={setAcceptBookingForOtherCarModal}
        setResponseTextToOtherBooking={setResponseTextToOtherBooking}
        setRejectTextToOtherBooking={setRejectTextToOtherBooking}
        setRejectBookingForOtherCarModal={setRejectBookingForOtherCarModal}
        setBookedDataForOtherCars={setBookedDataForOtherCars}
      />
    </>
  );
};

export default OwnerHome;
