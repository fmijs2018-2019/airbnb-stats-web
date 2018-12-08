import { combineReducers } from 'redux';
import { listingsReducer } from './reducers/listingsReducer';

export default combineReducers({
    listings: listingsReducer,
});
