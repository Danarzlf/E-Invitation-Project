import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const ModalBanks = ({ show, handleClose }) => {
  const [enteredNameBank, setEnteredNameBank] = useState("");
  const [enteredBankOwner, setEnteredBankOwner] = useState("");
  const [enteredNoRek, setEnteredNoRek] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [invitationData, setInvitationData] = useState({});

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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Terjadi kesalahan saat mengambil data undangan.");
      }

      const data = await response.json();
      setInvitationData(data);
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat mengambil data undangan:",
        error.message
      );
      setError("Terjadi kesalahan saat mengambil data undangan.");
    }
  };

  const handleDeleteStory = async (bankId) => {
    try {
      const token = Cookies.get("token");

      const response = await fetch(
        `http://localhost:8000/api/v1/banks/${bankId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Terjadi kesalahan saat menghapus kisah.");
      }

      // Refresh data after successful deletion
      fetchInvitationData();
    } catch (error) {
      console.error("Terjadi kesalahan saat menghapus kisah:", error.message);
      setError("Terjadi kesalahan saat menghapus kisah.");
    }
  };

  useEffect(() => {
    fetchInvitationData();
  }, [invitation_id, navigate]);

  const nameBankChangeHandler = (event) => {
    setEnteredNameBank(event.target.value);
  };

  const bankOwnerChangeHandler = (event) => {
    setEnteredBankOwner(event.target.value);
  };

  const noRekChangeHandler = (event) => {
    setEnteredNoRek(event.target.value);
  };

  const fileChangeHandler = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (
      enteredNameBank.trim() === "" ||
      enteredBankOwner.trim() === "" ||
      enteredNoRek.trim() === "" ||
      selectedFile === null
    ) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("nameBank", enteredNameBank);
    formData.append("bankOwner", enteredBankOwner);
    formData.append("noRek", enteredNoRek);
    formData.append("image", selectedFile);
    formData.append("invitation_id", invitation_id);

    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(
        "http://localhost:8000/api/v1/banks/create-banks",
        formData,
        { headers }
      );

      if (response.status === 201 || response.status === 200) {
        console.log("Bank creation successful:", response.data);
        setEnteredNameBank("");
        setEnteredBankOwner("");
        setEnteredNoRek("");
        setSelectedFile(null);
        setPreviewImage(null);
        window.location.href = "/dashboard";
      } else {
        console.error(
          "Bank creation failed. Server response:",
          response.status,
          response.data
        );
      }
    } catch (error) {
      console.error("An error occurred during bank creation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Banks</Modal.Title>
      </Modal.Header>
      <Form onSubmit={submitHandler}>
        <Modal.Body>
          <div className="banks-container">
            {invitationData?.data?.banks.map((bank, index) => (
              <div className="bank-card" key={index}>
                <img
                  style={{ width: "55%", marginTop: "20px" }}
                  src={bank.imageQR}
                  alt={`Bank QR Code for ${bank.nameBank}`}
                />
                <img
                  style={{ width: "20px", cursor: "pointer" }}
                  src="/trash.png"
                  onClick={() => handleDeleteStory(bank.id)}
                />
                <h4 className="mt-5">{bank.nameBank}</h4>
                <p>{bank.noRek}</p>
                <p>{bank.bankOwner}</p>
              </div>
            ))}
          </div>
          <Form.Group controlId="nameBank">
            <Form.Label>Name Bank</Form.Label>
            <Form.Control
              type="text"
              value={enteredNameBank}
              onChange={nameBankChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId="bankOwner">
            <Form.Label>Bank Owner</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter bank owner"
              value={enteredBankOwner}
              onChange={bankOwnerChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId="noRek">
            <Form.Label>Account Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter account number"
              value={enteredNoRek}
              onChange={noRekChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId="file">
            <Form.Label>Upload QR Image</Form.Label>
            <Form.Control type="file" onChange={fileChangeHandler} />
            {previewImage && (
              <img src={previewImage} alt="Preview" className="image-preview" />
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
          <Button type="submit" variant="primary">
            Create Bank
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalBanks;
