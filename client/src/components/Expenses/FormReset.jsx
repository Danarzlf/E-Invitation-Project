import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import "./FormReset.css";

function FormReset() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(""); // Add token state
  const [isSuccess, setIsSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

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

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = searchParams.get("token");
    setToken(tokenFromUrl);
  }, []);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false); // Stop loading
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8000/api/v1/user/reset-password-token",
        {
          password,
          token,
        }
      );
      // Handle successful response
      setIsSuccess(true);
    } catch (error) {
      setError("Invalid email or password");
    }

    setIsLoading(false); // Stop loading
  };

  const passwordInputType = passwordVisible ? "text" : "password";

  const handleModalClose = () => {
    setIsSuccess(false);
  };

  const style = `.error-message {
    color: white;
    margin-top: 7px
    margin-bottom: 10px;
  }
  
  .fade-out {
    animation: fadeOut 3s ease-out;
    animation-fill-mode: forwards;
  }
  
  /* Animasi fade-out */
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }`;
  return (
    <>
      <style>{style}</style>
      <div className="reset-box">
        <Link to="/rgs-adm">
          <img
            className="arrow-left"
            src="/fi_arrow-left.svg"
            alt="arrow left"
          />
        </Link>
        <h1 className="reset fw-bold mb-4 reset-pass">Reset Password</h1>

        <form onSubmit={handleSubmit}>
          <div className="d-flex input-pw mt-4">
            <div>
              <p style={{ marginBottom: "0px" }} className="email-reset">
                Masukkan Password Baru
              </p>
            </div>
          </div>
          <div className="input-group mb-2 mt-1 input-reset">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Masukkan password"
              aria-label="Password"
              className="form-control password"
              value={password}
              onChange={handlePasswordChange}
              required
              style={{ fontFamily: "Poppins" }}
            />
            <span
              className="input-group-text"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
            </span>
          </div>
          {/* Display error message */}
          <div className="d-flex input-pw mt-4">
            <div>
              <p style={{ marginBottom: "0px" }} className="email-reset">
                Ulangi Password Baru
              </p>
            </div>
          </div>
          <div className="input-group mb-2 mt-1 input-reset">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Masukkan password"
              aria-label="Password"
              className="form-control password"
              // value={password}
              // onChange={(e) => e.preventDefault}
              required
              style={{ fontFamily: "Poppins" }}
            />
            <span
              className="input-group-text"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
            </span>
          </div>
          {/* {error && <p className="error-message">{error}</p>}{" "} */}
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
          <div className="d-grid gap-2 mt-4 d-flex justify-content-center mb-4">
            <button
              className="reset__btn lg sign-up rounded-4 py-2"
              type="submit"
            >
              Simpan
            </button>
          </div>
        </form>

        <Modal
          show={isSuccess}
          onHide={handleModalClose}
          style={{ marginTop: "160px" }}
        >
          <Modal.Body className="text-center">
            <img src="/correct.png" alt="correct" style={{ width: "50%" }} />
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>Successful</p>
            <p>Click OK to login.</p>
            <Button
              style={{
                width: "120px",
                backgroundColor: "white",
                color: "black",
                fontWeight: "bold",
                border: "none",
              }}
              className="float-end"
              as={Link}
              to="/lgn-adm"
            >
              OK
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default FormReset;
