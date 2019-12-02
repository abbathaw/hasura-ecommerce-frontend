import React, {useEffect, useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';
import {useHistory, useLocation} from 'react-router';
import NProgress from 'nprogress';
import Store from './Store';

const ALL_STORES_QUERY = gql`
    query ALL_STORES_QUERY {
        user_store {
            store {
                id
                name
                description
                created_at
            }
        }
    }
`;

const Center = styled.div`
  text-align: center;
`;

const StoresList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 80px auto;
  min-height: 200px;
`;

const Stores =() => {
  let history = useHistory();
  
  const [hasRendered, setHasRendered] = useState(false);
  let location = useLocation();
  
  useEffect(() => {
    NProgress.done();
    setHasRendered(true);
  }, [location]);
  
  if ( !hasRendered ) {
    NProgress.start();
  }
  
  const { loading, error, data } = useQuery(ALL_STORES_QUERY);
  
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }
  
  if (!data.user_store || !data.user_store.length) {
    return  (
        <Center>
          <p>You have no Stores yet. Click below to create a new store.</p>
          <StaticDesc/>
          <button type='button'
                  onClick={() => { history.push('/createStore') }}>Create New Store</button>
        </Center>
    )
  }

  return (
      <Center>
        <h2> Your Store List</h2>
        <StaticDesc/>
        <button type='button'
                onClick={() => { history.push('/createStore') }}>Create Another Store</button>
        <StoresList>{data.user_store.map(user_store => <Store store={user_store.store} key={user_store.store.id} />)}</StoresList>
      </Center>
  );
};

const StaticDesc = () => (
    <p>You can create new items to sell in your store and view your orders.</p>
);

export default Stores;
export { ALL_STORES_QUERY };
