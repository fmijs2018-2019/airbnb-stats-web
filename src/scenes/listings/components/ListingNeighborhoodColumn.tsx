import { Theme, createStyles, WithStyles, withStyles, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn'
import * as React from 'react';

const styles = (theme: Theme) => createStyles({
    icon: {
        color: 'rosybrown',
    },
    root: {
        border: '1px solid rosybrown',
    }
})

interface ILisingNeighborhoodProps extends WithStyles<typeof styles> {
    neighborhood: string;
}

const ListingNeighborhoodColumn = (props: ILisingNeighborhoodProps) => {
    const { neighborhood, classes } = props;
    return <Chip
        classes={classes as any}
        label={neighborhood}
        icon={<LocationOnIcon />}
        variant="outlined" />
}

export default withStyles(styles)(ListingNeighborhoodColumn);