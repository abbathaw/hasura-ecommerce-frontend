import gql from 'graphql-tag';
import React from 'react';
import {Helmet} from 'react-helmet';
import Error from './ErrorMessage';
import {
  Card,
  Col,
  Container,
  Jumbotron,
  ListGroup,
  Row,
} from 'react-bootstrap';
import {useHistory, useParams} from 'react-router';
import {useQuery} from '@apollo/react-hooks';

const SINGLE_STORE_QUERY = gql`
    query SINGLE_STORE_QUERY($id: uuid!) {
        stores_by_pk( id: $id ) {
            description
            created_at
            id
            name
            items_aggregate {
                aggregate {
                    count
                }
            }
            items {
                id
                img
                title
                description
                created_at
            }
            order_items_aggregate {
                aggregate {
                    count
                }
            }
            order_items {
                id
                title
                user {
                    name
                }
                order_id
                price
                quantity
                status
            }
        }
    }
`;


const SingleStore = () => {
  let {id} = useParams();
  const {loading, error, data} = useQuery(SINGLE_STORE_QUERY, {
    variables: {id: id},
  });
  
  if ( loading ) return <p>Loading...</p>;
  if ( error ) {
    console.error(error);
    return <Error error={error}/>;
  }
  if ( !data.stores_by_pk ) return <p>No Store Found for {id}</p>;
  
  const containerStyle = {
    marginTop: "70px"
  };
  
  const store = data.stores_by_pk;
  console.log('Store', store);
  return (
      <Container style={containerStyle} >
          <Helmet>
            <title>{store.name}</title>
          </Helmet>
            <Row>
            <Col xl={10} lg={8} md={8} sm={8} xs={12}>
              <StoreLayout store={store} />
            </Col>
            </Row>
      </Container>
  );
};


const StoreLayout = ({store}) => {
  let history = useHistory();
  return (
      <Container>
        <Row>
          <Col>
            <Jumbotron>
              <h2>{store.name}</h2>
              <p>{store.description}</p>
              <button type='button'
                      onClick={() => { history.push(`/store/${store.id}/createItem`) }}>Create New Item</button>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col lg={true}>
            <Card>
              <Card.Body>
                <Card.Title>Items {store.items_aggregate.aggregate.count}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Current Items in your store
                </Card.Subtitle>
                <ListGroup>
                  {store.items.map(item => <ListGroup.Item key={item.id} eventKey={item.id} onClick={() => { history.push(`/item/${item.id}`) }}> {item.title} </ListGroup.Item>)}
                </ListGroup>
              </Card.Body>
              <Card.Footer className="text-muted">
                All Items will show here once created
              </Card.Footer>
            </Card>
          </Col>
          <Col lg={true}>
            <Card>
              <Card.Body>
                <Card.Title>Orders {store.order_items_aggregate.aggregate.count}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Current available orders
                </Card.Subtitle>
                <ListGroup>
                  {/*<ListGroup.Item>{store.order_items}</ListGroup.Item>*/}
                  {store.order_items.map(order => <ListGroup.Item key={order.id} eventKey={order.id} > {order.title} </ListGroup.Item>)}
                </ListGroup>
              </Card.Body>
              <Card.Footer className="text-muted">
                All orders will show here once created
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>

      )
      
}


export default SingleStore;
export {SINGLE_STORE_QUERY};


