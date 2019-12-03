import React from 'react';
import {useMutation} from '@apollo/react-hooks';
import styled from 'styled-components';
import gql from 'graphql-tag';

const DELETE_CURRENT_ITEM_IN_CART = gql`
    mutation DELETE_CURRENT_ITEM_IN_CART($id: uuid!) {
        delete_cart_items(where: {id: {_eq: $id}}) {
            affected_rows
        }
    }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

const RemoveFromCart =({id}) => {
  const [loading, setLoading] = React.useState(false);
  
  const [removeFromCart] = useMutation(DELETE_CURRENT_ITEM_IN_CART);
  

  return (
            <BigButton
                disabled={loading}
                onClick={async () => {
                  setLoading(true);
                  await removeFromCart({
                    variables: {id: id},
                    refetchQueries: ["GET_CURRENT_ITEM_IN_CART"],
                  }).then(({data}) => {
                    setLoading(false)
                  }).catch(err => {
                    console.log(err.message);
                    setLoading(false)
                  });
                }}
                title="Delete Item"
            >
              &times;
            </BigButton>

    );
}

export default RemoveFromCart;
export { DELETE_CURRENT_ITEM_IN_CART };
