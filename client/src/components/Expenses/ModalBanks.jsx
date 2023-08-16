import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
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

    // Get the invitation_id from the URL
    const pathnameParts = location.pathname.split("/"); // Separate parts of the pathname
    const invitation_id = pathnameParts[pathnameParts.length - 1]; // Get the last part of the pathname as invitation_id

    // Append the invitation_id to the formData
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
