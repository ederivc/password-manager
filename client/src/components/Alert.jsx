import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

import "../common/common.scss";

const CustomAlert = ({ showAlert, text, variant, refresh }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (showAlert) {
      setShow(true);
    }
  }, [refresh]);

  return (
    <>
      {show && (
        <Alert
          variant={variant}
          onClose={() => setShow(false)}
          dismissible
          className="custom-alert"
        >
          {text}
        </Alert>
      )}
    </>
  );
};

export { CustomAlert };
