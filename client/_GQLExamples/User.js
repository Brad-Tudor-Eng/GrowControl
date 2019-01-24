import React from 'react'
import gql from "graphql-tag";
import { Query } from "react-apollo";



const USER = gql`
  query user($data: FindUserInput) {
    user(data: $data) {
      name
      id
      device{
      id
      dev_name
      records{
        date
        data{
          time
          light
          temp
          humidity
          moisture
        }
      }
    }
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

      console.log(data)
      return (
        <div>
            <p>{data.user.name}</p>
        </div>
      );
    }}
  </Query>
);


