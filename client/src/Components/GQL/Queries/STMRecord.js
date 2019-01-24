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

renderLastTen = (data) => {



    if(!data){
        return <h4>Loading</h4>
    }else{
        const last10 = data[data.length - 1].data.slice(Math.max(data[data.length - 1].data.length - 10, 1))
        
        return last10.map((el)=>{
            return <li key={el.time} ><h4 >{`${el.time}     ${el.light}     ${el.temp}     ${el.humidity}     ${el.moisture}`}</h4></li>
        })
    }
}

render(){
    return (
        <div>
            <ul>
                {this.renderLastTen(this.props.recordAll)}
            </ul>
        </div>
    )
}


}