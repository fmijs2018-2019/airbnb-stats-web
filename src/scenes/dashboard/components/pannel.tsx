import * as React from 'react';
import { Charts } from './charts';
import { Close } from '@material-ui/icons';
import { INeighborhoodReport } from 'src/models/neighborhoods/neighborhood';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core';

interface IPanelProps extends WithStyles<typeof styles> {
    data: INeighborhoodReport,
    total: number
    clickHandler: () => void
}

const styles = (theme: Theme) => createStyles({
    button: {
        top: 0,
        right: 0,
        margin: '5px',
        //border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
        //borderRadius: '50%',
        position: 'absolute',
        '&:hover': {
            backgroundColor: '#f5f5f5',
            cursor: 'pointer'
        }
    }
});

class Pannel extends React.Component<IPanelProps> {
    render() {
        return <div className="dashboard-pannel">
            <div>
                <p style={{ margin: "20px", textAlign: "center" }}>{this.props.data.name}</p>
                <Close className={this.props.classes.button} onClick={this.props.clickHandler} />
                <div style={{ textAlign: "right", margin: "15px" }}>total: {this.props.total}</div>
            </div>
            <Charts data={this.props.data} />
        </div>
    }
}

export default withStyles(styles)(Pannel);