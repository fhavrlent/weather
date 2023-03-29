import { useState } from "react";

export const useError = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const showError = (message: string) => setErrorMessage(message);

  const hideError = () => setErrorMessage("");

  return { errorMessage, showError, hideError };
};
