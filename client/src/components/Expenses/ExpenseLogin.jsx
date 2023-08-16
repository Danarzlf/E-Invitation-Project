import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ExpenseLogin.css";
import { Link, useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import Cookies from "js-cookie"; // Import js-cookie package

const ExpenseLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state variable for loading
  const [showError, setShowError] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    let timer;
    if (error) {
      setShowError(true);
      timer = setTimeout(() => {
        setError("");
        setShowError(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        {
          email,
          password,
        }
      );

      // Simpan token di dalam cookie menggunakan js-cookie
      Cookies.set("token", response.data.data.token);

      navigateTo("/dashboard");
    } catch (error) {
      setError("Invalid email or password");
    }

    setIsLoading(false); // Stop loading
  };

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
                placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-addon1"
                required
                value={email}
                onChange={handleEmailChange}
                style={{ fontFamily: "Segoe UI, sans-serif" }}
              />
            </div>
            <div className="input-group mb-2">
              <input
                type={passwordVisible ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                aria-label="Password"
                required
                value={password}
                onChange={handlePasswordChange}
                style={{ fontFamily: "Segoe UI, sans-serif" }}
              />
              <span
                className="input-group-text"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
              </span>
            </div>
            {error && (
              <Button
                variant="danger"
                className="error-button d-flex justify-content-center error-message fade-out align-items-center"
                onClick={() => setError("")}
                style={{
                  width: "200px",
                  fontSize: "13px",
                  textAlign: "center",
                }}
              >
                {error}
              </Button>
            )}

            <div className="d-grid gap-2 mt-5">
              <button
                className="login__btn btn lg sign-up fw-bold"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Masuk"}
              </button>
            </div>
          </form>
          <p className="mt-5 mb-1 text-center"> Don't have an account?</p>
          <p className="fw-bold text-center">
            <Link to={"/rgs-adm"}>REGISTER HERE</Link>
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

export default ExpenseLogin;
