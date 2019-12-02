import React from 'react';
import NavStyles from './styles/NavStyles';
import {Link} from 'react-router-dom';
import {useCognito} from './Cognito/react-cognito-spa';

const Nav = () => {
  
  const { logout } = useCognito();
  
  return (
      <NavStyles>
        <Link to="/shop">
          Shop
        </Link>
        <Link to="/sell">
          Sell
        </Link>
        <Link to="/orders">
          Orders
        </Link>
        <Link onClick={logout} to="/">
          Logout
        </Link>
      </NavStyles>
  );
};

export default Nav;
