import React from 'react';
import styled from 'styled-components';

const orderUl = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`;

const Orders = () => {
  return(
      <div>
        <h2>You have 2 orders</h2>
      </div>
  )
};

export default Orders;
