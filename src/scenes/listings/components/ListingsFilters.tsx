import { createStyles, Theme, WithStyles, withStyles, Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import classNames from 'classnames';
import * as React from 'react';
import '../../../index.css';
import ExpPanel from '../../../components/ExpPanel';
import { IFiltersData } from 'src/models/grid/filtersData';

const styles = (theme: Theme) => createStyles({
    sidebar: {
        width: '20%',
    },
    checkbox: {
        display: 'block',
        textAlign: 'left',
    },
    expansionPanel: {
        borderTop: '1px solid rgba(224, 224, 224)',
    },
    expansionPanelLast: {
        borderTop: '1px solid rgba(224, 224, 224)',
        borderBottom: '1px solid rgba(224, 224, 224)',
    }
});

interface IListingFiltersProps extends WithStyles<typeof styles> {
    filtersData: IFiltersData;
}

interface IListingFiltersState {
    expanded: string;
}

class ListingsFilters extends React.Component<IListingFiltersProps, IListingFiltersState> {
    constructor(props: Readonly<IListingFiltersProps>) {
        super(props);
        this.state = { expanded: 'panel2' };
    }

    createOnExpandHandler = (pannel: string) => (expanded: boolean) => {
        this.setState({
            expanded: expanded ? pannel : ''
        });
    }

    render() {
        const { classes, filtersData: { neighborhoods, roomTypes, propertyTypes } } = this.props;
        const { expanded } = this.state;

        return <React.Fragment>
            <ExpPanel
                className={classes.expansionPanel}
                expanded={expanded === 'panel1'}
                onChange={this.createOnExpandHandler('panel1')}
                summary={<Typography>Neighborhood</Typography>}>
                {neighborhoods.map(n => {
                    return <div key={n.id} className={classes.checkbox}>
                        <FormControlLabel
                            control={<Checkbox color="primary" value={n.id} />}
                            label={n.name} />
                    </div>
                })}
            </ExpPanel>
            <ExpPanel
                className={classes.expansionPanel}
                expanded={expanded === 'panel2'}
                onChange={this.createOnExpandHandler('panel2')}
                summary={<Typography>Room Type</Typography>}>
                {roomTypes.map(n => {
                    return <div key={n.id} className={classes.checkbox}>
                        <FormControlLabel
                            control={<Checkbox color="primary" value={n.id} />}
                            label={n.type} />
                    </div>
                })}
            </ExpPanel>
            <ExpPanel
                className={classes.expansionPanelLast}
                expanded={expanded === 'panel3'}
                onChange={this.createOnExpandHandler('panel3')}
                summary={<Typography>Property Type</Typography>}>
                {propertyTypes.map(n => {
                    return <div key={n.id} className={classes.checkbox}>
                        <FormControlLabel
                            control={<Checkbox color="primary" value={n.id} />}
                            label={n.type} />
                    </div>
                })}
            </ExpPanel>
        </React.Fragment>;
    }
}

export default withStyles(styles)(ListingsFilters);