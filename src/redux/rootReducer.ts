import { combineReducers } from 'redux';
import { locationsReducer } from './reducers/locationsReducer';
import { neighborhoodsReducer } from './reducers/neighborhoodsReducer';
import { commonReducer } from './reducers/commonReducer';
import { listingsGridReducer } from './reducers/listingsGridReducer';
import { authReducer } from './reducers/authReducer';

export default combineReducers({
    locations: locationsReducer,
    neighborhoods: neighborhoodsReducer,
    common: commonReducer,
    listingsGrid: listingsGridReducer,
    auth: authReducer
});
