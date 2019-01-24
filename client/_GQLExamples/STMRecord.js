import React, { Component } from 'react'
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

 

export const DataListWithData = ({ deviceId , userId }) => (
    <Query
      query={RECORD_ALL}
      variables={{data:{ deviceId }}}
    >
      {({ loading, error, data , subscribeToMore }) => { 
          if(data){
           return <DL
            {...data}
            subscribeToNewData = {()=>
                subscribeToMore({
                    document: DataSubscription,
                    variables: {data: {deviceId, userId}},
                    updateQuery: (prev,  { subscriptionData }  )=>{
                        if (!subscriptionData.data) return prev;
                        const { data } = subscriptionData.data
                        const count = prev.recordAll.length-1
                        console.log(prev.recordAll[count].data)
                        prev.recordAll[count].data.push(data)
                        //return a new object with the record added
                        return prev
                        
                    }
                })
            }
        />
          }else{
              return <h4>Loading</h4>
          }

      }}
    </Query>
  );
  

export class DL extends Component {
componentDidMount(){
    this.props.subscribeToNewData();
}

render(){
    return (
        <div>
            <p>test</p>
        </div>
    )
}


}