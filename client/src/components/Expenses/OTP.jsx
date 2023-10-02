import React, { useState, useEffect } from "react";
import { Container, Navbar, Button, Modal, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
// import back from "/fi_arrow-left.svg";
// import correct from "/correct.png";
import "./OTP.css";

const OTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [resendTimer, setResendTimer] = useState(60); // Timer mundur untuk kirim ulang OTP

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    setEmail(storedEmail);
  }, []);

  useEffect(() => {
    let countdown; // Timer countdown
    if (resendTimer > 0) {
      countdown = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }

    return () => clearTimeout(countdown); // Membersihkan timer saat komponen dibongkar
  }, [resendTimer]);

  const handleChange = (index, event) => {
    const value = event.target.value;
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    // Move to the next input box
    if (value !== "" && event.target.nextSibling) {
      event.target.nextSibling.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text/plain");
    const newOtp = [...otp];

    // Only paste the first 4 characters
    for (let i = 0; i < Math.min(pasteData.length, 6); i++) {
      newOtp[i] = pasteData[i];
    }

    setOtp(newOtp);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = localStorage.getItem("email");
    const otpString = otp.join(""); // Menggabungkan array OTP menjadi string

    try {
      const response = await fetch("http://localhost:8000/api/v1/user/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: otpString }),
      });

      if (!response.ok) {
        throw new Error("OTP verification failed");
      }

      localStorage.removeItem("email"); // Menghapus token dari localStorage
      // Verifikasi OTP berhasil
      setSuccessModalVisible(true);
    } catch (error) {
      // Verifikasi OTP gagal
      setError("Kode OTP salah. Silakan coba lagi.");
    }
  };

  const maskedEmail = email
    ? email.charAt(0) +
      "*".repeat(email.indexOf("@") - 1) +
      email.substring(email.indexOf("@"))
    : "";

  const handleResendOTP = () => {
    setResendTimer(60); // Mengatur timer kembali ke 60 detik saat dikirim ulang OTP
    // Tambahkan logika untuk mengirim ulang OTP ke email di sini
  };

  return (
    <div className="otp-page">
      <Navbar className="fixed-top border-bottom shadow-sm navbar-otp">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img
                className="logo-navbar"
                src="/narrgather123.png"
                alt="logo"
                style={{ width: "100%" }}
              />
            </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div className="otp-box">
        <Link to="/rgs-adm">
          <img
            className="arrow-left"
            src="/fi_arrow-left.svg"
            alt="arrow left"
          />
        </Link>

        <div className="container otp-main-2 mt-4 mt-md-0 ">
          <h1 className="fw-bold">Masukkan OTP</h1>
          <p className="text-center mt-3 mt-sm-5 mb-4">
            Ketik 6 digit kode yang dikirimkan ke{" "}
            <span className="fw-bolder">{maskedEmail}</span>
          </p>
          <form className="text-center" onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center">
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(event) => handleChange(index, event)}
                  onPaste={handlePaste}
                  className="text-center"
                />
              ))}
            </div>
            {error && <p className="text-danger mt-3 mb-3">{error}</p>}
            {resendTimer > 0 ? (
              <p className="mt-3 mb-5">
                Kirim Ulang OTP dalam {resendTimer} detik
              </p>
            ) : (
              <p
                className="mt-3 mb-5"
                onClick={handleResendOTP}
                style={{ cursor: "pointer" }}
              >
                Kirim Ulang OTP
              </p>
            )}
            <Button
              className="otp__btn col-12 rounded-4 border-0 mt-2 mt-sm-5"
              type="submit"
            >
              Simpan
            </Button>
          </form>
        </div>
      </div>
      <Modal show={successModalVisible} centered>
        <Modal.Body className="text-center">
          <img src="/correct.png" alt="correct" style={{ width: "50%" }} />
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            Successful registration
          </p>
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
  );
};

export default OTP;
