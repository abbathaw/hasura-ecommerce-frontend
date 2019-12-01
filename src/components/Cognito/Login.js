import React from "react";
import { useCognito } from "./react-cognito-spa";
import Cover from "../../images/cover.png";
import { Button } from "react-bootstrap";
import styled from 'styled-components';

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;


const Login = () => {
  const { loading, loginWithRedirect } = useCognito();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="overlay">
      <div className="overlay-content">
        <div className="overlay-heading">
          <Logo>
          <img width="300px" src={Cover} alt="Mazada Logo"/>
          </Logo>
          Welcome to the Mazada Shopping app
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
