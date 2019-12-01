import React from "react";
import { Navbar } from "react-bootstrap";
import LogoutBtn from './Cognito/LogoutBtn';
import Mazada from "../images/mazada.png";

const Header = ({ logoutHandler }) => (
  <Navbar className="justify-content-between">
    <Navbar.Brand><img width="150px" src={Mazada} alt="Mazada Logo"/></Navbar.Brand>
    <Navbar.Collapse className="justify-content-end">
      <LogoutBtn logoutHandler={logoutHandler} />
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
