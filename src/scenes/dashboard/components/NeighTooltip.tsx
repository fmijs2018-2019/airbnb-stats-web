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
        color: 'rgb(65, 62, 160);'
    }
});

export interface INeighTooltipProps {
    x: number;
    y: number;
    ngName: string;
    listCount: number;
}

const NeighTooltip: React.SFC<INeighTooltipProps & WithStyles<typeof styles>> = (props) => {
    const { ngName, listCount, x, y, classes: { tooltip, icon } } = props;

    let pos: any = {};
    let xPos = 'left';
    let xVal = x;
    let yPos = 'top';
    let yVal = y;
    const { innerWidth: width, innerHeight: height } = window;
    
    if (width - x < 200) {
        xPos = 'right';
        xVal = width - x;
    } 
    if (height - y < 60) {
        yPos = 'bottom';
        yVal = height - y;
    }

    pos[xPos] = xVal;
    pos[yPos] = yVal;

    return <div className={tooltip} style={pos}>
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