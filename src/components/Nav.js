import React from 'react';
import NavStyles from './styles/NavStyles';
import {Link} from 'react-router-dom';
import {useCognito} from './Cognito/react-cognito-spa';
import {useCartContext} from './Header';
import CartCount from './CartCount';

const Nav = () => {
  const {isOpen, setIsOpen, cartCount} = useCartContext();
  
  const handleToggle = () => {
    setIsOpen(!isOpen)
  };
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
        <>
          <button onClick={handleToggle}>
            My Cart <CartCount count={cartCount} />
          </button>
        </>
        <Link onClick={logout} to="/">
          Logout
        </Link>
      </NavStyles>
  );
};

export default Nav;
