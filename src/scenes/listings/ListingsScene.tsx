import { createStyles, WithStyles, withStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import ListingsTable, { listings } from './components/ListingsTable'
import { IListingTableDto } from 'src/models/listings/ListingTableDto';
import ListingsFilters from './components/ListingsFilters';
import { IFiltersData } from 'src/models/grid/filtersData';
import { IApplicationState } from 'src/redux/store';
import { fetchFiltersData } from 'src/redux/actions/listingsGridActions';
import { connect } from 'react-redux';

const styles = createStyles({
    listingsFilters: {
        top: '50px',
        left: 0,
        bottom: 0,
        width: '20%',
        position: 'absolute',
        display: 'inline-block',
    },
    listingsTable: {
        top: '50px',
        right: 0,
        bottom: 0,
        width: '80%',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '1px solid rgba(224, 224, 224)'
    },
    filtersContainer: {
        margin: 'auto',
        width: '80%',
    }
})

interface IListingsSceneStateProps {
    filtersData: IFiltersData | null
}

interface IListingsSceneActionProps {
    fetchFiltersData: () => Promise<IFiltersData[]>
}

interface IListingsSceneProps extends IListingsSceneStateProps, IListingsSceneActionProps, WithStyles<typeof styles> {
}

class ListingsScene extends React.Component<IListingsSceneProps> {
    componentDidMount() {
        this.props.fetchFiltersData();
    }

    render() {
        const { classes, filtersData } = this.props;
        const rows = listings.map(v => {
            const row: IListingTableDto = {
                id: v.id,
                name: v.name,
                neighborhood: v.neighborhood,
                neighborhoodOverview: v.neighborhood_overview,
                price: v.price,
                type: {
                    propertyType: v.property_type,
                    roomType: v.room_type,
                },
                accommodates: v.accommodates,
                rating: v.rating,
            };
            return row;
        })
        return <React.Fragment>
            <div className={classes.listingsFilters}>
                <div className={classes.filtersContainer}>
                    <Typography style={{ marginTop: '20px', textAlign: 'center' }} variant="h6" >Filters</Typography>
                    {filtersData && <ListingsFilters filtersData={filtersData} />}
                </div>
            </div>
            <div className={classes.listingsTable}>
                <ListingsTable listings={rows} />
            </div>
        </React.Fragment>
    }
};

const mapStateToProps = (state: IApplicationState) => {
    return {
        filtersData: state.listingsGrid.filtersData
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    fetchFiltersData: (): Promise<IFiltersData[]> => dispatch(fetchFiltersData()),
});

const sceneWithStyles = withStyles(styles)(ListingsScene);

export default connect<IListingsSceneStateProps, IListingsSceneActionProps>(mapStateToProps, mapDispatchToProps)(sceneWithStyles);

