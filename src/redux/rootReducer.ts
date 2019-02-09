import { combineReducers } from 'redux';
import { listingsReducer } from './reducers/listingsReducer';
import { neighborhoodsReducer } from './reducers/neighborhoodsReducer';
import { commonReducer } from './reducers/commonReducer';
import { listingsGridReducer } from './reducers/listingsGridReducer';
import { authReducer } from './reducers/authReducer';

export default combineReducers({
    listings: listingsReducer,
    neighborhoods: neighborhoodsReducer,
    common: commonReducer,
    listingsGrid: listingsGridReducer,
    auth: authReducer
});
