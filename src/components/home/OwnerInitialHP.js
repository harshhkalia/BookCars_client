import React, { useEffect, useState } from "react";
import "../others/css/OwnerInitialHP.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OwnerInitialHP = () => {
  const [image, setImage] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCredintals = () => {
      const userInfo = JSON.parse(localStorage.getItem("userdata"));
      if (userInfo) setUser(userInfo);
    };
    fetchCredintals();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCancelOAcreation = () => {
    setImage(null);
    setCompanyName("");
    setLocation("");
  };

  const handleCompleteOAcreation = async (event) => {
    event.preventDefault();

    if (!image) {
      window.alert("You have to upload one image of your showroom");
      return;
    }

    const formData = new FormData();
    formData.append("location", location);
    formData.append("companyName", companyName);
    formData.append("showRoomPFP", image);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/completeOwnerDetails`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        window.alert(response.data.message);
        navigate("/owner");
        localStorage.setItem("userdata", JSON.stringify(response.data.user));
      }
    } catch (err) {
      console.log(err);
      window.alert(
        err.response?.data?.message ||
          "An error occurred while saving your details!!"
      );
    }
  };

  return (
    <div>
      <div id="setupOwnerElements">
        <div id="setupDetailsContainer">
          <div id="mainContainerOP">
            <p id="MCheadL">We need some details to get started</p>
            <div id="MCSL"></div>
            <form id="completeOAForm" onSubmit={handleCompleteOAcreation}>
              <input
                type="text"
                id="carCompanyInput"
                placeholder="Enter company name"
                onChange={(e) => setCompanyName(e.target.value)}
                value={companyName}
                required
              />
              <input
                type="text"
                id="showroomLocationInput"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <div className="image-upload-container">
                <label htmlFor="file-input" className="upload-buttonOwnerPage">
                  {image ? "Change Image" : "Upload Image"}
                </label>
                <input
                  type="file"
                  id="file-input"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden-input"
                />
              </div>
              <button id="completeOAButton" type="submit">
                Proceed Further
              </button>
            </form>
            <button id="cancelOAcreation" onClick={handleCancelOAcreation}>
              Cancel
            </button>
            <p id="belowtxtOA">You can always change it later from settings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerInitialHP;
