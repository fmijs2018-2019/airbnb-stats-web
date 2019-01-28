import { createStyles, Theme, WithStyles, withStyles, Typography, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import * as React from 'react';
import '../../../index.css';
import ExpPanel from '../../../components/ExpPanel';
import { IFilters, INeighborhoodFilter } from 'src/models/grid/filtersData';
import * as _ from 'lodash';

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
    },
    button: {
        margin: theme.spacing.unit
    }
});

interface IListingFiltersProps extends WithStyles<typeof styles> {
    filters: IFilters;
    onNgChange: (id: string, checked: boolean) => void;
    onRTChange: (id: string, checked: boolean) => void;
    onPTChange: (id: string, checked: boolean) => void;
    onApply: () => void;
    onClear: () => void;
}

interface IListingFiltersState {
    expanded: string,
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

    onNeighborhoodChange = (id: string) => (event: {}, checked: boolean) => {
        this.props.onNgChange(id, checked);
    }

    onPropertyTypeChange = (id: string) => (event: {}, checked: boolean) => {
        this.props.onPTChange(id, checked);
    }

    onRoomTypeChange = (id: string) => (event: {}, checked: boolean) => {
        this.props.onRTChange(id, checked);
    }

    applyHandler = () => {
        this.props.onApply();
    }

    clearHandler = () => {
        this.props.onClear();
    }

    render() {
        const { classes, filters: { neighborhoodFilter: neighborhoods, roomTypeFilter: roomTypes, propertyTypeFilter: propertyTypes } } = this.props;
        const { expanded } = this.state;

        return <React.Fragment>
            <ExpPanel
                className={classes.expansionPanel}
                expanded={expanded === 'panel1'}
                onChange={this.createOnExpandHandler('panel1')}
                summary={<Typography>Neighborhood</Typography>}>
                {Object.keys(neighborhoods).map(key => {
                    const ng = neighborhoods[key];
                    return <div key={key} className={classes.checkbox}>
                        <FormControlLabel
                            control={<Checkbox checked={ng.checked} onChange={this.onNeighborhoodChange(key)} color="primary" value={key} />}
                            label={ng.name} />
                    </div>
                })}
            </ExpPanel>
            <ExpPanel
                className={classes.expansionPanel}
                expanded={expanded === 'panel2'}
                onChange={this.createOnExpandHandler('panel2')}
                summary={<Typography>Room Type</Typography>}>
                {Object.keys(roomTypes).map(key => {
                    const rt = roomTypes[key];
                    return <div key={key} className={classes.checkbox}>
                        <FormControlLabel
                            control={<Checkbox checked={rt.checked} onChange={this.onRoomTypeChange(key)} color="primary" value={key} />}
                            label={rt.type} />
                    </div>
                })}
            </ExpPanel>
            <ExpPanel
                className={classes.expansionPanelLast}
                expanded={expanded === 'panel3'}
                onChange={this.createOnExpandHandler('panel3')}
                summary={<Typography>Property Type</Typography>}>
                {Object.keys(propertyTypes).map(key => {
                    const pt = propertyTypes[key];
                    return <div key={key} className={classes.checkbox}>
                        <FormControlLabel
                            control={<Checkbox checked={pt.checked} onChange={this.onPropertyTypeChange(key)} color="primary" value={key} />}
                            label={pt.type} />
                    </div>
                })}
            </ExpPanel>
            <Button variant="outlined" color="primary" onClick={this.clearHandler} className={classes.button}>Clear</Button>
            <Button variant="contained" color="primary" onClick={this.applyHandler} className={classes.button}>Apply</Button>
        </React.Fragment>;
    }
}

export default withStyles(styles)(ListingsFilters);