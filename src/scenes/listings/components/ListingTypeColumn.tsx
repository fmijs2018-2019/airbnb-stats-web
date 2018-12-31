import * as React from 'react';
import { IListingType } from 'src/models/listings/ListingTableDto';
import Shared from '@material-ui/icons/SupervisedUserCircleRounded'
import PrivateRoom from '@material-ui/icons/LockOpen'
import House from '@material-ui/icons/HomeOutlined'

interface IListingTypeColumn {
    type: IListingType;
}

export default (props: IListingTypeColumn) => {
    const { type: { roomType, propertyType } } = props;
    let icon;
    if (roomType === 'Entire home/apt') {
        icon = <House fontSize="large" style={{marginRight: '5px', color: '#60cfdb'}} />
    } else if (roomType === 'Private room') {
        icon = <PrivateRoom style={{marginRight: '5px', color: 'rgb(255, 123, 152)'}} fontSize="large" />
    } else {
        icon = <Shared style={{marginRight: '5px', color: 'gray'}} fontSize="large" />
    }

    return <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>{icon}</div>
        <div>
            <div>{roomType}</div>
            <div>{propertyType}</div>
        </div>
    </div>;
}