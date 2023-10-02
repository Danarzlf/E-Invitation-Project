import React, { useEffect, useState } from "react";
import { Navbar, Image, Button, Dropdown, Modal } from "react-bootstrap";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import FooterAdmin from "../Expenses/FooterAdmin";
import { useParams } from "react-router-dom";
import ModalStories from "../Expenses/ModalStories";
import ModalBanks from "../Expenses/ModalBanks";
import ModalDetail from "../Expenses/ModalDetail";
import DetailPage from "./DetailPage";

import "./ClientList.css";
import axios from "axios"; // Import axios // Import js-cookie package
// import FormModalAdminBookings from "../components/Form/FormModalAdminBookings";

function ClientList() {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [invitationsData, setInvitationsData] = useState([]); // State to store the invitations data
  const [nama, setNama] = useState("");
  const { invitation_id } = useParams();
  const [foryousData, setForyousData] = useState([]);
  const [invitationDetail, setInvitationDetail] = useState([]);
  const [familyName, setFamilyName] = useState("");
  const [urlCouple, setUrlCouple] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedInvitationForYou, setSelectedInvitationForYou] =
    useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalBanks, setShowModalBanks] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [
    showDeleteConfirmationInvitation,
    setShowDeleteConfirmationInvitation,
  ] = useState(false);
  const [selectedNameToDelete, setSelectedNameToDelete] = useState(null); //nyimpen foryou.name buat modal delete

  const navigate = useNavigate();

  const handleOpenModalDetail = () => {
    setShowModalDetail(true);
  };

  const handleCloseModalDetail = () => {
    setShowModalDetail(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleOpenModalBanks = () => {
    setShowModalBanks(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleCloseModalBanks = () => {
    setShowModalBanks(false);
  };

  const handleNamaChange = (event) => {
    setNama(event.target.value);
  };

  const handleDetailClick = (foryou) => {
    setSelectedInvitationForYou(foryou);
  };

  const handleDeleteClick = (foryouId) => {
    setDeleteConfirmationId(foryouId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteClickInvitation = (invitationId) => {
    setDeleteConfirmationId(invitationId);
    setShowDeleteConfirmationInvitation(true);
  };

  const submitNama = async () => {
    try {
      if (nama.trim() === "") {
        setErrorMessage("Isi Nama");
        return;
      }

      // Check if the authentication token exists in the cookie
      const token = Cookies.get("token");
      if (!token) {
        // If there's no token, redirect the user to the login page
        navigate("/who");
        return;
      }

      // Periksa apakah invitationsData tidak kosong sebelum melanjutkan
      if (invitationsData.length === 0) {
        console.error(
          "Tidak ada data undangan ditemukan. Tidak dapat mengirimkan nama."
        );
        return;
      }

      // Periksa apakah invitation_id ada dalam parameter URL
      if (!invitation_id) {
        console.error(
          "Tidak ada invitation_id ditemukan dalam URL. Tidak dapat mengirimkan nama."
        );
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/api/v1/foryous/create-foryous",
        {
          name: nama,
          invitation_id: invitation_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      // Anggap API mengembalikan data yang baru saja dibuat
      const newForyous = response.data.data.newForyous;

      // Anggap invitationsData adalah sebuah array, tambahkan data baru ke dalamnya
      setInvitationsData([...invitationsData, newForyous]);

      // Bersihkan nilai input setelah pengiriman berhasil
      setNama("");

      // Refresh the page after submission to update the data
      window.location.reload();
    } catch (error) {
      console.error("Error saat mengirimkan data:", error);
    }
  };
  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/who?");
    } else {
      fetchInvitationsData(token);
      fetchForyousData(token);
      const tokenTimeout = setTimeout(() => {
        Cookies.remove("token");
        // Additional actions if needed, like redirecting to login page
        window.location.href = "/lgn-adm";
      }, 15 * 60 * 1000); // 15 minutes in milliseconds
      // Return a cleanup function to clear the timer if the component is unmounted
      return () => clearTimeout(tokenTimeout);
    }
  }, [invitation_id]);

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
    } catch (error) {
      console.error("Error fetching invitations data:", error);
      // If there's an error or the token is invalid, navigate to the /who page
      navigate("/who?");
    }
  };

  const fetchForyousData = async (token) => {
    try {
      if (!invitation_id) {
        console.error(
          "Tidak ada invitation_id ditemukan dalam URL. Tidak dapat mengambil data foryous."
        );
        return;
      }

      const response = await axios.get(
        `http://localhost:8000/api/v1/invitation/${invitation_id}`,
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        }
      );

      const foryousData = response.data.data.foryous;
      const invitationDetail = response.data.data;
      console.log("Foryous data fetched:", foryousData);
      console.log("data inv fetched:", invitationDetail);
      setForyousData(foryousData);
      setInvitationDetail(invitationDetail);

      // Update the family name dynamically based on the fetched familyName
      setFamilyName(response.data.data.familyName);
      setUrlCouple(response.data.data.urlCouple); //ganti
    } catch (error) {
      console.error("Error fetching foryous data:", error);
    }
  };

  const handleConfirmDeleteInvitation = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        navigate("/who");
        return;
      }

      const response = await axios.delete(
        `http://localhost:8000/api/v1/invitation/${invitation_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 204) {
        // Remove the deleted invitation from invitationsData state
        const updatedInvitations = invitationsData.filter(
          (invitation) => invitation.id !== invitation_id
        );

        setInvitationsData(updatedInvitations);
      } else {
        console.error("Failed to delete invitation.");
      }
    } catch (error) {
      console.error("Error deleting invitation:", error);
    }

    // Close the delete confirmation modal
    setShowDeleteConfirmationInvitation(false);
    window.location.href = "/dashboard"; // Navigate and refresh
  };

  const handleConfirmDelete = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        navigate("/who");
        return;
      }

      const response = await axios.delete(
        `http://localhost:8000/api/v1/foryous/${deleteConfirmationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 204) {
        // Remove the deleted invitation from foryousData state
        const updatedForyous = foryousData.filter(
          (foryou) => foryou.id !== deleteConfirmationId
        );

        setForyousData(updatedForyous);
        // Refresh the page
      } else {
        console.error("Failed to delete invitation.");
      }
    } catch (error) {
      console.error("Error deleting invitation:", error);
    }

    // Close the delete confirmation modal
    setShowDeleteConfirmation(false);
    refreshPage();
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);

      return () => clearTimeout(timer); // Membersihkan timer jika komponen unmount sebelum timer selesai
    }
  }, [errorMessage]);

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
            <div className="mt-3">
              <Link to="/dashboard" style={{ textDecoration: "none" }}>
                <div
                  className="side-bar-admin_list side-bar-admin_selected d-flex align-items-center py-3 px-4 mb-1"
                  style={{ cursor: "pointer" }}
                >
                  <h5
                    style={{ marginRight: "150px", color: "white" }}
                    className="ms-2 mb-0"
                  >
                    Dashboard
                  </h5>
                </div>
              </Link>

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
                      src="/sharingan-removebg-preview.png"
                    />
                    <div className="ms-2">
                      <p style={{}} className="mb-0 text-muted">
                        {invitation.familyName}
                      </p>{" "}
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
                ></Dropdown.Toggle>
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

            <div className="container p-4">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item active" aria-current="page">
                    <Link
                      to="/dashboard"
                      className="text-decoration-none text-dark fw-bold d-flex align-items-center"
                    >
                      <Image
                        className="side-bar-admin__icon me-2"
                        src="/dashboard-icon.svg"
                      />
                      Dashboard
                    </Link>
                  </li>
                  <li
                    style={{ marginTop: "3px", marginLeft: "6px" }}
                    aria-current="page"
                  >
                    / Client
                  </li>
                </ol>
              </nav>

              <div>
                <h1 className="mb-4 text-center">
                  {familyName}{" "}
                  <img
                    className="side-bar-admin__icon  me-1"
                    src="/dtl-icon.png"
                    onClick={handleOpenModalDetail} // Add onClick event handler to open the modal
                    style={{ width: "30px", height: "30px", cursor: "pointer" }}
                  />
                  <img
                    style={{ width: "20px", cursor: "pointer" }}
                    src="/trash.png"
                    onClick={() => handleDeleteClickInvitation(invitation_id)}
                  />
                </h1>
                <div className="d-flex justify-content-end">
                  <input
                    placeholder="   Masukkan Nama"
                    value={nama}
                    onChange={handleNamaChange}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        //agar bisa diklik enter (ga make form jadinya gini)
                        e.preventDefault();
                        submitNama();
                      }
                    }}
                  />
                  <Button
                    className="btn-add-invitees"
                    variant="secondary"
                    onClick={submitNama}
                  >
                    Add
                  </Button>
                </div>
                {errorMessage && (
                  <div
                    style={{
                      position: "absolute", //setelah muncul posisi yang lain tidak terpengaruh (bergerak)
                      marginLeft: "1100px",
                      marginTop: "10px",
                    }}
                  >
                    <span className="error-message text-danger">
                      {errorMessage}
                    </span>
                  </div>
                )}

                <br />

                {/* <div className="d-flex align-items-center mdl-stories">
                  <Link to="/detail-page">
                    <button
                      className="mb-0 me-2 fw-bold"
                      onClick={fetchForyousData}
                    >
                      Fetch Data
                    </button>
                  </Link>
                </div> */}

                <div className="d-flex align-items-center mdl-stories">
                  <p className="mb-0 me-2 fw-bold">Stories</p>
                  <Image
                    className="side-bar-admin__icon"
                    src="/storiess.png"
                    onClick={handleOpenModal} // Add onClick event handler to open the modal
                    style={{
                      cursor: "pointer",
                      width: "50px",
                      height: "50px",
                      // filter:
                      //   "invert(100%) sepia(0%) saturate(0%) hue-rotate(325deg) brightness(104%) contrast(101%)",
                    }}
                  />
                </div>

                <div className="d-flex align-items-center mb-5">
                  <p className="mb-0 me-2 fw-bold">Banks</p>
                  <Image
                    className="side-bar-admin__icon  mt-2"
                    src="/gft.png"
                    onClick={handleOpenModalBanks} // Add onClick event handler to open the modal
                    style={{
                      cursor: "pointer",
                      width: "50px",
                      height: "50px",
                      marginLeft: "6px",
                    }}
                  />
                </div>

                <h4 className="mb-4">List Nama Tujuan </h4>

                <table className="table table-striped-columns text-center">
                  <thead>
                    <tr>
                      <th style={{ width: "50px" }}>No</th>
                      <th>Name</th>
                      <th>ID</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {foryousData.map((foryou, index) => (
                      <tr key={foryou.id}>
                        <td>{index + 1}</td>
                        <td>{foryou.name}</td>
                        <td>{foryou.id}</td>

                        <td>
                          <Button
                            className="red-button"
                            onClick={() => {
                              setSelectedNameToDelete(foryou.name); // Simpan nama yang sesuai dalam state
                              handleDeleteClick(foryou.id); // Panggil fungsi handleDeleteClick dengan ID yang sesuai
                            }}
                          >
                            Delete
                          </Button>

                          <Link
                            to={{
                              pathname: `/wedding/${encodeURIComponent(
                                urlCouple
                              )}/`,
                              search: `?to=${encodeURIComponent(foryou.name)}`,
                            }}
                            target="_blank"
                          >
                            <Button className="detail-button">Detail</Button>
                          </Link>

                          {/* <Button className="detail-button">
                            <a
                              target="blank"
                              href={`/wedding?name=${encodeURIComponent(
                                foryou.name
                              )}`}
                            >
                              See
                            </a>
                          </Button>
                          */}
                          <Button className="copy-txt">Copy Link</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <FooterAdmin />
          </div>
        </div>
      </div>
      <Modal
        className="modal-logout"
        show={showConfirmationModal}
        onHide={cancelLogoutHandler}
        centered
        // style={{ backgroundColor: "#343957" }} // Menambahkan properti style
      >
        <Modal.Body
          className="body-modal-logout"
          style={{ backgroundColor: "#343957" }}
        >
          <p className="mb-3 text-white">Are you sure you want to logout?</p>
          {/* <div className="d-flex justify-content-center">
            <img
              className=""
              style={{ width: "15%", margin: "0 auto" }}
              src="/lg-out.png"
              alt="Logout"
            />
          </div> */}
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

      <Modal
        style={{
          marginTop: "280px",
          textAlign: "center",
        }}
        show={showDeleteConfirmation}
        onHide={() => setShowDeleteConfirmation(false)}
      >
        <Modal.Body
          style={{
            backgroundColor: "#343957",
          }}
        >
          <p className="text-white">
            Are you sure you want to delete this invitee? <br />
            <p className="fw-bold text-white fs-5">{selectedNameToDelete}</p>
          </p>
          <br />
          <Button
            className="cancel-button"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            Cancel
          </Button>

          <Button className="red-button" onClick={() => handleConfirmDelete()}>
            Delete
          </Button>
        </Modal.Body>
      </Modal>

      <Modal
        style={{
          marginTop: "280px",
          textAlign: "center",
        }}
        show={showDeleteConfirmationInvitation}
        onHide={() => setShowDeleteConfirmationInvitation(false)}
      >
        <Modal.Body
          style={{
            backgroundColor: "#343957",
          }}
        >
          <p className="text-white ">
            Are you sure you want to delete the invitation for <br />
            <strong className="fs-4">{familyName}</strong>?
          </p>
          <br />
          <Button
            className="cancel-button"
            onClick={() => setShowDeleteConfirmationInvitation(false)}
          >
            Cancel
          </Button>

          <Button
            className="red-button"
            onClick={() => handleConfirmDeleteInvitation()}
          >
            Delete Invitation
          </Button>
        </Modal.Body>
      </Modal>

      <ModalStories show={showModal} handleClose={handleCloseModal} />
      <ModalBanks show={showModalBanks} handleClose={handleCloseModalBanks} />
      <ModalDetail
        show={showModalDetail}
        handleClose={handleCloseModalDetail}
      />
    </>
  );
}

export default ClientList;
