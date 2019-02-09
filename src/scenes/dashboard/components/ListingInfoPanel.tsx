import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import Panel from 'src/components/Panel';
import { IListingDetailed } from 'src/models/listings/Listing';
import RatingItem from './RatingItem';

interface ListingInfoPanelProps extends WithStyles<typeof styles> {
    listing: IListingDetailed;
    onClose: () => void;
}

const styles = (theme: Theme) => createStyles({
});

class ListingInfoPanel extends React.Component<ListingInfoPanelProps> {
    header = () => {
        return <div>
            <div>{this.props.listing.name}</div>
        </div>
    }

    render() {
        const { onClose, listing } = this.props;
        const { reviewScoresAccuracy, reviewScoresCheckin, reviewScoresCleanliness, reviewScoresCommunication,
            reviewScoresLocation, reviewScoresRating, reviewScoresValue, reviewsPerMonth } = listing;
        return (
            <Panel header={this.header()} clickHandler={onClose}>
                <div>
                    <RatingItem label="Accuracy" rating={reviewScoresAccuracy}/>
                    <RatingItem label="Checkin" rating={reviewScoresCheckin}/>
                    <RatingItem label="Cleanliness" rating={reviewScoresCleanliness}/>
                    <RatingItem label="Communcation" rating={reviewScoresCommunication}/>
                    <RatingItem label="Location" rating={reviewScoresLocation}/>
                    <RatingItem label="Value" rating={reviewScoresValue}/>
                    <RatingItem label="Overall Rating" rating={reviewScoresRating}/>                    
                    <div style={{float: 'right', margin: '10px'}}>Reviews per month: {reviewsPerMonth || 0}</div>
                </div>
            </Panel>
        );
    }
}

export default withStyles(styles)(ListingInfoPanel);