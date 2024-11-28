import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { Form, Button, Row } from 'react-bootstrap';

export default function Commonmodal({show,handleClose,title,children}) {
  return (
    <div>
     <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{title} </Modal.Title>
          </Modal.Header>
          <Modal.Body>{children}</Modal.Body>
        </Modal>
</div>
  )
}
