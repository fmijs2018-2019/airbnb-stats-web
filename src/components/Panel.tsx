import * as React from 'react';
import Close from '@material-ui/icons/CancelRounded';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core';

interface IPanelProps extends WithStyles<typeof styles> {
    header: string | React.ReactNode;
    clickHandler: () => void
}

const styles = (theme: Theme) => createStyles({
    pannel: {
        width: '300px',
        borderRadius: '10px',
        top: '70px',
        right: '20px',
        background: '#fff',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
    },
    closeBtn: {
        float: 'right',
        color: 'rgba(32, 35, 42, 0.8)',
        fontSize: '25px',
        marginTop: '2px',
        marginRight: '2px',
        "&:hover": {
            color: 'rgba(247, 19, 72, .9)',
            cursor: 'pointer'
        }
    },
    closeBtnContainer: {
        height: '15px'
    },
    content: {
        margin: '7px 12px 7px 12px',
        overflowY: 'auto',
        flexGrow: 1,
    },
    header: {
        fontSize: '1.25em',
        textAlign: 'center',
        padding: '0 20px 0 20px',
        color: 'rgba(32, 35, 42, 0.9)'
    }
});

class Pannel extends React.Component<IPanelProps> {
    render() {
        const { classes } = this.props;
        return <div className={classes.pannel}>
            <div className={classes.closeBtnContainer}>
                <Close className={classes.closeBtn} onClick={this.props.clickHandler} />
            </div>
            <div className={classes.header}>
                {this.props.header}
            </div>
            <div className={classes.content}>
                {this.props.children}
            </div>
        </div>
    }
}

export default withStyles(styles)(Pannel);