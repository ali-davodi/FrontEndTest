import { SEARCH } from './statics'

const initialState = {
    search: ''
}
  
export default function reducer(state = initialState, action: any) {
    switch(action.type) {
      case SEARCH:
        return {
          search: action.value
        };
      default:
        return state;
    }
}