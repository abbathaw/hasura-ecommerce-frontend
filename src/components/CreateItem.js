import React from 'react';
import gql from 'graphql-tag';
import Form from './styles/Form';
import {useMutation} from '@apollo/react-hooks';
import Error from './ErrorMessage';
import {useHistory} from 'react-router';
import {useParams} from 'react-router';
import {ALL_ITEMS_QUERY} from './Items';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
        $image: String,
        $store_id: uuid!
    ) {
        insert_items(
            objects: {
                title: $title
                description: $description
                price: $price
                img: $image
                store_id: $store_id
            }) {
            returning{
                id
                title
                img
                description
                price
                store_id
                created_at
                store {
                    name
                }
            }
        }
    }
`;

const parseNumber = (value) => {
  try {
    const float =   parseFloat(value);
    return Number.isNaN(float) ? '' : float
  } catch (e) {
    return 0;
  }
};

const CreateItem = () => {
  let {storeId} = useParams();
  const [addItem, setAddItem ] = React.useState({ title: '', description: '', image: '', price: 0});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseNumber(value) : value;
    setAddItem(prevState => ({
      ...prevState,
      [name]: val,
    }));
  };
  
  const uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'mazada');
    
    const res = await fetch('https://api.cloudinary.com/v1_1/abbathaw/image/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();
    setAddItem(prevState => ({
      ...prevState,
      image: file.secure_url,
    }));
  };
  let history = useHistory();
  const [createItem] = useMutation(CREATE_ITEM_MUTATION);
    return (
              <Form
                  data-test="form"
                  onSubmit={async e => {
                    setLoading(true);
                    // Stop the form from submitting
                    e.preventDefault();
                    const { title, description, price, image } =  addItem;
                    // call the mutation
                     await createItem({
                      variables: {
                        title: title,
                        description: description,
                        price: price * 100,
                        image: image,
                        store_id: storeId
                      }
                     }).then(({data}) => {
                        setAddItem({title:'', description:'', price:0, image:''});
                        setLoading(false);
                        const newItem = data.insert_items.returning[0];
                        history.push(`/item/${newItem.id}`)
                    }).catch(e => {
                      console.log("ERROR OCCURRED" ,e);
                      setError(e);
                      setLoading(false);
                    });
                  }}
              >
                <Error error={error} />
                <fieldset disabled={loading} aria-busy={loading}>
                  <label htmlFor="file">
                    Image
                    <input
                        type="file"
                        id="file"
                        name="file"
                        placeholder="Upload an image"
                        required
                        onChange={uploadFile}
                    />
                    {addItem.image && (
                        <img width="200" src={addItem.image} alt="Upload Preview" />
                    )}
                  </label>
                  
                  <label htmlFor="title">
                    Title
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        required
                        value={addItem.title}
                        onChange={handleChange}
                    />
                  </label>
                  
                  <label htmlFor="price">
                    Price
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Price"
                        required
                        value={addItem.price}
                        onChange={handleChange}
                    />
                  </label>
                  
                  <label htmlFor="description">
                    Description
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter A Description"
                        required
                        value={addItem.description}
                        onChange={handleChange}
                    />
                  </label>
                  <button type="submit">Submit</button>
                </fieldset>
              </Form>
    );
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
