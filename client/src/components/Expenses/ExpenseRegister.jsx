import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ExpenseRegister.css";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ExpenseRegister = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    let timer;
    if (error) {
      setShowError(true);
      timer = setTimeout(() => {
        setError("");
        setShowError(false);
      }, 3000); // Waktu penundaan, dalam milidetik (di sini 5000ms atau 5 detik)
    }
    return () => clearTimeout(timer);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setShowModal(true); // Menampilkan modal saat loading dimulai

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        {
          name,
          email,
          phoneNumber,
          password,
        }
      );

      localStorage.setItem("email", email);

      // Handle successful registration
      const { newUser, otp } = response.data.data;
      console.log(newUser); // Do something with newUser
      console.log(otp); // Do something with otp

      // Reset form field
      setName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
      setError("");

      // Generate the OTP URL with the email as a parameter
      const otpUrl = `/otp-verify`;

      // Navigate to OTP page
      window.location.href = otpUrl;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Failed to register");
      }
    }

    setIsLoading(false);
    setShowModal(false); // Menutup modal setelah loading selesai
  };

  const passwordInputType = passwordVisible ? "text" : "password";
  return (
    <>
      <style>{`
body {
  font-family: 'Segoe UI', sans-serif;
}

h1 {
  font-size: 36px;
  color: #1B1B1D;
  letter-spacing: -1px;
}

p{
  font-size: 16px;
  color: #59596e;
  letter-spacing: -0.5px;
}

.form-control {
  background: #EEF7F6;
  border: none;
  padding: 14px 20px;
  font-size: 12px;
}

.form-control:focus {
  color: var(--bs-body-color);
  background-color: var(--bs-body-bg);
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgb(238, 247, 246);
}

.btn {
  border: none;
  padding: 14px 20px;
  font-size: 14px;
  background: #0C7D81;
}

.btn-check:checked+.btn, .btn.active, .btn.show, .btn:first-child:active, :not(.btn-check)+.btn:active, .btn:hover {
  background: #095f62;
  border: none;
}

.btn.disabled, .btn:disabled, fieldset:disabled .btn {
  color: var(--bs-btn-disabled-color);
  pointer-events: none;
  background-color: #095f62;
  border: none;
  opacity: var(--bs-btn-disabled-opacity);
}

a{
  color: #0C7D81;
  text-decoration: none;
}

.error-message {
  color: red;
  margin-bottom: 10px;
}

/* ====================== */

/* input[type="password"] {
color: transparent;
} */



/*//////////////////////////////////////////////////////////////////
[ FONT ]*/

/* @font-face {
  font-family: Poppins-Regular;
  src: url('../fonts/poppins/Poppins-Regular.ttf'); 
}

@font-face {
  font-family: Poppins-Medium;
  src: url('../fonts/poppins/Poppins-Medium.ttf'); 
}

@font-face {
  font-family: Poppins-Bold;
  src: url('../fonts/poppins/Poppins-Bold.ttf'); 
}

@font-face {
  font-family: Poppins-SemiBold;
  src: url('../fonts/poppins/Poppins-SemiBold.ttf'); 
}
 */
/*//////////////////////////////////////////////////////////////////
[ RESTYLE TAG ]*/

* {
    margin: 0px; 
    padding: 0px; 
    box-sizing: border-box;
}

body, html {
    height: 100%;
    font-family: Poppins-Regular, sans-serif;
}

/*---------------------------------------------*/
a {
    font-family: Poppins-Regular;
    font-size: 14px;
    line-height: 1.7;
    color: #666666;
    margin: 0px;
    transition: all 0.4s;
    -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
}

a:focus {
    outline: none !important;
}

a:hover {
    text-decoration: none;
  color: #57b846;
}

/*---------------------------------------------*/
h1,h2,h3,h4,h5,h6 {
    margin: 0px;
}

p {
    font-family: Poppins-Regular;
    font-size: 14px;
    line-height: 1.7;
    color: #666666;
    margin: 0px;
}

ul, li {
    margin: 0px;
    list-style-type: none;
}


/*---------------------------------------------*/
input {
    outline: none;
    border: none;
}

input[type="number"] {
    -moz-appearance: textfield;
    appearance: none;
    -webkit-appearance: none;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

textarea {
  outline: none;
  border: none;
}

textarea:focus, input:focus {
  border-color: transparent !important;
}

input:focus::-webkit-input-placeholder { color:transparent; }
input:focus:-moz-placeholder { color:transparent; }
input:focus::-moz-placeholder { color:transparent; }
input:focus:-ms-input-placeholder { color:transparent; }

textarea:focus::-webkit-input-placeholder { color:transparent; }
textarea:focus:-moz-placeholder { color:transparent; }
textarea:focus::-moz-placeholder { color:transparent; }
textarea:focus:-ms-input-placeholder { color:transparent; }

input::-webkit-input-placeholder {color: #999999;}
input:-moz-placeholder {color: #999999;}
input::-moz-placeholder {color: #999999;}
input:-ms-input-placeholder {color: #999999;}

textarea::-webkit-input-placeholder {color: #999999;}
textarea:-moz-placeholder {color: #999999;}
textarea::-moz-placeholder {color: #999999;}
textarea:-ms-input-placeholder {color: #999999;}

label {
  display: block;
  margin: 0;
}

/*---------------------------------------------*/
button {
    outline: none !important;
    border: none;
    background: transparent;
}

button:hover {
    cursor: pointer;
}

iframe {
    border: none !important;
}


/*//////////////////////////////////////////////////////////////////
[ Utility ]*/
.txt1 {
  font-family: Poppins-Regular;
  font-size: 13px;
  line-height: 1.4;
  color: #999999;
}

/*//////////////////////////////////////////////////////////////////
[ login ]*/

.limiter {
  width: 100%;
  margin: 0 auto;
}

.container-login100 {
  width: 100%;  
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: #343957 ;
}


.wrap-login100 {
  width: 670px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

/*==================================================================
[ Title form ]*/
.login100-form-title {
  width: 100%;
  position: relative;
  z-index: 1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  padding: 70px 15px 74px 15px;
}

.login100-form-title-1 {
  font-family: Poppins-Bold;
  font-size: 30px;
  color: #fff;
  text-transform: uppercase;
  line-height: 1.2;
  text-align: center;
}

.login100-form-title::before {
  content: "";
  display: block;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(54,84,99,0.7);
}


/*==================================================================
[ Form ]*/

.login100-form {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 43px 88px 93px 190px;
}


/*------------------------------------------------------------------
[ Input ]*/

.wrap-input100 {
  width: 100%;
  position: relative;
  border-bottom: 1px solid #b2b2b2;
}

.label-input100 {
  font-family: Poppins-Regular;
  font-size: 15px;
  color: #808080;
  line-height: 1.2;
  text-align: right;

  position: absolute;
  top: 14px;
  left: -105px;
  width: 80px;

}

/*---------------------------------------------*/
.input100 {
  font-family: Poppins-Regular;
  font-size: 15px;
  color: #555555;
  line-height: 1.2;

  display: block;
  width: 100%;
  background: transparent;
  padding: 0 5px;
}

.focus-input100 {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.focus-input100::before {
  content: "";
  display: block;
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 0;
  height: 1px;

  -webkit-transition: all 0.6s;
  -o-transition: all 0.6s;
  -moz-transition: all 0.6s;
  transition: all 0.6s;

  background: #57b846;
}


/*---------------------------------------------*/
input.input100 {
  height: 45px;
}


.input100:focus + .focus-input100::before {
  width: 100%;
}

.has-val.input100 + .focus-input100::before {
  width: 100%;
}

/*==================================================================
[ Restyle Checkbox ]*/

.input-checkbox100 {
  display: none;
}

.label-checkbox100 {
  font-family: Poppins-Regular;
  font-size: 13px;
  color: #999999;
  line-height: 1.4;

  display: block;
  position: relative;
  padding-left: 26px;
  cursor: pointer;
}

.label-checkbox100::before {
  content: "\f00c";
  font-family: FontAwesome;
  font-size: 13px;
  color: transparent;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 2px;
  background: #fff;
  border: 1px solid #e6e6e6;
  left: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
}

.input-checkbox100:checked + .label-checkbox100::before {
  color: #57b846;
}

/*------------------------------------------------------------------
[ Button ]*/
.container-login100-form-btn {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
}

.login100-form-btn {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  min-width: 160px;
  height: 50px;
  background-color: #57b846;
  border-radius: 25px;

  font-family: Poppins-Regular;
  font-size: 16px;
  color: #fff;
  line-height: 1.2;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}

.login100-form-btn:hover {
  background-color: #333333;
}


/*------------------------------------------------------------------
[ Responsive ]*/

@media (max-width: 576px) {
  .login100-form {
    padding: 43px 15px 57px 117px;
  }
}

@media (max-width: 480px) {
  .login100-form {
    padding: 43px 15px 57px 15px;
  }

  .label-input100 {
    text-align: left;
    position: unset;
    top: unset;
    left: unset;
    width: 100%;
    padding: 0 5px;
  }
}


/*------------------------------------------------------------------
[ Alert validate ]*/

.validate-input {
  position: relative;
}

.alert-validate::before {
  content: attr(data-validate);
  position: absolute;
  max-width: 70%;
  background-color: #fff;
  border: 1px solid #c80000;
  border-radius: 2px;
  padding: 4px 25px 4px 10px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 2px;
  pointer-events: none;

  font-family: Poppins-Medium;
  color: #c80000;
  font-size: 13px;
  line-height: 1.4;
  text-align: left;

  visibility: hidden;
  opacity: 0;

  -webkit-transition: opacity 0.4s;
  -o-transition: opacity 0.4s;
  -moz-transition: opacity 0.4s;
  transition: opacity 0.4s;
}

.alert-validate::after {
  content: "\f06a";
  font-family: FontAwesome;
  display: block;
  position: absolute;
  color: #c80000;
  font-size: 15px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 8px;
}

.alert-validate:hover:before {
  visibility: visible;
  opacity: 1;
}

@media (max-width: 992px) {
  .alert-validate::before {
    visibility: visible;
    opacity: 1;
  }
}


.input-group-text {
  width: 40px;
}

.login__btn {
  background-color: #343957 !important;
  color: white;
}

.login__btn:hover {
  background-color: rgb(12, 126, 12) !important;
  color: white;
}


 `}</style>
      {/* <div className="container-fluid d-flex flex-column justify-content-end align-items-center vh-100">
        <div className="row justify-content-end">
          <div className="col-md-5 pt-3 ms-2 me-xxl-5 ps-xxl-4 ">
            <h1>Sign Up</h1>

            <p className="mb-5">
              Sign Up yourself to access all dashboard to help you manage
              everything
            </p>

            <form onSubmit={handleSubmit}>
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  aria-label="Name"
                  aria-describedby="basic-addon1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ fontFamily: "Segoe UI, sans-serif" }}
                />
              </div>
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ fontFamily: "Segoe UI, sans-serif" }}
                />
              </div>
              <div className="input-group mb-2">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="+62"
                  aria-label="PhoneNumber"
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                    setPhoneNumber(numericValue);
                  }}
                  required
                  style={{ fontFamily: "Segoe UI, sans-serif" }}
                />
              </div>
              <div className="input-group mb-2">
                <input
                  type={passwordInputType}
                  className="form-control"
                  placeholder="Password"
                  aria-label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ fontFamily: "Segoe UI, sans-serif" }}
                />
                <span
                  className="input-group-text"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon
                    icon={passwordVisible ? faEye : faEyeSlash}
                  />
                </span>
              </div>

              {showError && (
                <Button
                  variant="danger"
                  className="error-button d-flex justify-content-center error-message fade-out align-items-center"
                  onClick={() => setError("")}
                  style={{
                    fontSize: "13px",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  {error}
                </Button>
              )}

              <div className="d-grid gap-2 mt-4">
                <button className="register__btn btn lg sign-up" type="submit">
                  Register
                </button>
              </div>
            </form>

            <Modal
              show={showModal}
              centered
              className="d-flex align-items-center justify-content-center"
            >
              <Modal.Body style={{ width: "200px" }} className="text-center">
                <img
                  src="/loading-regis.gif"
                  alt="loading"
                  style={{ width: "100%" }}
                />
                <p>Please Wait...</p>
              </Modal.Body>
            </Modal>

            <p className="mt-5 mb-1 text-center">Already have an account?</p>
            <p className="fw-bold text-center">
              <Link to={"/lgn-adm"}>SIGN IN</Link>
            </p>
          </div>

          <div className="col-md-6 d-flex justify-content-end">
            <img
              src="assets/images/Group 11.png"
              alt="background"
              className="img-fluid"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div> */}

      {/* Login 2 */}
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div
              className="login100-form-title"
              style={{ backgroundImage: 'url("./bg-01.jpg")' }}
            >
              <span className="login100-form-title-1">Sign Up</span>
            </div>

            <form
              className="login100-form validate-form"
              onSubmit={handleSubmit}
            >
              {/* Email Input */}
              <div
                className="wrap-input100 validate-input m-b-26"
                data-validate="Name is required"
              >
                <span className="label-input100">Name</span>
                <input
                  className="input100"
                  type="name"
                  name="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <span className="focus-input100"></span>
              </div>
              <div
                className="wrap-input100 validate-input m-b-26"
                data-validate="Email is required"
              >
                <span className="label-input100">Email</span>
                <input
                  className="input100"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span className="focus-input100"></span>
              </div>

              <div
                className="wrap-input100 validate-input m-b-26"
                data-validate="Phone Number is required"
              >
                <span className="label-input100">Phone Number</span>
                <input
                  className="input100"
                  type="number"
                  name="phone Number"
                  placeholder="+62"
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                    setPhoneNumber(numericValue);
                  }}
                  required
                />
                <span className="focus-input100"></span>
              </div>

              {/* Password Input */}

              <div
                className="wrap-input100 validate-input m-b-18"
                data-validate="Password is required"
              >
                <span className="label-input100">Password </span>
                <input
                  className="input100"
                  type={passwordInputType}
                  name="password"
                  placeholder="Enter password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />

                <span className="focus-input100"></span>
              </div>
              {/* <span
                className="input-group-text"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
              </span> */}

              <div>
                {/* Login Button */}
                <div className="d-grid gap-2 mt-5">
                  <button
                    className="login__btn btn lg sign-up fw-bold"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Masuk"}
                  </button>
                </div>

                {/* Registration Link */}

                <p className="mt-3 mb-1 text-center">
                  Already have an account?
                </p>
                <p className="fw-bold text-center">
                  <Link to={"/lgn-adm"}>SIGN IN</Link>
                </p>
              </div>

              <div className="flex-sb-m w-full p-b-30">
                <div>
                  <Link className="txt1" to={"/forget-password"}>
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </form>

            {showError && (
              <div className="error-button d-flex justify-content-center error-message fade-out align-items-center">
                <Button
                  className=""
                  onClick={() => setError("")}
                  style={{
                    width: "auto",
                    fontSize: "13px",
                    textAlign: "center",
                    marginTop: "-50px",
                    marginBottom: "10px",
                    backgroundColor: "red",
                  }}
                >
                  {error}
                </Button>
              </div>
            )}

            <Modal
              show={showModal}
              centered
              className="d-flex align-items-center justify-content-center"
            >
              <Modal.Body style={{ width: "200px" }} className="text-center">
                <img
                  src="/loading-regis.gif"
                  alt="loading"
                  style={{ width: "100%" }}
                />
                <p>Please Wait...</p>
              </Modal.Body>
            </Modal>

            {/* Error Message */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenseRegister;
