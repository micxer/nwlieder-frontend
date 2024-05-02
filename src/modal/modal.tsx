import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface modalinterface {
  show: boolean;
  text: string;
  heading: string;
}

const ModalAlert: React.FC<modalinterface> = ({ text, show, heading }) => {
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow1(false);

  useEffect(() => {
    setShow1(show);
  }, [show]);
  return (
    <Modal show={show1} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body> {text} </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAlert;
