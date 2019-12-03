import React from 'react';
import Error from './ErrorMessage';
import OrderStyles from './styles/OrderStyles';
import {useParams} from 'react-router';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { format } from 'date-fns';
import {Helmet} from 'react-helmet';

const SingleOrder = () => {
  let {id} = useParams();
  
  return (
      <OrderStyles data-test="order">
        <Helmet>
          <title>Mazada - Order {id}</title>
        </Helmet>
        <p>
          <span>Order ID:</span>
          <span>{id}</span>
        </p>
      </OrderStyles>
      
      
  )
  
};

export default SingleOrder;

