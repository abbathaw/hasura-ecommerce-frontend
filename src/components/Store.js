import React from 'react';
import ItemStyles from './styles/ItemStyles';
import {Link, useHistory} from 'react-router-dom';

import styled from 'styled-components';

const StoreTitle = styled.h3`
  margin: 0 1rem;
  text-align: center;
  transform: skew(-5deg) rotate(-1deg);
  margin-top: -1rem;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  a {
    background: ${props => props.theme.red};
    display: inline;
    line-height: 1.3;
    font-size: 4rem;
    text-align: center;
    color: white;
    padding: 0 1rem;
  }
`;

const StoreDesc = styled.p`
  margin-top: 30px;
`;


const Store = (props) => {
  let history = useHistory();
  const { store } = props;
  return (
      <ItemStyles>
        
        <StoreTitle>
          <Link
              to={{
                pathname: `/store/${store.id}`
              }}
          >
            {store.name}
          </Link>
        </StoreTitle>
        <StoreDesc>{store.description}</StoreDesc>
        <div className="buttonList">
          <button  type='button' onClick={() => { history.push(`/store/${store.id}`) }}>Open Store</button>
        </div>
      </ItemStyles>
  );
  
}

export default Store;
