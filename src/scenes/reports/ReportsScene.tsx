import * as React from 'react';
import Layout from '../../Layout';
import { Theme, createStyles, WithStyles, withStyles, Grid, CircularProgress } from '@material-ui/core';
import SimpleRadialBarChart from './components/SimpleRadialBarChart';
import SpecialDomainRadarChart from './components/SpecialDomainRadarChart';
import ComposedBarChart from './components/ComposedBarChart';
import SimpleLineChart from './components/SimpleLineChart';
import SideDrawer from './components/SideDrawer';
import { INeighborhood } from '../../models/neighborhoods/neighborhood';
import neighborhoodsApiClient from '../../api/neighborhoodsApi';
import INeighborhoodPriceReport from '../../dtos/INeighborhoodPriceReport';
import INeighborhoodAvailabilityReport from '../../dtos/INeighborhoodAvailabilityReport';
import INeghborhoodReportByAllTypesOfRatingDto from '../../dtos/INeighborhoodReportByAllTypesOfRatingDto';

interface IReportSceneStateProps {
	neighborhoods: INeighborhood[] | null;
	loading: boolean;
	priceReports: INeighborhoodPriceReport | null;
	availabilityReports: INeighborhoodAvailabilityReport | null;
	ratingReports: INeghborhoodReportByAllTypesOfRatingDto | null;
}

interface IReportSceneProps { }

class ReportsScene extends React.Component<IReportSceneProps, IReportSceneStateProps> {

	constructor(props: IReportSceneProps) {
		super(props);
		this.state = {
			neighborhoods: null,
			loading: false,
			availabilityReports: null,
			priceReports: null,
			ratingReports: null,
		};
		this.onSelect = this.onSelect.bind(this);
		this.getReportsByNgId = this.getReportsByNgId.bind(this);
	}

	componentDidMount() {
		neighborhoodsApiClient.getAllNeighborhoodsSimple().then(data => {
			if (data.length > 0) {
				this.setState({ neighborhoods: data, });
				this.getReportsByNgId(data[0].id)
			}
		}).catch(err => {
			// todo: handle error
		});
	}

	getReportsByNgId(id: number) {
		this.setState({ loading: false });

		var p1 = neighborhoodsApiClient.getAllTypesOfRatingReportsByNgId(id);
		var p2 = neighborhoodsApiClient.getAvailabilityReportsByNgId(id);
		var p3 = neighborhoodsApiClient.getPriceReportsByNgId(id);

		Promise.all([p1, p2, p3]).then(([r1, r2, r3]) => {
			console.log(r1, r2, r3);
			this.setState({
				ratingReports: r1,
				availabilityReports: r2,
				priceReports: r3,
				loading: false,
			});
		});
	}

	onSelect(ng: INeighborhood) {
		this.getReportsByNgId(ng.id);
	}

	render() {
		const style: any = {
			boxSizing: 'border-box',
			padding: '10px',
			width: 'auto',
			height: '500px',
			backgroundColor: '#fff'
		};

		const { neighborhoods, loading } = this.state;

		return <React.Fragment>
			<Layout position={'relative'}>
				{loading && <div style={{ textAlign: 'center', marginTop: '50px' }}>
					<CircularProgress color="primary" size={65} />
				</div>}
				{!loading && neighborhoods && <div>
					<SideDrawer onNgSelect={this.onSelect} neighborhoods={neighborhoods} />
				</div>}
				{!loading && <div>
					<Grid
						container
						direction="row"
						justify="center"
						alignItems="center"
					>
						<Grid item md={6}>
							<div></div>
							<div style={style}>
								<SimpleRadialBarChart />
							</div>
						</Grid>
						<Grid item md={6}>
							<div></div>
							<div style={style}>
								<SpecialDomainRadarChart />
							</div>
						</Grid>
						<Grid item md={6}>
							<div></div>
							<div style={style}>
								<SimpleLineChart />
							</div>
						</Grid>
						<Grid item md={6}>
							<div></div>
							<div style={style}>
								<ComposedBarChart />
							</div>
						</Grid>
						<Grid item md={6}>
							<div></div>
							<div style={style}>
								<SimpleLineChart />
							</div>
						</Grid>
					</Grid>
				</div>}
			</Layout >
		</React.Fragment>
	}
};

export default ReportsScene;
