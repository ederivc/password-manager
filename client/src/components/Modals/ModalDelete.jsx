import React from "react";
import { Button, Modal } from "react-bootstrap";
import { CustomFormModal } from "../Utilities";

function ModalDelete({
  showModalDelete,
  setShowModalDelete,
  handleDelete,
  title,
  text,
}) {
  return (
    <CustomFormModal
      showProps={showModalDelete}
      setShowProps={setShowModalDelete}
      title={title}
      confirmBtn="Delete"
      handleSubmit={handleDelete}
    >
      <p>{text}</p>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModalDelete(false)}>
          No
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          Yes
        </Button>
      </Modal.Footer>
    </CustomFormModal>
  );
}

export { ModalDelete };
