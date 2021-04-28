import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import LoginContainer from "../containers/LoginContainer";

const LoginPage = () => {
  return (
    <AuthTemplate>
      <LoginContainer />
    </AuthTemplate>
  );
};

export default LoginPage;
