import React from 'react';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import {Link} from 'react-router-dom';

const Item = (props) => {

  
//   id
//   title
//   img
//   description
//   price
//   store_id
//   store {
//   name
// }
  

    const { item } = props;
    return (
        <ItemStyles>
          {item.img && <img src={item.img} alt={item.title} />}
          
          <Title>
            <Link
                to={{
                  pathname: '/item',
                  query: { id: item.id },
                }}
            >
              {item.title}
            </Link>
          </Title>
          <PriceTag>{formatMoney(item.price)}</PriceTag>
          <p>Sold by {item.store.name}</p>
          <p>{item.description}</p>
          
          <div className="buttonList">
            {/*<Link*/}
            {/*    to={{*/}
            {/*      pathname: 'update',*/}
            {/*      query: { id: item.id },*/}
            {/*    }}*/}
            {/*>*/}
            {/*  Edit<span role="img" aria-label="pen"> ✏️</span>*/}
            {/*</Link>*/}
            <button>Add To Cart</button>
            {/*<button>Delete </button>*/}
          </div>
        </ItemStyles>
    );
  
}

export  default Item;
