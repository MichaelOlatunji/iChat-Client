import {
  FETCH_CONVERSATION_REQUEST,
  FETCH_CONVERSATION_SUCCESS,
  FETCH_CONVERSATION_FAILED,
  CREATE_CONVERSATION_REQUEST,
  CREATE_CONVERSATION_SUCCESS,
  CREATE_CONVERSATION_FAILED,
  EDIT_CONVERSATION_REQUEST,
  EDIT_CONVERSATION_SUCCESS,
  EDIT_CONVERSATION_FAILED,
  DELETE_CONVERSATION_REQUEST,
  DELETE_CONVERSATION_SUCCESS,
  DELETE_CONVERSATION_FAILED,
} from "./actionTypes";

const initialState = {
  loading: false,
  conversations: [],
  error: "",
};

// {
//       id:'',
//       members: [],
//       creator_id: '',
//       conversation_name: '',
//       conversation_type: '',
//       created_at: new Date(Date.now()),
//       updated_at: new Date(Date.now()),
//       admins: [],
//       conversation_avatar: ''
//   }

const conversationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONVERSATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CONVERSATION_SUCCESS:
      return {
        loading: false,
        conversations: action.payload,
        error: "",
      };
    case FETCH_CONVERSATION_FAILED:
      return {
        loading: false,
        conversations: [],
        error: action.payload,
      };
    case CREATE_CONVERSATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CONVERSATION_SUCCESS:
      return {
        loading: false,
        conversations: action.payload,
        error: "",
      };
    case CREATE_CONVERSATION_FAILED:
      return {
        loading: false,
        conversations: [],
        error: action.payload,
      };
    case EDIT_CONVERSATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EDIT_CONVERSATION_SUCCESS:
      return {
        loading: false,
        conversations: action.payload,
        error: "",
      };
    case EDIT_CONVERSATION_FAILED:
      return {
        loading: false,
        conversations: [],
        error: action.payload,
      };
    case DELETE_CONVERSATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CONVERSATION_SUCCESS:
      return {
        loading: false,
        conversations: action.payload,
        error: "",
      };
    case DELETE_CONVERSATION_FAILED:
      return {
        loading: false,
        conversations: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default conversationReducer;
