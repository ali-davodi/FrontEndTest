import { SEARCH, UPDATE, UPDATEKEY, FETCH_DATA } from './statics'

const initialState = {
    search: '',
    update: {},
    update_key: 0,
    fetch_data: []
}
export default function reducer(state = initialState, action: any) {
    switch(action.type) {
      case SEARCH:
        return {
          ...state,
          search: action.payload
        }
      case UPDATE:
        return {
          ...state,
          update: action.payload,
        }
      case UPDATEKEY:
          return {
            ...state,
            update_key: action.payload,
          }
      case FETCH_DATA:
        return {
          ...state,
          fetch_data: action.payload
        }
      default:
        return state;
    }
}