import React from 'react'
import gql from "graphql-tag";
import { Subscription } from "react-apollo";


const DataSubscription = gql`
subscription DataSubscription($data: DataSubscriptionInput){
    data(data: $data){
      time
      light
      temp
      humidity
      moisture
    }
  }
`;



export default ({ deviceId , userId }) => (
  <Subscription
    subscription={DataSubscription}
    variables={{data: { deviceId, userId  }}}
  >
    {({ data , loading }) => {
        console.log(data)
        if (loading) return <h2>loading</h2>;
       return   (
           <div>
                <h3>time:</h3>
                <h4>{data.data.time}</h4>
           </div>
       )
    }}
  </Subscription>
);


