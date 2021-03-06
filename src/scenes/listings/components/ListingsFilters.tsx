import { Theme, createStyles, WithStyles, FormControlLabel, Button, withStyles, Typography, Badge, Checkbox } from "@material-ui/core";
import { IFilters } from "../../../models/grid/filtersData";
import React from "react";
import ExpPanel from "../../../components/ExpPanel";
import FromToDatePicker from "../../../components/FromToDatePicker";
import NumberRange from "../../../components/NumberRange";

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
    fromDate?: string;
    toDate?: string;
    fromPrice?: number;
    toPrice?: number;
    onFromPriceChange: (from: number) => void;
    onToPriceChange: (from: number) => void;
    onNgChange: (id: string, checked: boolean) => void;
    onRTChange: (id: string, checked: boolean) => void;
    onPTChange: (id: string, checked: boolean) => void;
    onFromDateChange: (newDate: string) => void;
    onToDateChange: (newDate: string) => void;
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

    getFiltersCount = (filtersCollection: any) => {
        let count = 0;
        Object.keys(filtersCollection).forEach(key => {
            if (filtersCollection[key].checked) {
                count++;
            }
        });

        return count;
    }

    render() {
        const { classes, onApply, onClear, fromDate, toDate, fromPrice, toPrice,
            onFromDateChange, onToDateChange, onFromPriceChange, onToPriceChange,
            filters: {
                neighborhoodFilter: neighborhoods,
                roomTypeFilter: roomTypes,
                propertyTypeFilter: propertyTypes } } = this.props;
        const { expanded } = this.state;
        const ngFiltersCount = this.getFiltersCount(neighborhoods);
        const rtFiltersCount = this.getFiltersCount(roomTypes);
        const ptFiltersCount = this.getFiltersCount(propertyTypes);

        return <React.Fragment>
            <ExpPanel
                className={classes.expansionPanel}
                expanded={expanded === 'panel1'}
                onChange={this.createOnExpandHandler('panel1')}
                summary={
                    <Badge badgeContent={ngFiltersCount} color="primary" invisible={ngFiltersCount === 0}>
                        <Typography>Neighborhood</Typography>
                    </Badge>
                }>
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
                summary={
                    <Badge badgeContent={rtFiltersCount} color="primary" invisible={rtFiltersCount === 0}>
                        <Typography>Room Type</Typography>
                    </Badge>
                }>
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
                className={classes.expansionPanel}
                expanded={expanded === 'panel3'}
                onChange={this.createOnExpandHandler('panel3')}
                summary={
                    <Badge badgeContent={ptFiltersCount} color="primary" invisible={ptFiltersCount === 0}>
                        <Typography>Property Type</Typography>
                    </Badge>
                }>
                {Object.keys(propertyTypes).map(key => {
                    const pt = propertyTypes[key];
                    return <div key={key} className={classes.checkbox}>
                        <FormControlLabel
                            control={<Checkbox checked={pt.checked} onChange={this.onPropertyTypeChange(key)} color="primary" value={key} />}
                            label={pt.type} />
                    </div>
                })}
            </ExpPanel>
            <ExpPanel
                className={classes.expansionPanel}
                expanded={expanded === 'panel4'}
                onChange={this.createOnExpandHandler('panel4')}
                summary={<Typography>Availability Range</Typography>}>
                <FromToDatePicker
                    from={fromDate}
                    to={toDate}
                    fromChangeHandler={onFromDateChange}
                    toChangeHandler={onToDateChange}
                ></FromToDatePicker>
            </ExpPanel>
            <ExpPanel
                className={classes.expansionPanelLast}
                expanded={expanded === 'panel5'}
                onChange={this.createOnExpandHandler('panel5')}
                summary={<Typography>Price Range</Typography>}>
                <NumberRange
                    onFromChange={onFromPriceChange}
                    onToChange={onToPriceChange}
                    from={fromPrice}
                    to={toPrice}
                />
            </ExpPanel>
            <Button variant="outlined" color="primary" onClick={onClear} className={classes.button}>Clear</Button>
            <Button variant="contained" color="primary" onClick={onApply} className={classes.button}>Apply</Button>
        </React.Fragment >;
    }
}

export default withStyles(styles)(ListingsFilters);