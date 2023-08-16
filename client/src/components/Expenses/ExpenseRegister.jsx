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
    <div className="container-fluid d-flex flex-column justify-content-end align-items-center vh-100">
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
                <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
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
    </div>
  );
};

export default ExpenseRegister;
