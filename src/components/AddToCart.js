import React from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_CURRENT_ITEM_IN_CART = gql`
        query GET_CURRENT_ITEM_IN_CART($id: uuid!) {
            cart_items(where: {item_id : {_eq: $id}}) {
                id
                item_id
                quantity
            }
        }
`;

const ADD_TO_CART_MUTATION = gql`
    mutation ADD_TO_CART_MUTATION($id: uuid!) {
        insert_cart_items(objects: {item_id: $id}) {
            returning {
                id
                item_id
                quantity
            }
        }
    }
`;

const UPDATE_ITEM_IN_CART = gql`
    mutation UPDATE_ITEM_IN_CART($cart_id: uuid!, $quantity: Int!) {
        update_cart_items(where: {id : {_eq: $cart_id}}, _set: {quantity: $quantity}) {
            returning {
                id
                item_id
                quantity
            }
        }
    }
`;

const AddToCart = (props) => {
    // const { cartItems } = useCartContext();
    const [isLoading, setLoading] = React.useState(false);
    const { id } = props;
    const [updateCart] = useMutation(UPDATE_ITEM_IN_CART);
    const [addToCart] = useMutation(ADD_TO_CART_MUTATION);
    const {error, data} = useQuery(GET_CURRENT_ITEM_IN_CART, {
        variables: {id: id},
    });
    
    const handleClick = async () => {
        setLoading(true);
        if ( error ) {
            console.error(error);
        }
    
        const currentItemInCart = data.cart_items;
        if (currentItemInCart &&  currentItemInCart.length > 0) {
            const cart_id = currentItemInCart[0].id;
            const quantity = currentItemInCart[0].quantity;
            await updateCart({
                variables: {
                    cart_id,
                    quantity:quantity + 1
                },
                refetchQueries: ["GET_CURRENT_ITEM_IN_CART"],
                update(cache, {data}) {
                    if ( !data ) {
                        return null;
                    }
                }
            }).then(({data}) => {
                setLoading(false);
            }).catch(e => {
                console.log("ERROR OCCURRED", e);
                setLoading(false);
            })
        } else {
            await addToCart({
                    variables: {
                        id: id
                    }, refetchQueries: ["GET_CURRENT_ITEM_IN_CART"],
                    update(cache, {data}) {
                        if ( !data ) {
                            return null;
                        }
                    }
                }).then(({data}) => {
                setLoading(false);
            }).catch(e => {
                console.log("ERROR OCCURRED", e);
                setLoading(false);
            })
        }
    };
    return (
              <button disabled={isLoading} onClick={handleClick}>
                Add{isLoading && 'ing'} To Cart 🛒
              </button>
    );
}
export default AddToCart;
export { ADD_TO_CART_MUTATION };
