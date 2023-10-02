import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie package

const ModalDetail = ({ show, handleClose }) => {
  const [invitationData, setInvitationData] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Get the invitation_id from the URL
  const pathnameParts = location.pathname.split("/");
  const invitation_id = pathnameParts[pathnameParts.length - 1];

  // Define the fetchInvitationData function
  const fetchInvitationData = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        navigate("/who");
        return;
      }

      const response = await fetch(
        `http://localhost:8000/api/v1/invitation/${invitation_id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Terjadi kesalahan saat mengambil data undangan.");
      }

      const data = await response.json();
      setInvitationData(data);

      console.log("Data undangan berhasil diambil:", data);
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat mengambil data undangan:",
        error.message
      );
      setError("Terjadi kesalahan saat mengambil data undangan.");
    }
  };

  useEffect(() => {
    if (show) {
      fetchInvitationData();
    }
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Detail Invitation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p>Groom: {invitationData?.data?.groom}</p>
          <p>Bride: {invitationData?.data?.bride}</p>
          <p>Date: {invitationData?.data?.date}</p>
          <p>Day: {invitationData?.data?.day}</p>
          <p>Place: {invitationData?.data?.place}</p>
          <p>Address: {invitationData?.data?.address}</p>
          <p>Family Name: {invitationData?.data?.familyName}</p>
          <p>Family Name 2: {invitationData?.data?.familyName2}</p>
          <p>
            For You:{" "}
            {invitationData?.data?.foryous?.map((item) => item.name).join(", ")}
          </p>
          <p>Groom Dad: {invitationData?.data?.groomDad}</p>
          <p>Groom Mom: {invitationData?.data?.groomMom}</p>
          <p>Groom Sosmed 1: {invitationData?.data?.groomSosmed1}</p>
          <p>Groom Sosmed 2: {invitationData?.data?.groomSosmed2}</p>
          <p>Groom Sosmed 3: {invitationData?.data?.groomSosmed3}</p>
          <p>Bride Dad: {invitationData?.data?.brideDad}</p>
          <p>Bride Mom: {invitationData?.data?.brideMom}</p>
          <p>Bride Sosmed 1: {invitationData?.data?.brideSosmed1}</p>
          <p>Bride Sosmed 2: {invitationData?.data?.brideSosmed2}</p>
          <p>Bride Sosmed 3: {invitationData?.data?.brideSosmed3}</p>
          <p>Created At: {invitationData?.data?.createdAt}</p>
          <p>Time: {invitationData?.data?.time}</p>
          <p>Updated At: {invitationData?.data?.updatedAt}</p>
          <p>URL Couple: {invitationData?.data?.urlCouple}</p>
          <p>User ID: {invitationData?.data?.user_id}</p>
          <p>Quotes: {invitationData?.data?.quotes}</p>
          <p>Link Map: {invitationData?.data?.linkMap}</p>
          <p>No Template: {invitationData?.data?.noTemplate}</p>
          <div>
            Bank :
            {invitationData?.data?.banks.map((bank, index) => (
              <div className="bank-card" key={index}>
                <img
                  style={{ width: "55%", marginTop: "20px" }}
                  src={bank.imageQR}
                  alt={`Bank QR Code for ${bank.nameBank}`}
                />

                <p className="mt-5">{bank.nameBank}</p>
                <p>{bank.noRek}</p>
                <p>{bank.bankOwner}</p>
              </div>
            ))}
          </div>
          <p>
            Image:{" "}
            <img
              src={invitationData?.data?.image}
              style={{ width: "150px" }}
              alt="Invitation Image"
            />
          </p>
          {/* Tambahkan data lainnya sesuai kebutuhan */}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetail;
