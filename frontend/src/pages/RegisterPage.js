import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import RegisterContainer from "../containers/RegisterContainer";

const RegisterPage = () => {
  return (
    <AuthTemplate>
      <RegisterContainer />
    </AuthTemplate>
  );
};

export default RegisterPage;
