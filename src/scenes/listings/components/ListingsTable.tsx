import { createStyles, Theme, WithStyles, withStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import { Index } from 'react-virtualized';
import VirtualizedTable, { IVirtualizedColumn } from 'src/components/VirtualizedTable';
import { IListing } from 'src/models/listings/Listing';
import { IListingTableDto } from 'src/models/listings/ListingTableDto';
import ListingAccommodatesColumn from './ListingAccommodatesColumn';
import ListingNeighborhoodColumn from './ListingNeighborhoodColumn';
import ListingRatingColumn from './ListingRatingColumn';
import ListingTypeColumn from './ListingTypeColumn';
import TablePaging from 'src/components/TablePaging';


export const listings: IListing[] = [
    { "id": 7753468, "name": "Cozy top floor canal apartment", "street": "Amsterdam, Noord-Holland, Netherlands", "neighborhood_overview": null, "price": 175, "neighborhood": "Centrum-Oost", "property_type": "Apartment", "room_type": "Entire home/apt", "accommodates": 4, "rating": 100 },
    { "id": 97221, "name": "Beautiful and spacious room", "street": "Amsterdam, North Holland, Netherlands", "neighborhood_overview": null, "price": 65, "neighborhood": "Slotervaart", "property_type": "Bed and breakfast", "room_type": "Private room", "accommodates": 2, "rating": 88 },
    { "id": 97476, "name": "Sunny, spacious apartment near Vondelpark", "street": "Amsterdam, North Holland, Netherlands", "neighborhood_overview": "My street is one where a lot of families live and there are a lot of shops and restaurants nearby. I live very close to Vondelpark, cities most famous park.", "price": 115, "neighborhood": "Zuid", "property_type": "Apartment", "room_type": "Shared room", "accommodates": 2, "rating": 97 },
    { "id": 97476, "name": "Sunny, spacious apartment near Vondelpark", "street": "Amsterdam, North Holland, Netherlands", "neighborhood_overview": "My street is one where a lot of families live and there are a lot of shops and restaurants nearby. I live very close to Vondelpark, cities most famous park.", "price": 115, "neighborhood": "Zuid", "property_type": "Apartment", "room_type": "Entire home/apt", "accommodates": 2, "rating": 97 },
    { "id": 97476, "name": "Sunny, spacious apartment near Vondelpark", "street": "Amsterdam, North Holland, Netherlands", "neighborhood_overview": "My street is one where a lot of families live and there are a lot of shops and restaurants nearby. I live very close to Vondelpark, cities most famous park.", "price": 115, "neighborhood": "Zuid", "property_type": "Apartment", "room_type": "Entire home/apt", "accommodates": 2, "rating": 97 },
    { "id": 97476, "name": "Sunny, spacious apartment near Vondelpark", "street": "Amsterdam, North Holland, Netherlands", "neighborhood_overview": "My street is one where a lot of families live and there are a lot of shops and restaurants nearby. I live very close to Vondelpark, cities most famous park.", "price": 115, "neighborhood": "Zuid", "property_type": "Apartment", "room_type": "Entire home/apt", "accommodates": 2, "rating": 97 },
    { "id": 97476, "name": "Sunny, spacious apartment near Vondelpark", "street": "Amsterdam, North Holland, Netherlands", "neighborhood_overview": "My street is one where a lot of families live and there are a lot of shops and restaurants nearby. I live very close to Vondelpark, cities most famous park.", "price": 115, "neighborhood": "Zuid", "property_type": "Apartment", "room_type": "Entire home/apt", "accommodates": 2, "rating": 97 },
    { "id": 97476, "name": "Sunny, spacious apartment near Vondelpark", "street": "Amsterdam, North Holland, Netherlands", "neighborhood_overview": "My street is one where a lot of families live and there are a lot of shops and restaurants nearby. I live very close to Vondelpark, cities most famous park.", "price": 115, "neighborhood": "Zuid", "property_type": "Apartment", "room_type": "Entire home/apt", "accommodates": 2, "rating": 97 },
    { "id": 97476, "name": "Sunny, spacious apartment near Vondelpark", "street": "Amsterdam, North Holland, Netherlands", "neighborhood_overview": "My street is one where a lot of families live and there are a lot of shops and restaurants nearby. I live very close to Vondelpark, cities most famous park.", "price": 115, "neighborhood": "Zuid", "property_type": "Apartment", "room_type": "Entire home/apt", "accommodates": 2, "rating": 97 },
    { "id": 97476, "name": "Sunny, spacious apartment near Vondelpark", "street": "Amsterdam, North Holland, Netherlands", "neighborhood_overview": "My street is one where a lot of families live and there are a lot of shops and restaurants nearby. I live very close to Vondelpark, cities most famous park.", "price": 115, "neighborhood": "Zuid", "property_type": "Apartment", "room_type": "Entire home/apt", "accommodates": 2, "rating": 97 },
    { "id": 97476, "name": "Sunny, spacious apartment near Vondelpark", "street": "Amsterdam, North Holland, Netherlands", "neighborhood_overview": "My street is one where a lot of families live and there are a lot of shops and restaurants nearby. I live very close to Vondelpark, cities most famous park.", "price": 115, "neighborhood": "Zuid", "property_type": "Apartment", "room_type": "Entire home/apt", "accommodates": 2, "rating": 97 },
    { "id": 97476, "name": "Sunny, spacious apartment near Vondelpark", "street": "Amsterdam, North Holland, Netherlands", "neighborhood_overview": "My street is one where a lot of families live and there are a lot of shops and restaurants nearby. I live very close to Vondelpark, cities most famous park.", "price": 115, "neighborhood": "Zuid", "property_type": "Apartment", "room_type": "Entire home/apt", "accommodates": 2, "rating": 97 },
    { "id": 97476, "name": "Sunny, spacious apartment near Vondelpark", "street": "Amsterdam, North Holland, Netherlands", "neighborhood_overview": "My street is one where a lot of families live and there are a lot of shops and restaurants nearby. I live very close to Vondelpark, cities most famous park.", "price": 115, "neighborhood": "Zuid", "property_type": "Apartment", "room_type": "Entire home/apt", "accommodates": 2, "rating": 97 },
    { "id": 97476, "name": "Sunny, spacious apartment near Vondelpark", "street": "Amsterdam, North Holland, Netherlands", "neighborhood_overview": "My street is one where a lot of families live and there are a lot of shops and restaurants nearby. I live very close to Vondelpark, cities most famous park.", "price": 115, "neighborhood": "Zuid", "property_type": "Apartment", "room_type": "Entire home/apt", "accommodates": 2, "rating": 97 },
    { "id": 97476, "name": "Sunny, spacious apartment near Vondelpark", "street": "Amsterdam, North Holland, Netherlands", "neighborhood_overview": "My street is one where a lot of families live and there are a lot of shops and restaurants nearby. I live very close to Vondelpark, cities most famous park.", "price": 115, "neighborhood": "Zuid", "property_type": "Apartment", "room_type": "Entire home/apt", "accommodates": 2, "rating": 97 }
]

const styles = (theme: Theme) => createStyles({
    paging: {
        float: 'right',
    }
});

interface IListingsTableProps extends WithStyles<typeof styles> {
    listings: IListingTableDto[];
}

class ListingsTable extends React.Component<IListingsTableProps, any> {
    state = {
        page: 0,
        rowsPerPage: 5,
        pagesCount: 27,
    }

    onPageSizeChange = (pageSize: number) => {
        this.setState({
            page: 0,
            rowsPerPage: pageSize,
        })
    }

    onPageChange = (page: number) => {
        this.setState({
            page
        });
    }

    getColumns = (): IVirtualizedColumn[] => {
        return [
            {
                width: 180,
                label: 'Type',
                dataKey: 'type',
                renderCell: ({ cellData }: any) => cellData && <ListingTypeColumn type={cellData} />,
                disableSort: true,
            },
            {
                width: 250,
                label: 'Name',
                dataKey: 'name',
                disableSort: true,
            },
            {
                width: 120,
                label: 'Price',
                dataKey: 'price',
                renderCell: ({ cellData }: any) => cellData && <div>${cellData.toFixed(2)}</div>,
            },
            {
                width: 200,
                label: 'Neighborhood',
                dataKey: 'neighborhood',
                renderCell: ({ cellData }: any) => cellData && <ListingNeighborhoodColumn neighborhood={cellData} />,
                disableSort: true,
            },
            {
                width: 400,
                label: 'Neighborhood Overview',
                dataKey: 'neighborhoodOverview',
                disableSort: true,
            },
            {
                width: 140,
                label: 'Accommodates',
                dataKey: 'accommodates',
                renderCell: ({ cellData }: any) => cellData && <ListingAccommodatesColumn accommodates={cellData} />,
            },
            {
                width: 120,
                label: 'Rating',
                dataKey: 'rating',
                flexGrow: 1,
                renderCell: ({ cellData }: any) => cellData && <ListingRatingColumn rating={cellData} />,
            },
        ]
    }

    render() {
        const { listings, classes } = this.props;
        const columns = this.getColumns();

        return (
            <React.Fragment>
                 <div style={{ width: '100%', padding: '20px 0 20px 20px', boxSizing: 'border-box' }}>
                    <Typography variant="h5">Listings</Typography>
                    <p style={{margin: 'initial', color: 'gray', fontSize: '14px'}}>{this.state.pagesCount} listings found</p>
                </div>
                <div style={{ flex: 1, overflowX: 'auto', width: '100%', borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
                    <div style={{ height: '100%', width: '1450px' }}>
                        <VirtualizedTable
                            sortable
                            rowHeight={70}
                            headerHeight={56}
                            rowCount={listings.length}
                            rowGetter={({ index }: Index) => listings[index]}
                            onRowClick={(event: any) => console.log(event)}
                            columns={columns}
                        />
                    </div>
                </div>
                <div style={{ width: '100%' }}>
                    <TablePaging className={classes.paging} page={this.state.page}
                        pagesCount={this.state.pagesCount}
                        rowsPerPage={this.state.rowsPerPage}
                        onPageChange={this.onPageChange}
                        onPageSizeChange={this.onPageSizeChange} />
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ListingsTable);