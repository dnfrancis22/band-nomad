import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const ContactRedirect = () => {
  const history = useHistory();
  useEffect(() => {
    window.setTimeout(() => history.push("/"), 3000);
  }, []);

  return (
    <>
      <h3>Message Sent!</h3>
      <h4>Redirecting you to the home page...</h4>
    </>
  );
};

export default ContactRedirect;
