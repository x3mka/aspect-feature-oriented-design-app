import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_TEST_QUERY = gql`
{ 
  test @client  
}`;

const TestState = () => (
  <Query query={GET_TEST_QUERY}>
    {({ loading, error, data: { test, menuItems } }) => {
      if (loading) return <span>loading...</span>;
      if (error) return <span>{error}</span>;
      return (
        <div>
          <h1>Test State</h1>
          <div>We use just a simple GraphQL query to get data from local state</div>
          <span>test: {test}</span><br/>
        </div>
      )
    }}
  </Query>
);

export default TestState;
