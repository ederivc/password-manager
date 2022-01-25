import React, { useEffect } from "react";

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export { useDocumentTitle };
