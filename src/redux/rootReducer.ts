import { combineReducers } from 'redux';
import { locationsReducer } from './reducers/locationsReducer';
import { neighborhoodsReducer } from './reducers/neighborhoodsReducer';
import { commonReducer } from './reducers/commonReducer';
import { listingsGridReducer } from './reducers/listingsGridReducer';

export default combineReducers({
    locations: locationsReducer,
    neighborhoods: neighborhoodsReducer,
    common: commonReducer,
    listingsGrid: listingsGridReducer
});
