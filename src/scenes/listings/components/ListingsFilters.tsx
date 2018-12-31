import { createStyles, Theme, WithStyles, withStyles, Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import classNames from 'classnames';
import * as React from 'react';
import '../../../index.css';
import ExpPanel from '../../../components/ExpPanel';

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

const neigh = [{ "id": 1, "name": "Bijlmer-Centrum" }, { "id": 2, "name": "Bijlmer-Oost" }, { "id": 3, "name": "Bos en Lommer" }, { "id": 4, "name": "Buitenveldert - Zuidas" }, { "id": 5, "name": "Centrum-Oost" }, { "id": 6, "name": "Centrum-West" }, { "id": 7, "name": "De Aker - Nieuw Sloten" }, { "id": 8, "name": "De Baarsjes - Oud-West" }, { "id": 9, "name": "De Pijp - Rivierenbuurt" }, { "id": 10, "name": "Gaasperdam - Driemond" }, { "id": 11, "name": "Geuzenveld - Slotermeer" }, { "id": 12, "name": "IJburg - Zeeburgereiland" }, { "id": 13, "name": "Noord-Oost" }, { "id": 14, "name": "Noord-West" }, { "id": 15, "name": "Oostelijk Havengebied - Indische Buurt" }, { "id": 16, "name": "Osdorp" }, { "id": 17, "name": "Oud-Noord" }, { "id": 18, "name": "Oud-Oost" }, { "id": 19, "name": "Slotervaart" }, { "id": 20, "name": "Watergraafsmeer" }, { "id": 21, "name": "Westerpark" }, { "id": 22, "name": "Zuid" }];

class ListingFilters extends React.Component<WithStyles<typeof styles>, { expanded: string }> {
    constructor(props: any) {
        super(props);
        this.state = { expanded: 'panel2' };
    }

    createOnExpandHandler = (pannel: string) => (expanded: boolean) => {
        this.setState({
            expanded: expanded ? pannel : ''
        });
    }

    render() {
        const { classes } = this.props;
        const { expanded } = this.state;

        return <React.Fragment>
            <ExpPanel
                className={classes.expansionPanel}
                expanded={expanded === 'panel1'}
                onChange={this.createOnExpandHandler('panel1')}
                summary={<Typography>Neighborhood</Typography>}>
                {neigh.map(n => {
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
                {neigh.map(n => {
                    return <div key={n.id} className={classes.checkbox}>
                        <FormControlLabel
                            control={<Checkbox color="primary" value={n.id} />}
                            label={n.name} />
                    </div>
                })}
            </ExpPanel>
            <ExpPanel
                className={classes.expansionPanelLast}
                expanded={expanded === 'panel3'}
                onChange={this.createOnExpandHandler('panel3')}
                summary={<Typography>Property Type</Typography>}>
                {neigh.map(n => {
                    return <div key={n.id} className={classes.checkbox}>
                        <FormControlLabel
                            control={<Checkbox color="primary" value={n.id} />}
                            label={n.name} />
                    </div>
                })}
            </ExpPanel>
        </React.Fragment>;
    }
}

export default withStyles(styles)(ListingFilters);