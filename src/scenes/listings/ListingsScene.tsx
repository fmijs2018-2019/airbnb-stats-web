import { createStyles, WithStyles, withStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import ListingsTable from './components/ListingsTable'
import { IListingTableDto } from 'src/models/listings/ListingTableDto';
import ListingsFilters from './components/ListingsFilters';
import { IFilters } from 'src/models/grid/filtersData';
import { IApplicationState } from 'src/redux/store';
import { fetchFiltersData, setNeighborhoodsFilter, setPropertyTypesFilter, setRoomTypesFilter, fetchTableData, setPage, setPageSize, setOrder, setOrderBy, clearFilters, setFromDate, setToDate, setFromPrice, setToPrice } from 'src/redux/actions/listingsGridActions';
import { connect } from 'react-redux';
import { IListing } from 'src/models/listings/Listing';
import Layout from 'src/Layout';

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

interface IListingsSceneStateProps extends IFilters {
    listings: IListing[] | null;
    currentPage: number;
    totalCount: number;
    pageSize: number;
    numberOfPages: number;
    order: 'asc' | 'desc';
    orderBy: string;
    fromDate?: string;
    toDate?: string;
    fromPrice?: number,
    toPrice?: number
}

interface IListingsSceneActionProps {
    fetchFiltersData: () => Promise<IFilters[]>
    setNeighborhoodFilter: (id: string, checked: boolean) => void;
    setPropertyTypeFilter: (id: string, checked: boolean) => void;
    setRoomTypeFilter: (id: string, checked: boolean) => void;
    setPage: (page: number) => void;
    setPageSize: (size: number) => void;
    setOrder: (order: 'asc' | 'desc') => void;
    setOrderBy: (orderBy: string) => void;
    setFromDate: (newDate: string) => void;
    setToDate: (newDate: string) => void;
    setFromPrice: (price: number) => void;
    setToPrice: (price: number) => void;
    clearFilters: () => void;
    fetchTableData: () => Promise<{ total_count: number, listings: IListing[] }>;
}

interface IListingsSceneProps extends IListingsSceneStateProps, IListingsSceneActionProps, WithStyles<typeof styles> {
}

class ListingsScene extends React.Component<IListingsSceneProps> {
    componentDidMount() {
        this.props.fetchFiltersData();
        this.props.fetchTableData();
    }

    render() {
        const { classes, roomTypeFilter, propertyTypeFilter, neighborhoodFilter, listings, pageSize,
                numberOfPages, totalCount, currentPage, fromDate, toDate, fromPrice, toPrice } = this.props;
        const filters: IFilters = { roomTypeFilter, propertyTypeFilter, neighborhoodFilter }
        const rows = (listings || []).map(v => {
            const row: IListingTableDto = {
                id: v.id,
                name: v.name,
                neighborhood: v.neighborhood,
                neighborhoodOverview: v.neighborhood_overview,
                price: v.price,
                type: {
                    propertyType: v.propertytype,
                    roomType: v.roomtype,
                },
                accommodates: v.accommodates,
                rating: v.rating,
            };
            return row;
        })
        return <Layout>
            <div className={classes.listingsFilters}>
                <div className={classes.filtersContainer}>
                    <Typography style={{ marginTop: '20px', textAlign: 'center' }} variant="h6" >Filters</Typography>
                    {filters && <ListingsFilters
                        filters={filters}
                        fromDate={fromDate}
                        toDate={toDate}
                        fromPrice={fromPrice}
                        toPrice={toPrice}
                        onFromDateChange={this.onFromDateChange}
                        onToDateChange={this.onToDateChange}
                        onFromPriceChange={this.onFromPriceChange}
                        onToPriceChange={this.onToPriceChange}
                        onPTChange={this.props.setPropertyTypeFilter}
                        onRTChange={this.props.setRoomTypeFilter}
                        onNgChange={this.props.setNeighborhoodFilter}
                        onApply={this.applyFilters}
                        onClear={this.clearFilters} />}
                </div>
            </div>
            <div className={classes.listingsTable}>
                <ListingsTable
                    totalCount={totalCount}
                    numberOfPages={numberOfPages}
                    currentPage={currentPage}
                    pageSize={pageSize} listings={rows}
                    onPageChange={this.onPageChange}
                    onPageSizeChange={this.onPageSizeChange}
                    onSort={this.sortHandler}
                    order={this.props.order}
                    orderBy={this.props.orderBy} />
            </div>
        </Layout>
    }

    onPageChange = (page: number) => {
        if (page < 0) {
            page = 0;
        }
        this.props.setPage(page);
        this.props.fetchTableData();
    }

    onPageSizeChange = (size: number) => {
        this.props.setPageSize(size);
        this.props.setPage(0);
        this.props.fetchTableData();
    }

    applyFilters = () => {
        this.props.fetchTableData();
    }

    clearFilters = () => {
        this.props.clearFilters();
        this.props.fetchTableData();
    }

    sortHandler = (orderBy: string, order: 'asc' | 'desc') => {
        this.props.setOrder(order);
        this.props.setOrderBy(orderBy);
        this.props.fetchTableData();
    }

    onFromDateChange = (newDate: string) => {
        this.props.setFromDate(newDate);
    }

    onToDateChange = (newDate: string) => {
        this.props.setToDate(newDate);
    }

    onFromPriceChange = (value: number) => {
        this.props.setFromPrice(value);
    }

    onToPriceChange = (value: number) => {
        this.props.setToPrice(value);
    }
};

const mapStateToProps = (state: IApplicationState) => {
    return {
        roomTypeFilter: state.listingsGrid.roomTypeFilter,
        propertyTypeFilter: state.listingsGrid.propertyTypeFilter,
        neighborhoodFilter: state.listingsGrid.neighborhoodFilter,
        listings: state.listingsGrid.listings,
        numberOfPages: state.listingsGrid.numberOfPages,
        totalCount: state.listingsGrid.totalCount,
        currentPage: state.listingsGrid.currentPage,
        pageSize: state.listingsGrid.pageSize,
        order: state.listingsGrid.order,
        orderBy: state.listingsGrid.orderBy,
        fromDate: state.listingsGrid.fromDate,
        toDate: state.listingsGrid.toDate,
        fromPrice: state.listingsGrid.fromPrice,
        toPrice: state.listingsGrid.toPrice
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    fetchFiltersData: (): Promise<IFilters[]> => dispatch(fetchFiltersData()),
    setNeighborhoodFilter: (id: string, checked: boolean) => dispatch(setNeighborhoodsFilter(id, checked)),
    setPropertyTypeFilter: (id: string, checked: boolean) => dispatch(setPropertyTypesFilter(id, checked)),
    setRoomTypeFilter: (id: string, checked: boolean) => dispatch(setRoomTypesFilter(id, checked)),
    setPage: (page: number) => dispatch(setPage(page)),
    setPageSize: (size: number) => dispatch(setPageSize(size)),
    setOrder: (order: 'asc' | 'desc') => dispatch(setOrder(order)),
    setOrderBy: (orderBy: string) => dispatch(setOrderBy(orderBy)),
    setFromDate: (newDate: string) => dispatch(setFromDate(newDate)),
    setToDate: (newDate: string) => dispatch(setToDate(newDate)),
    setFromPrice: (price: number) => dispatch(setFromPrice(price)),
    setToPrice: (price: number) => dispatch(setToPrice(price)),
    clearFilters: () => dispatch(clearFilters()),
    fetchTableData: (): Promise<{ total_count: number, listings: IListing[] }> => dispatch(fetchTableData()),
});

const sceneWithStyles = withStyles(styles)(ListingsScene);

export default connect<IListingsSceneStateProps, IListingsSceneActionProps>(mapStateToProps, mapDispatchToProps)(sceneWithStyles);

