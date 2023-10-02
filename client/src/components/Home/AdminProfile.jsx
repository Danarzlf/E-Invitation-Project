import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Image, Button, Container, Form, Modal } from "react-bootstrap";
import Cookies from "js-cookie";

import "./AdminProfile.css";

function AdminProfile() {
  const [user, setUser] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false); // State untuk menampilkan modal update
  const [showWaitModal, setShowWaitModal] = useState(false); // State untuk menampilkan modal harap tunggu
  const [updatedUser, setUpdatedUser] = useState({}); // Set initial value to empty object
  const [showFullImage, setShowFullImage] = useState(false);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Get the token from the cookie
        const token = Cookies.get("token");

        if (!token) {
          // Token not found in cookie, handle the case accordingly
          console.log("Token not found in cookie");
          navigate("/who?");
          return;
        }

        const response = await axios.get("http://localhost:8000/api/v1/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Filter users based on the 'verified' attribute
        const verifiedUsers = response.data.data.users.filter(
          (user) => user.verified === true
        );
        setUsers(verifiedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        // If there's an error or the token is invalid, navigate to the /who page
        navigate("/who?");
      }
    };

    fetchUsers();
  }, [navigate]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        // Get the token from the cookie
        const token = Cookies.get("token");

        if (!token) {
          // Token not found in cookie, handle the case accordingly
          console.log("Token not found in cookie");
          navigate("/who?");
          return;
        }

        const response = await axios.get(
          "http://localhost:8000/api/v1/user/user-info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.data.user);
      } catch (error) {
        // Handle error jika terjadi masalah saat mengambil data pengguna
        console.log("Error:", error);
      }
    };

    getUserData();
  }, [navigate]);

  const saveProfile = async () => {
    try {
      // Get the token from the cookie
      const token = Cookies.get("token");

      if (!token) {
        // Token not found in cookie, handle the case accordingly
        console.log("Token not found in cookie");
        return;
      }

      const formData = new FormData();

      // Add updated user data to FormData
      Object.keys(updatedUser).forEach((key) => {
        formData.append(key, updatedUser[key]);
      });

      setShowWaitModal(true);

      const response = await axios.put(
        "http://localhost:8000/api/v1/user/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set content type as multipart/form-data
          },
        }
      );
      // Handle the response if needed
      console.log(response.data);

      setShowWaitModal(false);
      setShowUpdateModal(true);
    } catch (error) {
      // Handle error if update fails
      console.log("Error:", error);
    }
  };

  const closeModalAndRefresh = () => {
    setShowUpdateModal(false);
    window.location.reload();
  };

  const openFullImage = () => {
    setShowFullImage(true);
  };

  const closeFullImage = () => {
    setShowFullImage(false);
  };

  return (
    <>
      {/* <div className="border-bottom shadow-sm">
        <Container className="akun">
          <div className="d-flex">
            <h4 className="fw-bold"> Akun</h4>
          </div>
          <div className="akun-top d-flex align-items-center mx-2 mb-4">
            <div className="akun-top__alert col-12 text-white d-flex px-3 py-2 mt-2">
              <Link to="/dashboard">
                <Image
                  className="akun-top__arrow-left my-2"
                  src="/fi_arrow-left.svg"
                  alt="arrow left"
                />
              </Link>
              <h5 className="ms-4 pt-2">Beranda</h5>
            </div>
          </div>
        </Container>
      </div>   */}
      <Container>
        <Link to="/dashboard">
          <Image
            className="akun-top__arrow-left my-2"
            src="/fi_arrow-left.svg"
            alt="arrow left"
          />
        </Link>

        <div
          className="filter-akun row mt-4 mx-auto"
          style={{ marginLeft: "120px" }}
        >
          <div className="col-5"></div>
          <div className="col-7">
            <div className="border rounded-1 p-4 mb-4">
              <h4 className="fw-bold">Ubah Data Profil</h4>
              <Form className="mt-4">
                <div
                  className="d-flex align-items-start bg rounded-top-4 py-3 "
                  style={{ background: "#A06ECE" }}
                >
                  <h5 className="me-auto text-white ms-4 mb-0">Data Diri</h5>
                </div>
                <div className="mx-4 mt-3">
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <img
                      src={
                        user && user.image ? user.image : "/user-profile.svg"
                      }
                      alt="Profile"
                      onClick={openFullImage}
                      className="rounded-circle"
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                        cursor: user && user.image ? "pointer" : "auto",
                        ...(user && user.image
                          ? {}
                          : {
                              filter:
                                "invert(66%) sepia(80%) saturate(3432%) hue-rotate(225deg) brightness(86%) contrast(86%)",
                            }),
                      }}
                    />
                  </div>
                  <div
                    className="mx-4 mt-3 pb-3"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div
                      className="border rounded-1 border-0 mb-2 p-2" // Mengubah properti border menjadi border-0
                      style={{
                        width: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "30px",
                        marginTop: "-10px",
                      }}
                    >
                      <label htmlFor="logo-input">
                        <img
                          id="logo-image"
                          className="logo"
                          src="/photochange.png"
                          alt="Logo"
                          style={{
                            width: "25px",
                            height: "25px",
                            cursor: "pointer",
                          }} // Sesuaikan ukuran yang diinginkan
                        />
                        <input
                          id="logo-input"
                          className="account__input col-12 border-0"
                          type="file"
                          accept="image/png, image/jpg, image/jpeg, image/gif"
                          style={{ display: "none" }}
                          onChange={(e) =>
                            setUpdatedUser((prevUser) => ({
                              ...prevUser,
                              image: e.target.files[0],
                            }))
                          }
                        />
                      </label>
                    </div>
                  </div>

                  <p className="fw-bold mb-1" style={{ color: "#4B1979" }}>
                    Nama Lengkap
                  </p>
                  <div className="border rounded-1 border-2 mb-2 p-2">
                    <input
                      className="account__input col-12 border-0"
                      type="text"
                      defaultValue={user ? user.name : ""}
                      onChange={(e) =>
                        setUpdatedUser((prevUser) => ({
                          ...prevUser,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="mx-4 mt-3">
                  <p className="fw-bold mb-1" style={{ color: "#4B1979" }}>
                    Nomor Telepon
                  </p>
                  <div className="border rounded-1 border-2 mb-2 p-2">
                    <input
                      className="account__input col-12 border-0"
                      type="text"
                      defaultValue={user ? user.phoneNumber : ""}
                      onChange={(e) =>
                        setUpdatedUser((prevUser) => ({
                          ...prevUser,
                          phoneNumber: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="mx-4 mt-3 pb-3">
                  <p className="fw-bold mb-1" style={{ color: "#4B1979" }}>
                    Email
                  </p>
                  <div className="border rounded-1 border-2 mb-2 p-2">
                    <input
                      className="account__input col-12 border-0"
                      type="email"
                      defaultValue={user ? user.email : ""}
                      readOnly
                      onChange={(e) =>
                        setUpdatedUser((prevUser) => ({
                          ...prevUser,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <Button
                  className="save-btn-akun offset-5 col-5"
                  onClick={saveProfile}
                >
                  Simpan
                </Button>
              </Form>
            </div>
          </div>
        </div>

        <Modal
          show={showUpdateModal}
          onHide={() => setShowUpdateModal(false)}
          centered
        >
          <Modal.Body className="text-center">
            {" "}
            {/* Tambahkan kelas CSS text-center */}
            <p className="mb-0 mt-3 fw-bold" style={{ fontSize: "17px" }}>
              Update successful
            </p>
            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="primary"
                onClick={() => {
                  setShowUpdateModal(false);
                  window.location.reload(); // Refresh the page after clicking OK on the modal
                }}
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

        <Modal
          show={showWaitModal}
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

        <Modal
          show={user && user.image ? showFullImage : false}
          onHide={closeFullImage}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Modal.Body>
            {user && user.image && (
              <Image
                src={user.image}
                alt="Full Profil"
                className="full-image"
                style={{ maxWidth: "100%", width: "100%" }}
              />
            )}
          </Modal.Body>
          <Modal.Footer style={{ padding: "0px", background: "#7126b5 " }}>
            <Button
              style={{ width: "20%", background: "#e42c64" }}
              variant="secondary"
              onClick={closeFullImage}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <h1 className="text-center">Para Admin</h1>
        {users.map((user, index) => (
          <div key={user.id} className="user-card">
            <div className="user-image">
              <img src={user.image} alt={`Profile of ${user.name}`} />
            </div>
            <div className="user-info">
              <p>{index + 1}</p>

              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Phone Number: {user.phoneNumber}</p>
              {/* Add other user information here */}
            </div>
            <hr />
          </div>
        ))}

        {/* <div className="iframe-container">
          <iframe src="https://instagram.com/dnarzlfian16" allowFullScreen />
        </div> */}
      </Container>
    </>
  );
}

export default AdminProfile;
