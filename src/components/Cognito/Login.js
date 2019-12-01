import React from "react";
import { useCognito } from "./react-cognito-spa";
import Cover from "../../images/cover.png";
import { Button } from "react-bootstrap";

const Login = () => {
  const { loading, loginWithRedirect } = useCognito();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="overlay">
      <div className="overlay-content">
        <div className="overlay-heading">
          <div>
          <img width="300px" src={Cover} alt="Mazada Logo"/>
          </div>
          Welcome to Mazada Shopping app
        </div>
        <div className="overlay-message">Please login to continue</div>
        <div className="overlay-action">
          <Button
            id="qsLoginBtn"
            variant="primary"
            className="btn-margin loginBtn"
            onClick={() => {
              loginWithRedirect({});
            }}
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
