import { createStyles, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, withStyles, WithStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as React from 'react';
import classNames from 'classnames';

const styles = createStyles({
    root: {
        margin: 0,
        boxShadow: 'none',
        '&:before': {
            display: 'none',
        }
    },
    panelDetails: {
        maxHeight: '150px',
        overflowY: 'auto'
    }
})

interface IExpPanelProps extends WithStyles<typeof styles> {
    summary: React.ReactNode;
    expanded: boolean;
    onChange: (expanded: boolean) => void;
    children: React.ReactNode;
    className?: string;
}

const ExpPanel: React.SFC<IExpPanelProps> = (props) => {
    const { expanded, onChange, summary, children, classes, className } = props;
    const expansionPanelClassName = classNames(classes.root, className);

    return <ExpansionPanel className={expansionPanelClassName} expanded={expanded} onChange={(e: any, b: boolean) => onChange(b)}>
        <ExpansionPanelSummary  expandIcon={<ExpandMoreIcon />}>
            {summary}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <div className={classes.panelDetails}>{children}</div>
        </ExpansionPanelDetails>
    </ExpansionPanel>
}

export default withStyles(styles)(ExpPanel);