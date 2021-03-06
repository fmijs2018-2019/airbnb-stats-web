import { createStyles, Theme, WithStyles, withStyles, Typography } from '@material-ui/core';
import * as React from 'react';
import { Index } from 'react-virtualized';
import ListingNeighborhoodColumn from './ListingNeighborhoodColumn';
import ListingRatingColumn from './ListingRatingColumn';
import ListingTypeColumn from './ListingTypeColumn';
import TablePaging from '../../../components/TablePaging';
import VirtualizedTable, { IVirtualizedColumn } from '../../../components/VirtualizedTable';
import ListingAccommodatesColumn from './ListingAccommodatesColumn';
import { IListingTableDto } from '../../../models/listings/ListingTableDto';

const styles = (theme: Theme) => createStyles({
	paging: {
		float: 'right',
	},
});

interface IListingsTableProps extends WithStyles<typeof styles> {
	listings: IListingTableDto[];
	currentPage: number;
	totalCount: number;
	pageSize: number;
	numberOfPages: number;
	orderBy: string;
	order: 'asc' | 'desc';
	onSort: (orderBy: string, order: 'asc' | 'desc') => void;
	onPageSizeChange: (pageSize: number) => void;
	onPageChange: (newPage: number) => void;
}

class ListingsTable extends React.Component<IListingsTableProps> {
	onPageSizeChange = (pageSize: number) => {
		this.props.onPageSizeChange(pageSize);
	}

	onPageChange = (page: number) => {
		this.props.onPageChange(page);
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
				flexGrow: 1,	
				disableSort: true,
			},
			{
				width: 120,
				label: 'Price',
				dataKey: 'price',
				renderCell: ({ cellData }: any) => cellData && <div>${cellData.toFixed(2)}</div>,
			},
			{
				width: 300,
				label: 'Neighborhood',
				dataKey: 'neighborhood',
				flexGrow: 1,
				renderCell: ({ cellData }: any) => cellData && <ListingNeighborhoodColumn neighborhood={cellData} />,
				disableSort: true,
			},
			{
				width: 140,
				label: 'Accommodates',
				dataKey: 'accommodates',
				renderCell: ({ cellData }: any) => cellData && <ListingAccommodatesColumn accommodates={cellData} />,
			},
			{
				width: 130,
				label: 'Rating',
				dataKey: 'rating',
				renderCell: ({ cellData }: any) => cellData && <ListingRatingColumn rating={cellData} />,
			},
		]
	}

	render() {
		const { listings, classes, order, orderBy } = this.props;
		const columns = this.getColumns();

		return (
			<React.Fragment>
				<div style={{ width: '100%', padding: '20px 0 20px 20px', boxSizing: 'border-box' }}>
					<Typography variant="h5">Listings</Typography>
					<p style={{ margin: 'initial', color: 'gray', fontSize: '14px' }}>{this.props.totalCount} listings found</p>
				</div>
				<div style={{ overflowX: 'auto', width: '100%', borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
					<div style={{ height: '500px', width: 'auto', minWidth:'1140px', padding: '1px', margin: 'auto' }}>
						<VirtualizedTable
							sortable
							rowClassName=""
							rowHeight={70}
							headerHeight={56}
							rowCount={listings.length}
							rowGetter={({ index }: Index) => listings[index]}
							onRowClick={(event: any) => console.log(event)}
							columns={columns}
							order={order}
							orderBy={orderBy}
							onSort={this.props.onSort}
						/>
					</div>
				</div>
				<div style={{ width: '100%' }}>
					<TablePaging className={classes.paging} page={this.props.currentPage}
						pagesCount={this.props.numberOfPages}
						rowsPerPage={this.props.pageSize}
						onPageChange={this.onPageChange}
						onPageSizeChange={this.onPageSizeChange} />
				</div>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(ListingsTable);