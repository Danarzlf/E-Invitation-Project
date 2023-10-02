import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, Image, Dropdown, Navbar } from "react-bootstrap";
import FooterAdmin from "../Expenses/FooterAdmin";
import ModalInvitation from "../Expenses/ModalInvitation";
import DataDashboard from "../Expenses/DataDashboard";
import Cookies from "js-cookie"; // Import js-cookie package
import axios from "axios"; // Import axios

import "./Dashboard.css";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [invitationsData, setInvitationsData] = useState([]); // State to store the invitations data

  const navigate = useNavigate();

  useEffect(() => {
    // Cek apakah token ada di cookie
    const token = Cookies.get("token");
    if (!token) {
      // Jika tidak ada token, arahkan pengguna ke halaman /who
      navigate("/who");
    } else {
      // If token exists, fetch the invitations data
      fetchInvitationsData(token);
      // Set a timer to clear the token after 15 minutes of inactivity
      const tokenTimeout = setTimeout(() => {
        Cookies.remove("token");
        // Additional actions if needed, like redirecting to login page
        window.location.href = "/lgn-adm";
      }, 15 * 60 * 1000); // 15 minutes in milliseconds
      // Return a cleanup function to clear the timer if the component is unmounted
      return () => clearTimeout(tokenTimeout);
    }
  }, []);

  const fetchInvitationsData = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/invitation",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const invitationsData = response.data.data.invitations;
      setInvitationsData(invitationsData);

      console.log("ini datanya", invitationsData);
    } catch (error) {
      console.error("Error fetching invitations data:", error);
      // If there's an error or the token is invalid, navigate to the /who page
      navigate("/who");
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const logoutHandler = () => {
    // Menampilkan modal konfirmasi saat logout
    setShowConfirmationModal(true);
  };

  const cancelLogoutHandler = () => {
    // Menutup modal konfirmasi tanpa melakukan logout
    setShowConfirmationModal(false);
  };

  const confirmLogoutHandler = () => {
    // Hapus token dari cookie dengan js-cookie
    Cookies.remove("token");

    // Lakukan tindakan lain yang diperlukan setelah logout, seperti mengarahkan pengguna ke halaman login
    window.location.href = "/lgn-adm";
  };

  return (
    <>
      <div>
        <div className="d-flex">
          <div className="text-center side-bar-admin col-2 bg-body-tertiary shadow">
            <Image
              className="side-bar-admin__logo p-4"
              src="/narrgather123.png"
            />
            <div className="mt-3 sd-bar">
              <div
                className="side-bar-admin__list side-bar-admin__selected d-flex align-items-center py-3 px-4 mb-1"
                style={{ cursor: "pointer" }} // Set the cursor to indicate it's clickable
              >
                <h5 style={{ marginRight: "150px" }} className="ms-2 mb-0">
                  Dashboard
                </h5>
                <Image
                  className="side-bar-admin__icon_add"
                  src="/add-icon.png"
                  onClick={handleOpenModal} // Add onClick event handler to open the modal
                  style={{
                    filter:
                      "invert(100%) sepia(0%) saturate(0%) hue-rotate(325deg) brightness(104%) contrast(101%)",
                  }}
                />
              </div>

              <input
                className="col-12 col-sm-11 search-desti ms-3 mt-3 mb-2 search-data"
                type="search"
                placeholder="   Cari ..."
                aria-label="Search"
              />
              {invitationsData.map((invitation) => (
                <Link
                  key={invitation.id} // Assuming the invitations have an 'id' property
                  to={`/client/${invitation.id}`} // Assuming you want to link to individual invitation details
                  className="text-decoration-none"
                >
                  <div className="side-bar-admin__list text-dark d-flex align-items-center py-3 px-4 mb-1">
                    <Image
                      className="side-bar-admin__icon"
                      src="sharingan-removebg-preview.png"
                    />
                    <div className="ms-2">
                      <p style={{}} className="mb-0 text-muted sd-family-name">
                        {invitation.familyName}
                      </p>{" "}
                      {/* Include the groom's name */}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="col-10">
            <Navbar.Collapse className="navbar-admin Container d-flex p-4">
              <h4 className="me-auto mb-0">Dashboard</h4>
              <Link to={`/admin-profile`}>
                <Image style={{ width: "30px" }} src="/fi_user_org.svg" />
              </Link>
              <Dropdown>
                <Dropdown.Toggle
                  variant="transparent"
                  id="dropdown-basic"
                  className="border-0"
                  style={{
                    backgroundColor: "#313d8f",
                    marginLeft: "20px",
                    color: "white", // Ubah warna teks dropdown toggle menjadi putih
                  }}
                >
                  {/* <Image src="/fi_user_org.svg" /> */}
                </Dropdown.Toggle>
                <Dropdown.Menu className="btn bg-danger">
                  <Dropdown.Item
                    className="bg-danger text-white text-center"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Collapse>
            <div className="container p-4 mt-4">
              <DataDashboard />
              <div className="d-flex justify-content-end">
                {" "}
                {/* Added the d-flex justify-content-end classes */}
                <Button
                  variant="secondary"
                  onClick={handleOpenModal}
                  style={{
                    marginRight: "10px",
                    marginTop: "60px",
                    backgroundColor: "#313d8f",
                    width: "130px",
                  }}
                >
                  Add
                </Button>
              </div>

              <div className="Card main-admin d-flex flex-wrap mt-4">
                {invitationsData.map((invitation) => (
                  <div
                    key={invitation.id} // Assuming the invitations have an 'id' property
                    className="main-admin__card bg-warning-subtle shadow rounded-3 me-2 mb-4 "
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex p-4 pb-2">
                      <div className="col-8 ms-4">
                        <h4 className="mb-3 ">{invitation.familyName}</h4>
                        {/* <p className="mb-0">{invitation.bride}</p> */}
                        {/* ... (Render other invitation details as needed) ... */}
                      </div>
                    </div>
                    <Link
                      to={`/client/${invitation.id}`}
                      className="text-decoration-none"
                    >
                      <p className="text-det text-center mb-0 py-1">
                        See Details
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center align-items-center ">
                <img
                  style={{ width: "15%", marginTop: "-75px" }}
                  src="./divider-icon.png"
                  alt="Divider Icon"
                />
              </div>
            </div>
            <FooterAdmin />
          </div>
        </div>
      </div>

      <Modal show={showConfirmationModal} onHide={cancelLogoutHandler} centered>
        <Modal.Body style={{ backgroundColor: "#343957" }}>
          <p className="mb-3 text-white">Are you sure you want to logout?</p>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={cancelLogoutHandler}>
              Cancel
            </Button>
            <Button
              className="logout-button"
              onClick={confirmLogoutHandler}
              style={{ backgroundColor: "red", border: "none" }}
            >
              Logout
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <ModalInvitation show={showModal} handleClose={handleCloseModal} />
    </>
  );
};

export default Dashboard;
