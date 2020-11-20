import * as React from 'react';
import '../styles/App.css';
import {ApolloProvider} from "@apollo/client";
import AppLayout from './applayout';
import client from '../config/client'
import ShopList from "./Shop/shopList";

function App() {
  return (
    <>
    <ApolloProvider client={client}>
        <AppLayout>
            <ShopList/>
        </AppLayout>
    </ApolloProvider>
    </>
  );
}

export default App;
