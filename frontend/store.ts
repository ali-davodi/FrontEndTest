import { createStore, combineReducers } from 'redux';
import searchReducer from './reducers/searchReducer';

const rootReducer = combineReducers({
  search: searchReducer
});

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore;