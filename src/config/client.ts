import ApolloClient from 'apollo-boost';

const client=new ApolloClient({
    uri:"http://localhost:3050/graphql",
})
export default client;