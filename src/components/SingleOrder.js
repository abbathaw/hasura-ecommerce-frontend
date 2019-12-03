import React from 'react';
import Error from './ErrorMessage';
import OrderStyles from './styles/OrderStyles';
import {useParams} from 'react-router';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {Helmet} from 'react-helmet';
import formatMoney from '../lib/formatMoney';

const SINGLE_ORDER_QUERY = gql`
    query SINGLE_ORDER_QUERY($id: uuid!) {
        orders_by_pk( id: $id ) {
            id
            charge
            created_at
            paid
            total
            order_items {
                id
                img
                description
                price
                quantity
                status
                store_id
                title
            }
        }
    }
`;

const SingleOrder = () => {
  let {id} = useParams();
  const { loading, error, data } = useQuery(SINGLE_ORDER_QUERY, {
    variables: {id: id}
  });
  
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <Error error={error} />;
  }
  
  if ( !data.orders_by_pk ) return <p>No Order Found for {id}</p>;
  const order = data.orders_by_pk;
  return (
      <OrderStyles data-test="order">
        <Helmet>
          <title>Mazada - Order {id}</title>
        </Helmet>
        <p>
          <span>Order ID:</span>
          <span>{id}</span>
        </p>
        <p>
          <span>Charge</span>
          <span>{order.charge}</span>
        </p>
        <p>
          <span>Date</span>
          <span>{order.created_at}</span>
        </p>
        <p>
          <span>Order Total</span>
          <span>{formatMoney(order.total)}</span>
        </p>
        <p>
          <span>Item Count</span>
          <span>{order.order_items.length}</span>
        </p>
        <div className="items">
          {order.order_items.map(item => (
              <div className="order-item" key={item.id}>
                <img src={item.img} alt={item.title} />
                <div className="item-details">
                  <h2>{item.title}</h2>
                  <p>Qty: {item.quantity}</p>
                  <p>Each: {formatMoney(item.price)}</p>
                  <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
                  <p>{item.description}</p>
                </div>
              </div>
          ))}
        </div>
      </OrderStyles>
      
      
  )
  
};

export default SingleOrder;

