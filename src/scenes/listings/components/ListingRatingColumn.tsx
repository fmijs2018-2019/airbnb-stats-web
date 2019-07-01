import { Theme, createStyles, WithStyles, withStyles, Chip } from '@material-ui/core';
import AssessmentIcon from '@material-ui/icons/AssessmentOutlined'
import * as React from 'react';

const styles = (theme: Theme) => createStyles({
    orageChip: {
        color: '#ffc107',
        border: '1px solid #ffc107',
    },
    orageIcon: {
        color: '#ffc107',
    },
    redChip: {
        color: '#dc3545',
        border: '1px solid #dc3545',
    },
    redIcon: {
        color: '#dc3545',
    },
    greenChip: {
        color: '#28a745',
        border: '1px solid #28a745',
    },
    greenIcon: {
        color: '#28a745',
    }
})

interface IListingRatingColumnProps extends WithStyles<typeof styles> {
    rating: number;
}

const ListingRatingColumn = (props: IListingRatingColumnProps) => {
    const { rating, classes } = props;
    let chipClasses: any;
    if (rating > 87) {
        chipClasses = { root: classes.greenChip, icon: classes.greenIcon };
    } else if (rating > 68) {
        chipClasses = { root: classes.orageChip, icon: classes.orageIcon };
    } else {
        chipClasses = { root: classes.redChip, icon: classes.redIcon };
    }

    return <Chip
        classes={chipClasses}
        label={`${rating}/100`}
        icon={<AssessmentIcon />}
        variant="outlined"
    />

	
}

export default withStyles(styles)(ListingRatingColumn);