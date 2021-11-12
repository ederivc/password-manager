import { useState } from "react";

const useAlert = () => {
  const [showAlert, setShowAlert] = useState({
    showAlert: false,
    text: "",
    variant: "",
    refresh: 0,
  });
  const [refreshValue, setRefreshValue] = useState(1);

  const displayAlert = (text, variant) => {
    setShowAlert({
      showAlert: true,
      text: text,
      variant: variant,
      refresh: refreshValue,
    });
    setRefreshValue(refreshValue + 1);
  };

  return [showAlert, displayAlert];
};

export { useAlert };
