import React from 'react';
import gql from 'graphql-tag';
import Form from './styles/Form';
import {useMutation} from '@apollo/react-hooks';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
        $image: String,
        $store_id: uuid
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
                    const res = await createItem({
                      variables: {
                        title: title,
                        description: description,
                        price: price * 100,
                        image: image,
                        store_id: "47ba2388-da1c-40a5-aa4e-e218e7ecb6c9"
                      }}).then(() => {
                        setAddItem({title:'', description:'', price:0, image:''});
                        setLoading(false);
                    }).catch(e => {
                      console.log("ERROR OCCURRED" ,e);
                      setError(e);
                      setLoading(false);
                    });
                    console.log(res);
                    // change them to the single item page
                    // TODO AFTER SUBMT
                    // Router.push({
                    //   pathname: '/item',
                    //   query: { id: res.data.createItem.id },
                    // });
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
