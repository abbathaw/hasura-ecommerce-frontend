import React from 'react';
import {useSubscription} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';
import CartItem from './CartItem';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';
import {GET_ALL_ITEMS_IN_CART, useCartContext} from './Header';
import Error from './ErrorMessage';
import TakeMyMoney from './TakeMyMoney';


const CART_ITEMS = gql`
    subscription CART_ITEMS {
        items( where: {cart_items: {}} ) {
            id
            title
            description
            img
            price
        }
    }
`;

const Cart = () => {
  const {isOpen, setIsOpen, setCartCount} = useCartContext();
  //temporary not nice workarounds bcz of subscriptions not supporting deep level queries
  const { loading2, error2,  data : cartData } = useSubscription(GET_ALL_ITEMS_IN_CART);
  const { loading, error, data } = useSubscription(CART_ITEMS);
  
  if (loading || loading2) return <p>Loading...</p>;
  if (error || error2) {
    console.error(error);
    console.error(error2);
    return (
        <>
        {error ? <Error error={error} />  : <Error error={error2} />}
        </>
        )
  }
  const handleToggle = () => {
    setIsOpen(!isOpen)
  };
  console.log("cartDATA", cartData);
  const cartLength = cartData && cartData.cart_items &&  cartData.cart_items.length ? cartData.cart_items.length : 0;
  const cart = cartData && cartData.cart_items ? cartData.cart_items : [];
  setCartCount(cartLength);
  const cartWithItems = cart.map( cartItem => {
    const item =  data.items.filter(item=> item.id === cartItem.item_id);
    return {
      cartItemId: cartItem.id,
      quantity: cartItem.quantity,
      item: item[0]
    }
  });
  

  
  return (
      <CartStyles open={isOpen}>
        <header>
          <CloseButton onClick={handleToggle} title="close">
            &times;
          </CloseButton>
          <Supreme>Your Cart</Supreme>
          <p>
            You Have {cartLength} Item{cartLength === 1 ? '' : 's'} in your cart.
          </p>
        </header>
        <ul>{cartWithItems.map(
            cartItem => <CartItem key={cartItem.cartItemId} cartItem={cartItem}/>)}</ul>
        <footer>
          <p>{formatMoney(calcTotalPrice(cartWithItems))}</p>
          {cartLength > 0 && (
              <TakeMyMoney cart={cartWithItems} total={cartLength}>
                <SickButton>Checkout</SickButton>
              </TakeMyMoney>
          )}
        </footer>
      </CartStyles>
  )
};

export default Cart;
