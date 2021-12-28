import React from "react";
import { Button, Modal } from "react-bootstrap";
import { CustomFormModal } from "../Utilities";

function ModalDelete({ showModalDelete, setShowModalDelete, handleDelete }) {
  return (
    <CustomFormModal
      showProps={showModalDelete}
      setShowProps={setShowModalDelete}
      title="Delete Password"
      confirmBtn="Delete"
      handleSubmit={handleDelete}
    >
      <p>Are you sure you want to delete this password?</p>
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
