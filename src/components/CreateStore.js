import React from 'react';
import gql from 'graphql-tag';
import Form from './styles/Form';
import {useMutation} from '@apollo/react-hooks';
import Error from './ErrorMessage';
import {useHistory} from 'react-router';
import {ALL_STORES_QUERY} from './Stores';


const CREATE_STORE_MUTATION = gql`
    mutation CREATE_STORE_MUTATION(
        $name: String!
        $description: String!
    ) {
        insert_user_store(
            objects: {store: {data:{
                name: $name
                description: $description
            }}}) {
            returning{
                store{
                    id
                    name
                    description
                    created_at
                }
            }
        }
    }
`;


const CreateStore = () => {
  
  const [addStore, setAddStore ] = React.useState({ name: '', description: ''});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const handleChange = e => {
    const { name, value } = e.target;
    setAddStore(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  

  let history = useHistory();
  const [createStore] = useMutation(CREATE_STORE_MUTATION);
  return (
      <Form
          data-test="form"
          onSubmit={async e => {
            setLoading(true);
            // Stop the form from submitting
            e.preventDefault();
            const { name, description } =  addStore;
            // call the mutation
            await createStore({
              variables: {
                name: name,
                description: description
              },
              update(cache, {data}) {
                if (!data) {
                  return null;
                }
                const getExistingStores = cache.readQuery({query: ALL_STORES_QUERY});
                const existingStores = getExistingStores ? getExistingStores.user_store : [];
                const newStore = data.insert_user_store.returning[0];
                cache.writeQuery({
                  query: ALL_STORES_QUERY,
                  data: {user_store: [newStore.store, ...existingStores]}
                })
              }
            }).then(({data}) => {
              setAddStore({name:'', description:''});
              setLoading(false);
              const newStore = data.insert_user_store.returning[0];
              console.log("what is new Stpre", newStore);
              history.push(`/store/${newStore.store.id}`)
            }).catch(e => {
              console.log("ERROR OCCURRED" ,e);
              setError(e);
              setLoading(false);
            });
          }}
      >
        <Error error={error} />
        <fieldset disabled={loading} aria-busy={loading}>
          <label htmlFor="name">
            Name of Store
            <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                required
                value={addStore.name}
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
                value={addStore.description}
                onChange={handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </fieldset>
      </Form>
  );
}

export default CreateStore;
export { CREATE_STORE_MUTATION };
