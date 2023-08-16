import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie package

const ModalInvitation = ({ show, handleClose }) => {
  const [familyName, setFamilyName] = useState("");
  const [familyName2, setFamilyName2] = useState("");
  const [groomDad, setGroomDad] = useState("");
  const [groomMom, setGroomMom] = useState("");
  const [brideDad, setBrideDad] = useState("");
  const [brideMom, setBrideMom] = useState("");
  const [groom, setGroom] = useState("");
  const [bride, setBride] = useState("");
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [linkMap, setLinkMap] = useState("");
  const [quotes, setQuotes] = useState("");
  const [quoter, setQuoter] = useState("");
  const [groomSosmed1, setGroomSosmed1] = useState("");
  const [groomSosmed2, setGroomSosmed2] = useState("");
  const [groomSosmed3, setGroomSosmed3] = useState("");
  const [brideSosmed1, setBrideSosmed1] = useState("");
  const [brideSosmed2, setBrideSosmed2] = useState("");
  const [brideSosmed3, setBrideSosmed3] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Reset error state
    setIsLoading(true); // Set loading state to true

    try {
      // Check if the authentication token exists in the cookie
      const token = Cookies.get("token");
      if (!token) {
        // If there's no token, redirect the user to the login page
        navigate("/who");
        return;
      }

      // Kirim data pemesanan ke server
      const response = await fetch(
        "http://localhost:8000/api/v1/invitation/create-invitations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
          body: JSON.stringify({
            familyName,
            familyName2,
            groomDad,
            groomMom,
            brideDad,
            brideMom,
            groom,
            bride,
            day,
            date,
            address,
            time,
            place,
            linkMap,
            quotes,
            quoter,
            groomSosmed1,
            groomSosmed2,
            groomSosmed3,
            brideSosmed1,
            brideSosmed2,
            brideSosmed3,
            user_id: 1,
          }),
        }
      );

      if (!response.ok) {
        // Tangani kesalahan jika permintaan tidak berhasil
        throw new Error("Terjadi kesalahan saat membuat pemesanan.");
      }

      // Pemesanan berhasil, tampilkan pesan sukses atau lakukan aksi lainnya
      console.log("Pemesanan berhasil!");
      // Misalnya, Anda dapat menampilkan pesan sukses atau mengarahkan pengguna ke halaman lain
      // setelah pemesanan berhasil dibuat.

      // Tutup modal setelah pengguna menyelesaikan pemesanan
      handleClose();
      window.location.reload();
    } catch (error) {
      // Tangani kesalahan jika terjadi
      console.error("Terjadi kesalahan saat membuat pemesanan:", error.message);
      setError("Terjadi kesalahan saat membuat pemesanan.");
    }

    setIsLoading(false); // Set loading state to false
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Booking</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nama Keluarga Pemesan</Form.Label>
            <Form.Control
              type="text"
              placeholder="Keluarga Yatno"
              autoFocus
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nama Keluarga Lainnya</Form.Label>
            <Form.Control
              type="text"
              placeholder="Keluarga Slamet"
              autoFocus
              value={familyName2}
              onChange={(e) => setFamilyName2(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Pengantin Pria</Form.Label>
            <Form.Control
              type="text"
              placeholder="Arif Yatno"
              autoFocus
              value={groom}
              onChange={(e) => setGroom(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ayah Pengantin Pria</Form.Label>
            <Form.Control
              type="text"
              placeholder="Yatno Syarifoudin"
              autoFocus
              value={groomDad}
              onChange={(e) => setGroomDad(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ibu Pengantin Pria</Form.Label>
            <Form.Control
              type="text"
              placeholder="Siti Badriah"
              autoFocus
              value={groomMom}
              onChange={(e) => setGroomMom(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Pengantin Wanita</Form.Label>
            <Form.Control
              type="text"
              placeholder="Amanda"
              value={bride}
              onChange={(e) => setBride(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ayah Pengantin Wanita</Form.Label>
            <Form.Control
              type="text"
              placeholder="Slamet Riyadi"
              value={brideDad}
              onChange={(e) => setBrideDad(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ibu Pengantin Wanita</Form.Label>
            <Form.Control
              type="text"
              placeholder="Manopo"
              value={brideMom}
              onChange={(e) => setBrideMom(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Hari</Form.Label>
            <Form.Control
              type="text"
              placeholder="Sabtu"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tanggal</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Alamat</Form.Label>
            <Form.Control
              type="text"
              placeholder="Jalan Inpres 16"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Waktu</Form.Label>
            <Form.Control
              type="number"
              placeholder="11.00"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tempat</Form.Label>
            <Form.Control
              type="text"
              placeholder="Hotel Rainbow Six"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Link Google Map Tempat</Form.Label>
            <Form.Control
              type="text"
              placeholder="https://googlemap/asdasdasdsadasdads"
              value={linkMap}
              onChange={(e) => setLinkMap(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quotes</Form.Label>
            <Form.Control
              type="text"
              placeholder="Cinta adalah buta"
              value={quotes}
              onChange={(e) => setQuotes(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quotes / Penulis Quotes</Form.Label>
            <Form.Control
              type="text"
              placeholder="Stipe Miocic"
              value={quoter}
              onChange={(e) => setQuoter(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Pengantin Pria Sosmed 1 &#40; Link &#41;</Form.Label>
            <Form.Control
              type="text"
              placeholder="https://instagram/@dnarzlfian16"
              value={groomSosmed1}
              onChange={(e) => setGroomSosmed1(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Pengantin Pria Sosmed 2 &#40; Link &#41;</Form.Label>
            <Form.Control
              type="text"
              placeholder="https://twitter/@dnarzlfian16"
              value={groomSosmed2}
              onChange={(e) => setGroomSosmed2(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Pengantin Pria Sosmed 3 &#40; Link &#41;</Form.Label>
            <Form.Control
              type="text"
              placeholder="https://threads/@dnarzlfian16"
              value={groomSosmed3}
              onChange={(e) => setGroomSosmed3(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Pengantin Wanita Sosmed 1 &#40; Link &#41;</Form.Label>
            <Form.Control
              type="text"
              placeholder="https://threads/@dnarzlfian16"
              value={brideSosmed1}
              onChange={(e) => setBrideSosmed1(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Pengantin Wanita Sosmed 2 &#40; Link &#41;</Form.Label>
            <Form.Control
              type="text"
              placeholder="https://threads/@dnarzlfian16"
              value={brideSosmed2}
              onChange={(e) => setBrideSosmed2(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Pengantin Wanita Sosmed 3 &#40; Link &#41;</Form.Label>
            <Form.Control
              type="text"
              placeholder="https://threads/@dnarzlfian16"
              value={brideSosmed3}
              onChange={(e) => setBrideSosmed3(e.target.value)}
            />
          </Form.Group>

          {/* Display error message, if any */}
          {error && <p className="text-danger">{error}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* Show loading button text when submitting */}
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalInvitation;
