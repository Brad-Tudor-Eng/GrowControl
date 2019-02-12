import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo"
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux'
import reducer from './Reducers'

import './Components/Styles/index.scss'

import App from './Components/App'

// Create an http link:
const httpLink = new HttpLink({
    uri: 'https://growctrl.herokuapp.com/gql'
  });
  
// Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: 'wss://growctrl.herokuapp.com/subscribe',
    options: {
        reconnect: true
    }
});

// split based on operation type
const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(), ));

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>
, document.getElementById('root'));
