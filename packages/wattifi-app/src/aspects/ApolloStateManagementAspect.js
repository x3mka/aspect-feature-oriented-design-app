import React from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

const ApolloStateManagementAspect = (superclass) => class extends superclass {

  constructor(options = {}) {
    super(options);

    this.stateCache = new InMemoryCache();
  }

  writeState(obj) {
    this.stateCache.writeData({data: obj});
  }

  createStateClient() {
    return new ApolloClient({
      cache: this.stateCache,
      resolvers: {},
    });
  }

  createStateProvider() {
    return ({children}) => <ApolloProvider client={this.createStateClient()}>{children}</ApolloProvider>
  }
};

export default ApolloStateManagementAspect;
