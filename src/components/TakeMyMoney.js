import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {useMutation} from '@apollo/react-hooks';
import NProgress from 'nprogress';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import {useHistory} from 'react-router';
import {useCognito} from './Cognito/react-cognito-spa';
import jwtDecode from 'jwt-decode';

const CREATE_ORDER_MUTATION = gql`
    mutation createOrder($token: String!) {
        createOrder(token: $token) {
            id
            status
        }
    }
`;

const TakeMyMoney =({children, cart, total}) => {
  let history = useHistory();
  const {idToken} = useCognito();
  const decodedJwt = jwtDecode(idToken);
  const [sendOrder] = useMutation(CREATE_ORDER_MUTATION);
  const onToken = async (res) => {
    NProgress.start();
    // manually call the mutation once we have the stripe token
    await sendOrder({
      variables: {
        token: res.id,
      },
    }).then(({data})=> {
      NProgress.done();
      history.push(`/order/${data.createOrder.id}`);
    })
    .catch(err => {
      NProgress.done();
      console.error(err.message);
    });
    
  };

    return (
            <StripeCheckout
                amount={calcTotalPrice(cart)}
                name="Mazada"
                description={`Order of ${total} items!`}
                image={cart.length && cart[0].item && cart[0].item.img}
                stripeKey="pk_test_rCwobAubfaGyn2GzBv07Mql100eHnNwzpY"
                currency="MYR"
                email={decodedJwt && decodedJwt.email ? decodedJwt.email : 'mazada@mazada.com'}
                token={res => onToken(res)}
            >
              {children}
            </StripeCheckout>
    );
}

export default TakeMyMoney;
