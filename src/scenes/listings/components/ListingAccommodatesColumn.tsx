import * as React from 'react';
import { GroupOutlined } from '@material-ui/icons';
import { Badge, createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    badge: {
        top: 0,
        right: '-20px',
        fontSize: '0.9rem',
    }
});

interface IListingAccommodatesColumnProps extends WithStyles<typeof styles> {
    accommodates: number;
}

const ListingAccommodatesColumn = (props: IListingAccommodatesColumnProps) => {
    const { accommodates, classes } = props;
    return <Badge badgeContent={`x${accommodates}`} color="default" classes={classes}>
        <GroupOutlined />
    </Badge>
}

export default withStyles(styles)(ListingAccommodatesColumn);