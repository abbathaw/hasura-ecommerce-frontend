import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import {useLocation} from 'react-router';
import NProgress from 'nprogress';
import {useSubscription} from '@apollo/react-hooks';
import Error from './ErrorMessage';
import formatMoney from '../lib/formatMoney';
import OrderItemStyles from './styles/OrderItemStyles';
import {Link} from 'react-router-dom';

const ALL_ORDERS_QUERY = gql`
    subscription ALL_ORDERS_QUERY {
        orders(order_by: {created_at: desc}) {
            id
            charge
            created_at
            paid
            total
            order_items {
                quantity
                img
                title
                id
            }
        }
    }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`;

const Orders = () => {
  
  const [hasRendered, setHasRendered] = useState(false);
  let location = useLocation();
  
  useEffect(() => {
    NProgress.done();
    setHasRendered(true);
  }, [location]);
  
  if ( !hasRendered ) {
    NProgress.start();
  }
  
  const { loading, error, data } = useSubscription(ALL_ORDERS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <Error error={error} />;
  }
  
  const orders = data.orders;
  return(
      <div>
        <h2>You have {orders.length} orders</h2>
        <OrderUl>
          {orders.map(order => (
              <OrderItemStyles key={order.id}>
                <Link
                    to={{pathname: `/order/${order.id}`}}>
                    <div className="order-meta">
                      <p>{order.order_items.reduce((a, b) => a + b.quantity, 0)} Items</p>
                      <p>{order.order_items.length} Products</p>
                      <p>{formatMoney(order.total)}</p>
                    </div>
                    <div className="images">
                      {order.order_items.map(item => (
                          <img key={item.id} src={item.img} alt={item.title} />
                      ))}
                    </div>
                </Link>
              </OrderItemStyles>
          ))}
        </OrderUl>
      </div>
  )
};

export default Orders;
