import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import App from './App';

const cache = new InMemoryCache();
cache.writeData({
  data: {
    id: null,
  },
});

const client = new ApolloClient({
  cache,
  uri: 'http://localhost:4000',
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
      <ToastContainer hideProgressBar/>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
