import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import Cookies from "js-cookie";

const ModalStories = ({ show, handleClose }) => {
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Menggunakan useLocation untuk mendapatkan nilai invitation_id dari query string
  const location = useLocation();
  const pathnameParts = location.pathname.split("/"); // Pisahkan bagian dari pathname
  const invitation_id = pathnameParts[pathnameParts.length - 1]; // Ambil bagian terakhir dari pathname sebagai invitation_id
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const token = Cookies.get("token");
      if (!token) {
        navigate("/who");
        return;
      }

      const response = await fetch(
        "http://localhost:8000/api/v1/stories/create-stories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            year,
            description,
            invitation_id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Terjadi kesalahan saat membuat pemesanan.");
      }

      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Terjadi kesalahan saat membuat pemesanan:", error.message);
      setError("Terjadi kesalahan saat membuat pemesanan.");
    }

    setIsLoading(false);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Stories</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tahun</Form.Label>
            <Form.Control
              type="text"
              placeholder="2011"
              autoFocus
              required
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Deskripsi Cinta</Form.Label>
            <Form.Control
              type="text"
              placeholder="2011 saya berkenalan dengan dia"
              autoFocus
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          {error && <p className="text-danger">{error}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalStories;
