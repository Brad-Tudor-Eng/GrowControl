import React from 'react'
import gql from "graphql-tag";
import { Query } from "react-apollo";



const USER = gql`
  query user($data: FindUserInput) {
    user(data: $data) {
      name
      id
    }
  }
`;











export const User = ({ email }) => (
  <Query
    query={USER}
    variables={{data:{ email }}}
  >
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;
      return (
        <div>
            <p>{data.user.name}</p>
        </div>
      );
    }}
  </Query>
);


