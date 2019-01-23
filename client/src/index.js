import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo"
import App from './Components/App';

import reducers from './Reducers'

import './Components/Styles/index.css';

const store = createStore(reducers)

const client = new ApolloClient({
    uri: "http://localhost:8080/gql"
  });


ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>
, document.getElementById('root'));
