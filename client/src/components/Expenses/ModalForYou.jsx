import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ModalForYou = ({ show, handleClose }) => {
  // You can add any necessary state variables or functions for handling form input, etc.

  // Example function to handle form submission or any other action
  const handleSubmit = () => {
    // Add your logic here for handling form submission or any other action
    // For example, you can send the form data to a server or update the state of the parent component.
    // After handling the action, close the modal using the handleClose function.
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Booking</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name For You</Form.Label>
            <Form.Control type="text" placeholder="Siti Rosiah" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalForYou;
