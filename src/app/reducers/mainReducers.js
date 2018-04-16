export default function reducer(state = {
message:"Hello Manvitha",
googleResponse:{},
tableData:[],
}, action) {
  console.log("in reducer!!");
  console.log(action);

  switch (action.type) {
    case "UPDATE_MSG":
      {
        return {
           ...state,
          message: action.msg,
        }
      }
      break;
      case "GET_TABLE_DATA":
        {
          return {
             ...state,
            tableData: action.data,
          }
        }
        break;
      case "GOOGLE_RESPONSE":
        {
          return {
             ...state,
            googleResponse: action.googleUserResponse,
          }
        }
        break;

  }
  return state
}
