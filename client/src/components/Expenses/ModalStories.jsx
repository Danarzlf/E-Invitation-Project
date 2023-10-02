import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ModalStories = ({ show, handleClose }) => {
  const [imageFile, setImageFile] = useState(null);
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [invitationData, setInvitationData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      console.log("Invitation data:", data);
      setInvitationData(data);
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat mengambil data undangan:",
        error.message
      );
      setError("Terjadi kesalahan saat mengambil data undangan.");
    }
  };

  const handleDeleteStory = async (storyId) => {
    try {
      const token = Cookies.get("token");

      const response = await fetch(
        `http://localhost:8000/api/v1/stories/${storyId}`,
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

  const location = useLocation();
  const pathnameParts = location.pathname.split("/");
  const invitation_id = pathnameParts[pathnameParts.length - 1];

  useEffect(() => {
    fetchInvitationData();
  }, [invitation_id, navigate]);

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

      const formData = new FormData();
      formData.append("year", year);
      formData.append("description", description);
      formData.append("invitation_id", invitation_id);
      formData.append("image", imageFile); // Append image to the FormData

      const response = await fetch(
        "http://localhost:8000/api/v1/stories/create-stories",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
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
          {invitationData?.data?.stories.map((story, index) => (
            <div key={index} className="carousel-content">
              <img
                src={story.image}
                style={{
                  maxWidth: "20%", // Gambar tidak akan melebihi lebar wadah
                  height: "auto", // Tinggi gambar disesuaikan agar proporsi terjaga
                }}
              />
              <h1 style={{ color: "black" }}>
                {story.year}{" "}
                <img
                  style={{ width: "20px", cursor: "pointer" }}
                  src="/trash.png"
                  onClick={() => handleDeleteStory(story.id)}
                />
              </h1>
              <p style={{ color: "black" }}>{story.description}</p>
            </div>
          ))}
          {imageFile === null && (
            <p className="text-danger">Pilih gambar terlebih dahulu.</p>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Gambar</Form.Label>
            <Form.Control
              type="file"
              accept=".png, .jpg, .jpeg, .gif"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tahun</Form.Label>
            <Form.Control
              type="number"
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
