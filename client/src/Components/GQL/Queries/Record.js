
import gql from "graphql-tag";
import { Query } from "react-apollo";



export const RECORD_ONE_DAY = gql`
# expects: deviceId , date
  query recordOneDay($data: RecordOneDayInput) {
    recordOneDay(data: $data) {
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

export const RECORD_DATA_RANGE = gql`
# expects: deviceId , startDate , endDate
  query recordDateRange($data: RecordDateRangeInput) {
    recordDateRange(data: $data) {
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

export const RECORD_ALL = gql`
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