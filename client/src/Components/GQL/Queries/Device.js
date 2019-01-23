import gql from "graphql-tag";


export const RECORD_ONE_DAY = gql`
# expects: deviceId , date
  query findUserDevices($data: FindUserDevicesInput) {
    findUserDevices(data: $data) {
      
    }
  }
`;