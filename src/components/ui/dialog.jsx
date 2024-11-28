// Dialog.js

import React from 'react';
import { Modal, Button } from 'react-bootstrap';


const Dialog = ({ show, onHide, children, ...props }) => (
  <Modal show={show} onHide={onHide} centered {...props}>
    {children}
  </Modal>
);

const DialogTrigger = ({ children, onClick, ...props }) => (
  <span onClick={onClick} {...props}>
    {children}
  </span>
);

const DialogHeader = ({ closeButton, onHide, children, ...props }) => (
  <Modal.Header closeButton={closeButton} onHide={onHide} {...props}>
    {children}
  </Modal.Header>
);

const DialogTitle = ({ children, ...props }) => (
  <Modal.Title {...props}>{children}</Modal.Title>
);

const DialogBody = ({ children, ...props }) => (
  <Modal.Body {...props}>{children}</Modal.Body>
);

const DialogFooter = ({ children, ...props }) => (
  <Modal.Footer {...props}>{children}</Modal.Footer>
);

export {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
};
