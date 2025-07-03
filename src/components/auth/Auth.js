import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLoginContainer, setIsLoginContainer] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
    comfirmPassword: "",
    firstName: "",
    lastName: "",
    userType: "Customer",
    loginEmail: "",
    loginPassword: "",
  });
  const [userPFP, setUserPFP] = useState(null);

  const navigate = useNavigate();

  const handleSwitchLC = (event) => {
    setIsLoginContainer(false);
    event.preventDefault();
  };

  const handleSwitchBackLC = (event) => {
    setIsLoginContainer(true);
    event.preventDefault();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setUserPFP(file);
  };

  const handleCheckboxChange = () => {
    setData((prevData) => ({
      ...prevData,
      userType: document.getElementById("userTypeCheckbox").checked
        ? "Owner"
        : "Customer",
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSetupAccount = async (event) => {
    event.preventDefault();

    if (data.password !== data.comfirmPassword) {
      window.alert("Passwords do not match!, please correct the passwords");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", userPFP);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("userType", data.userType);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/createAccount`,
        formData
      );
      if (response.status === 201) {
        window.alert(response.data.message);
        setIsLoginContainer(true);
        setData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          comfirmPassword: "",
          userType: "Customer",
        });
        setUserPFP(null);
      }
    } catch (err) {
      console.log(err);
      window.alert(
        err.response?.data?.message ||
          "An error occurred while creating the account."
      );
    }
  };

  const handleCheckUserDetails = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/loginUser`,
        { email: data.loginEmail, password: data.loginPassword }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userdata", JSON.stringify(response.data.user));

        const user = response.data.user;
        const userType = user.userType;

        if (userType === "Customer") {
          navigate("/customer");
        } else if (userType === "Owner") {
          if (!user?.showroomDetails?.carName) {
            navigate("/ownerIP");
          } else {
            navigate("/owner");
          }
        }
      }
    } catch (err) {
      console.log(err);
      window.alert(
        err.response?.data?.message || "An error occurred while logging in."
      );
    }
  };

  return (
    <>
      <div id="authBackground">
        <div id="authPageElements">
          <div
            id="loginContainer"
            style={{ display: isLoginContainer ? "block" : "none" }}
          >
            <h3 id="loginContainerHeading">Roustuf Sales</h3>
            <p id="loginheadTxt">Enter your login credentials</p>
            <div id="LCSL"></div>
            <form id="loginForm" onSubmit={handleCheckUserDetails}>
              <p id="loginEmailHead">Enter email</p>
              <input
                type="email"
                id="loginEmail"
                placeholder="example@abc.com"
                value={data.loginEmail}
                name="loginEmail"
                onChange={handleInputChange}
                required
              />
              <p id="loginEmailPassHead">Enter password</p>
              <input
                type="password"
                id="loginPassword"
                name="loginPassword"
                onChange={handleInputChange}
                value={data.loginPassword}
                required
              />
              <button id="loginBtn">Submit</button>
            </form>
            <p id="loginFooterTxt">
              Don't have an account ?{" "}
              <a href="/" id="signupAtag" onClick={handleSwitchLC}>
                Sign up
              </a>
            </p>
          </div>
          <div
            id="signupContainer"
            style={{ display: !isLoginContainer ? "block" : "none" }}
          >
            <h3 id="loginContainerHeading">Roustuf Sales</h3>
            <p id="loginheadTxt">Create your new account</p>
            <div id="LCSL"></div>
            <form id="signupForm" onSubmit={handleSetupAccount}>
              <input
                type="text"
                id="firstnameInput"
                name="firstName"
                placeholder="First Name"
                value={data.firstName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                id="lastnameInput"
                placeholder="Last Name"
                name="lastName"
                value={data.lastName}
                onChange={handleInputChange}
              />
              <input
                type="email"
                id="userEmailInput"
                placeholder="Enter email"
                name="email"
                value={data.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                id="userPasswordInput"
                placeholder="Enter password"
                name="password"
                value={data.password}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                id="confirmUserPasswordInput"
                placeholder="Confirm password"
                name="comfirmPassword"
                value={data.comfirmPassword}
                onChange={handleInputChange}
                required
              />
              <label for="imageInput" class="image-input-label">
                Upload Image
              </label>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                class="image-input"
                onChange={handleImageUpload}
              />
              <div class="checkbox-container">
                <input
                  type="checkbox"
                  id="userTypeCheckbox"
                  class="toggle-checkbox"
                  onClick={handleCheckboxChange}
                />
                <label for="userTypeCheckbox" class="toggle-label"></label>
              </div>
              <p id="checkboxTxt">Do you have a show-room ?</p>
              <button id="signupBtn">Save Details</button>
            </form>
            <p id="signupFooterTxt">
              Already have an account ?{" "}
              <a href="/" id="loginAtag" onClick={handleSwitchBackLC}>
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
