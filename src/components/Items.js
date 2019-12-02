import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';
import {useLocation} from 'react-router';
import NProgress from 'nprogress';

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY {
        items {
            id
            title
            img
            description
            price
            store_id
            store {
                name
            }
        }
    }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

const Items =() => {
  
  const [hasRendered, setHasRendered] = useState(false);
  let location = useLocation();
  
  useEffect(() => {
    NProgress.done();
    setHasRendered(true);
  }, [location]);
  
  if ( !hasRendered ) {
    NProgress.start();
  }
  
  const { loading, error, data } = useQuery(ALL_ITEMS_QUERY);
  
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }
  
  return (
        <Center>
              <ItemsList>{data.items.map(item => <Item item={item} key={item.id} />)}</ItemsList>
        </Center>
    );
}

export default Items;
export { ALL_ITEMS_QUERY };
