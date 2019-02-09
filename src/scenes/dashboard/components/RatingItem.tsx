import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import Rating from 'react-rating';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';

const styles = (theme: Theme) => createStyles({
    rating: {
        float: 'right'
    },
    label: {
        position: 'relative',
        top: '2px'
    },
    noRate: {
        color: 'grey',
        fontStyle: 'italic',
        float: 'right'
    }
});

interface IRatingItemProps extends WithStyles<typeof styles> {
    label: string,
    rating: number | null
};

function RatingItem(props: IRatingItemProps) {
    const { label, rating, classes } = props;

    return (<div style={{ margin: '10px' }}>
        <span className={classes.label}>{label}:</span>
        {rating && <span className={classes.rating}><Rating
            initialRating={rating}
            fractions={2}
            emptySymbol={<StarBorder style={{ color: '#d8b804' }} />}
            fullSymbol={<Star style={{ color: '#d8b804' }} />}
            start={0}
            stop={10}
            step={2}
            readonly
        /></span> || <span className={classes.noRate}>No rate</span>}
    </div>)
}

export default withStyles(styles)(RatingItem);
