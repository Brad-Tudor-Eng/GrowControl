import React from 'react'
import gql from "graphql-tag";
import { Query, Subscription } from "react-apollo";



const RECORD_ALL = gql`
# expects: deviceId
  query recordAll($data: RecordAllInput) {
    recordAll(data: $data) {
        date
        data {
                time
                light
                temp
                humidity
                moisture
        }
    }
  }
`;




export default ({ deviceId }) => (
    <Query
      query={RECORD_ALL}
      variables={{data:{ deviceId }}}
    >
      {({ loading, error, data, subscribeToMore }) => {
        if (loading) return null;
        if (error) return `Error!: ${error}`;

        return (
          <div>
              <p>DATA LIST</p>
          </div>
        );
      }}
    </Query>
  );
  


