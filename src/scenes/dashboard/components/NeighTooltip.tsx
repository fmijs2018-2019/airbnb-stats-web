import * as React from 'react';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core';
import PlaceRounded from '@material-ui/icons/PlaceRounded'

const styles = (theme: Theme) => createStyles({
    tooltip: {
        backgroundColor: 'white',
        color: 'black',
        padding: '10px',
        position: 'absolute',
        zIndex: 99999,
        pointerEvents: 'none',
        opacity: 0.9,
        borderRadius: '5px',
    },
    icon: {
        color: 'rgba(255, 0, 170, 255)'
    }
});

export interface NeighTooltipProps {
    x: number;
    y: number;
    ngName: string;
    listCount: number;
}

const NeighTooltip: React.SFC<NeighTooltipProps & WithStyles<typeof styles>> = (props) => {
    const { ngName, listCount, x, y, classes: { tooltip, icon } } = props;
    return <div className={tooltip} style={{ left: x, top: y }}>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
            <div><PlaceRounded fontSize="large" classes={{ root: icon }} /></div>
            <div>
                <div>{ngName}</div>
                <div>listings: {listCount}</div>
            </div>
        </div>
    </div>
}

export default withStyles(styles)(NeighTooltip);