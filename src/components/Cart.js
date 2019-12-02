import React from 'react';
import {useQuery, useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';
// import CartItem from './CartItem';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';
import {useLocalStorage} from '../lib/useLocalStorage';
import {useCartContext} from './Header';
// import TakeMyMoney from './TakeMyMoney';


const Cart = () => {
  
  const {isOpen, setIsOpen} = useCartContext();
 
  const handleToggle = () => {
    setIsOpen(!isOpen)
  };
  
  const cartLength = 2;
  
  return (
      <CartStyles open={isOpen}>
        <header>
          <CloseButton onClick={handleToggle} title="close">
            &times;
          </CloseButton>
          <Supreme>Your Cart</Supreme>
          <p>
            You Have {cartLength} Item{cartLength === 1 ? '' : 's'} in
            your cart.
          </p>
        </header>
        {/*<ul>{me.cart.map(*/}
        {/*    cartItem => <CartItem key={cartItem.id} cartItem={cartItem}/>)}</ul>*/}
        <footer>
          {/*<p>{formatMoney(calcTotalPrice(me.cart))}</p>*/}
          {cartLength && (
              <SickButton>Checkout</SickButton>
          )}
        </footer>
      </CartStyles>
  )
};

export default Cart;
