import React, {useContext} from 'react';
import styled from 'styled-components';
import Mazada from '../images/mazada.png';
import {Link} from 'react-router-dom';
import Nav from './Nav';
import 'nprogress/nprogress.css';
import Cart from './Cart';
import {useLocalStorage} from '../lib/useLocalStorage';
import {CognitoContext} from './Cognito/react-cognito-spa';

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

const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
  }
`;

const CartContext = React.createContext(null);
export const useCartContext = () => useContext(CartContext);

const Header = () => {
  const [isOpen, setIsOpen] = useLocalStorage('isCartOpen', false);
  return (
      <StyledHeader>
        <CartContext.Provider value={{
          isOpen,
          setIsOpen
        }}>
          <div className="bar">
            <Logo>
              <Link to="/"><img  width="300px" src={Mazada} alt="Mazada Logo"/></Link>
            </Logo>
            <Nav />
          </div>
          <Cart/>
        </CartContext.Provider>
      </StyledHeader>
    )
};


export default Header;
