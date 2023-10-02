import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

import "./FormForget.css";

function FormForget() {
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/generate-password",
        { email }
      );

      if (response.status === 200) {
        setSuccessMessage("Reset password link has been sent to your email.");
        setShowModal(true);
        setEmail("");
        localStorage.setItem("email", email);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }

    setLoading(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="forget-box">
        <Link to="/rgs-adm">
          <img
            className="arrow-left"
            src="/fi_arrow-left.svg"
            alt="arrow left"
          />
        </Link>
        <h1 className="fw-bold mb-4 forgett-pass">Forget Password</h1>

        <form onSubmit={handleFormSubmit}>
          <div>
            <p className="mb-3 mt-5 email-forgett">Email</p>
          </div>
          <div className="input-group mb-3 input-forgett">
            <input
              type="email"
              className="form-control"
              placeholder="Contoh: johndoe@gmail.com"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ fontFamily: "Poppins", width: "100px" }}
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {/* {successMessage && <p className="success-message">{successMessage}</p>} */}

          <div className="d-grid gap-2 mt-4 d-flex justify-content-center">
            <button
              className="reset__btn lg sign-up rounded-4 border-0 text-center"
              type="submit"
              disabled={isLoading}
            >
              Reset Password
            </button>
          </div>
        </form>
        <p className="form-d mt-5 mb-1 text-center">
          Belum punya akun?{"  "}
          <Link to="/rgs-adm" className="fw-bold register">
            Daftar di sini
          </Link>
        </p>
      </div>

      {/* <Modal show={isLoading} backdrop="static" keyboard={false} centered>
        <Modal.Body className="text-center">
          <p>Mohon tunggu...</p>
        </Modal.Body>
      </Modal> */}

      <Modal
        show={isLoading}
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

      {/* <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{successMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body className="text-center">
          {" "}
          {/* Tambahkan kelas CSS text-center */}
          <p className="mb-0 mt-3 fw-bold" style={{ fontSize: "25px" }}>
            Sent Successfully
          </p>
          <p className="mb-0 mt-2 fw-3" style={{ fontSize: "17px" }}>
            {successMessage}
          </p>
          <div className="d-flex justify-content-end gap-2">
            <Button
              variant="primary mt-3"
              onClick={handleCloseModal}
              style={{
                width: "100px",
                background: "#ffffff",
                color: "#7126b5",
                borderColor: "#ffffff",
                fontWeight: "bold",
              }}
            >
              OK
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FormForget;
