import React from 'react';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet'
import Error from './ErrorMessage';
import styled from 'styled-components';

import {useParams} from 'react-router';
import {useQuery} from '@apollo/react-hooks';
import formatMoney from '../lib/formatMoney';;

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

const StoreContainer = styled.div`
     box-shadow: 0 12px 24px 0 rgba(187, 144, 29, 0.79);
     padding-left: 5px;
     margin-top: 90px;
`;

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: uuid!) {
        items_by_pk( id: $id ) {
            id
            title
            description
            img
            price
            store_id
            store {
                description
                name
            }
        }
    }
`;
const SingleItem = () => {
  let {id} = useParams();
  const { loading, error, data } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {id: id}
  });
  
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <Error error={error} />;
  }
    if ( !data.items_by_pk ) return <p>No Item Found for {id}</p>;
    const item = data.items_by_pk;
    
    return (
        <SingleItemStyles>
          <Helmet>
            <title>{item.title}</title>
          </Helmet>
          <img src={item.img} alt={item.title}/>
          <div className="details">
            <h2>Viewing {item.title}</h2>
            <p>{item.description}</p>
            <p>{formatMoney(item.price)}</p>
            <StoreContainer>
            <p>Store: {item.store.name}</p>
            <p>{item.store.description}</p>
            </StoreContainer>
          </div>
        </SingleItemStyles>
    );
};

export default SingleItem;
export {SINGLE_ITEM_QUERY};


