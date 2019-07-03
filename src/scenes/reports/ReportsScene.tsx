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
		this.getTotalRatingData = this.getTotalRatingData.bind(this);
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
		this.setState({ loading: true });

		var p1 = neighborhoodsApiClient.getAllTypesOfRatingReportsByNgId(id);
		var p2 = neighborhoodsApiClient.getAvailabilityReportsByNgId(id);
		var p3 = neighborhoodsApiClient.getPriceReportsByNgId(id);

		Promise.all([p1, p2, p3]).then(([r1, r2, r3]) => {
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

	getTotalRatingData() {
		const { ratingReports } = this.state;
		if (ratingReports === null) return undefined;

		const data = [
			{ name: '0-20', value: ratingReports.totalRating.filter(v => v.rating && v.rating >= 0 && v.rating <= 20).reduce((r, c) => r + c.count, 0), fill: '#8884d8' },
			{ name: '21-40', value: ratingReports.totalRating.filter(v => v.rating && v.rating >= 21 && v.rating <= 40).reduce((r, c) => r + c.count, 0), fill: '#83a6ed' },
			{ name: '41-60', value: ratingReports.totalRating.filter(v => v.rating && v.rating >= 41 && v.rating <= 60).reduce((r, c) => r + c.count, 0), fill: '#8dd1e1' },
			{ name: '61-80', value: ratingReports.totalRating.filter(v => v.rating && v.rating >= 61 && v.rating <= 80).reduce((r, c) => r + c.count, 0), fill: '#82ca9d' },
			{ name: '81-100', value: ratingReports.totalRating.filter(v => v.rating && v.rating >= 81 && v.rating <= 100).reduce((r, c) => r + c.count, 0), fill: '#a4de6c' },
			{ name: 'unknow', value: ratingReports.totalRating.filter(v => !v.rating).reduce((r, c) => r + c.count, 0), fill: '#ffc658' }
		];
		return data;
	}

	getPriceRatingData() {
		const { priceReports } = this.state;
		if (priceReports === null) return undefined;

		let fullMark = Math.max(priceReports.avgDailyPrice, priceReports.avgMonthlyPrice, priceReports.avgWeaklyPrice) + 100;
		fullMark = Math.round(fullMark);
		const data = [
			{
				label: 'Avg. daily price', value: Math.round(priceReports.avgDailyPrice), fullMark,
			},
			{
				label: 'Avg. monthly price', value: Math.round(priceReports.avgMonthlyPrice), fullMark,
			},
			{
				label: 'Avg. weekly price', value: Math.round(priceReports.avgWeaklyPrice), fullMark,
			}
		];
		return data;
	}

	getAvailabilityReportData() {
		const { availabilityReports } = this.state;
		if (availabilityReports === null) return undefined;

		const data = [
			{
				name: '0-30', value: availabilityReports.availability.filter(v => v.days && v.days >= 0 && v.days <= 30).reduce((r, c) => r + c.count, 0)
			},
			{
				name: '31-60', value: availabilityReports.availability.filter(v => v.days && v.days >= 31 && v.days <= 60).reduce((r, c) => r + c.count, 0)
			},
			{
				name: '61-90', value: availabilityReports.availability.filter(v => v.days && v.days >= 61 && v.days <= 90).reduce((r, c) => r + c.count, 0)
			},
			{
				name: '91-120', value: availabilityReports.availability.filter(v => v.days && v.days >= 91 && v.days <= 120).reduce((r, c) => r + c.count, 0)
			},
			{
				name: '121-150', value: availabilityReports.availability.filter(v => v.days && v.days >= 121 && v.days <= 150).reduce((r, c) => r + c.count, 0)
			},
			{
				name: '151-180', value: availabilityReports.availability.filter(v => v.days && v.days >= 151 && v.days <= 180).reduce((r, c) => r + c.count, 0)
			},
			{
				name: '181-210', value: availabilityReports.availability.filter(v => v.days && v.days >= 181 && v.days <= 210).reduce((r, c) => r + c.count, 0)
			},
			{
				name: '211-240', value: availabilityReports.availability.filter(v => v.days && v.days >= 211 && v.days <= 240).reduce((r, c) => r + c.count, 0)
			},
			{
				name: '241-270', value: availabilityReports.availability.filter(v => v.days && v.days >= 241 && v.days <= 270).reduce((r, c) => r + c.count, 0)
			},
			{
				name: '271-300', value: availabilityReports.availability.filter(v => v.days && v.days >= 271 && v.days <= 300).reduce((r, c) => r + c.count, 0)
			},
			{
				name: '301-330', value: availabilityReports.availability.filter(v => v.days && v.days >= 301 && v.days <= 330).reduce((r, c) => r + c.count, 0)
			},
			{
				name: '331-365', value: availabilityReports.availability.filter(v => v.days && v.days >= 331 && v.days <= 365).reduce((r, c) => r + c.count, 0)
			},
		];
		return data;
	}

	getAllTypesOfRatingRepor() {
		const { ratingReports } = this.state;
		if (ratingReports === null) return undefined;

		const data = [
			{
				name: "1",
				cleanliness: ratingReports.cleanliness.filter(r => r.rating === 1).reduce((r, c) => r + c.count, 0),
				checkin: ratingReports.checkin.filter(r => r.rating === 1).reduce((r, c) => r + c.count, 0),
				value: ratingReports.value.filter(r => r.rating === 1).reduce((r, c) => r + c.count, 0),
				accuracy: ratingReports.cleanliness.filter(r => r.rating === 1).reduce((r, c) => r + c.count, 0),
				location: ratingReports.cleanliness.filter(r => r.rating === 1).reduce((r, c) => r + c.count, 0),
				communication: ratingReports.cleanliness.filter(r => r.rating === 1).reduce((r, c) => r + c.count, 0)
			},
			{
				name: "2",
				cleanliness: ratingReports.cleanliness.filter(r => r.rating === 2).reduce((r, c) => r + c.count, 0),
				checkin: ratingReports.checkin.filter(r => r.rating === 2).reduce((r, c) => r + c.count, 0),
				value: ratingReports.value.filter(r => r.rating === 2).reduce((r, c) => r + c.count, 0),
				accuracy: ratingReports.cleanliness.filter(r => r.rating === 2).reduce((r, c) => r + c.count, 0),
				location: ratingReports.cleanliness.filter(r => r.rating === 2).reduce((r, c) => r + c.count, 0),
				communication: ratingReports.cleanliness.filter(r => r.rating === 2).reduce((r, c) => r + c.count, 0)
			},
			{
				name: "3",
				cleanliness: ratingReports.cleanliness.filter(r => r.rating === 3).reduce((r, c) => r + c.count, 0),
				checkin: ratingReports.checkin.filter(r => r.rating === 3).reduce((r, c) => r + c.count, 0),
				value: ratingReports.value.filter(r => r.rating === 3).reduce((r, c) => r + c.count, 0),
				accuracy: ratingReports.cleanliness.filter(r => r.rating === 3).reduce((r, c) => r + c.count, 0),
				location: ratingReports.cleanliness.filter(r => r.rating === 3).reduce((r, c) => r + c.count, 0),
				communication: ratingReports.cleanliness.filter(r => r.rating === 3).reduce((r, c) => r + c.count, 0)
			},
			{
				name: "4",
				cleanliness: ratingReports.cleanliness.filter(r => r.rating === 4).reduce((r, c) => r + c.count, 0),
				checkin: ratingReports.checkin.filter(r => r.rating === 4).reduce((r, c) => r + c.count, 0),
				value: ratingReports.value.filter(r => r.rating === 4).reduce((r, c) => r + c.count, 0),
				accuracy: ratingReports.cleanliness.filter(r => r.rating === 4).reduce((r, c) => r + c.count, 0),
				location: ratingReports.cleanliness.filter(r => r.rating === 4).reduce((r, c) => r + c.count, 0),
				communication: ratingReports.cleanliness.filter(r => r.rating === 4).reduce((r, c) => r + c.count, 0)
			},
			{
				name: "5",
				cleanliness: ratingReports.cleanliness.filter(r => r.rating === 5).reduce((r, c) => r + c.count, 0),
				checkin: ratingReports.checkin.filter(r => r.rating === 5).reduce((r, c) => r + c.count, 0),
				value: ratingReports.value.filter(r => r.rating === 5).reduce((r, c) => r + c.count, 0),
				accuracy: ratingReports.cleanliness.filter(r => r.rating === 5).reduce((r, c) => r + c.count, 0),
				location: ratingReports.cleanliness.filter(r => r.rating === 5).reduce((r, c) => r + c.count, 0),
				communication: ratingReports.cleanliness.filter(r => r.rating === 5).reduce((r, c) => r + c.count, 0)
			},
			{
				name: "6",
				cleanliness: ratingReports.cleanliness.filter(r => r.rating === 6).reduce((r, c) => r + c.count, 0),
				checkin: ratingReports.checkin.filter(r => r.rating === 6).reduce((r, c) => r + c.count, 0),
				value: ratingReports.value.filter(r => r.rating === 6).reduce((r, c) => r + c.count, 0),
				accuracy: ratingReports.cleanliness.filter(r => r.rating === 6).reduce((r, c) => r + c.count, 0),
				location: ratingReports.cleanliness.filter(r => r.rating === 6).reduce((r, c) => r + c.count, 0),
				communication: ratingReports.cleanliness.filter(r => r.rating === 6).reduce((r, c) => r + c.count, 0)
			},
			{
				name: "7",
				cleanliness: ratingReports.cleanliness.filter(r => r.rating === 7).reduce((r, c) => r + c.count, 0),
				checkin: ratingReports.checkin.filter(r => r.rating === 7).reduce((r, c) => r + c.count, 0),
				value: ratingReports.value.filter(r => r.rating === 7).reduce((r, c) => r + c.count, 0),
				accuracy: ratingReports.cleanliness.filter(r => r.rating === 7).reduce((r, c) => r + c.count, 0),
				location: ratingReports.cleanliness.filter(r => r.rating === 7).reduce((r, c) => r + c.count, 0),
				communication: ratingReports.cleanliness.filter(r => r.rating === 7).reduce((r, c) => r + c.count, 0)
			},
			{
				name: "8",
				cleanliness: ratingReports.cleanliness.filter(r => r.rating === 8).reduce((r, c) => r + c.count, 0),
				checkin: ratingReports.checkin.filter(r => r.rating === 8).reduce((r, c) => r + c.count, 0),
				value: ratingReports.value.filter(r => r.rating === 8).reduce((r, c) => r + c.count, 0),
				accuracy: ratingReports.cleanliness.filter(r => r.rating === 8).reduce((r, c) => r + c.count, 0),
				location: ratingReports.cleanliness.filter(r => r.rating === 8).reduce((r, c) => r + c.count, 0),
				communication: ratingReports.cleanliness.filter(r => r.rating === 8).reduce((r, c) => r + c.count, 0)
			},
			{
				name: "9",
				cleanliness: ratingReports.cleanliness.filter(r => r.rating === 9).reduce((r, c) => r + c.count, 0),
				checkin: ratingReports.checkin.filter(r => r.rating === 9).reduce((r, c) => r + c.count, 0),
				value: ratingReports.value.filter(r => r.rating === 9).reduce((r, c) => r + c.count, 0),
				accuracy: ratingReports.cleanliness.filter(r => r.rating === 9).reduce((r, c) => r + c.count, 0),
				location: ratingReports.cleanliness.filter(r => r.rating === 9).reduce((r, c) => r + c.count, 0),
				communication: ratingReports.cleanliness.filter(r => r.rating === 9).reduce((r, c) => r + c.count, 0)
			},
			{
				name: "10",
				cleanliness: ratingReports.cleanliness.filter(r => r.rating === 10).reduce((r, c) => r + c.count, 0),
				checkin: ratingReports.checkin.filter(r => r.rating === 10).reduce((r, c) => r + c.count, 0),
				value: ratingReports.value.filter(r => r.rating === 10).reduce((r, c) => r + c.count, 0),
				accuracy: ratingReports.cleanliness.filter(r => r.rating === 10).reduce((r, c) => r + c.count, 0),
				location: ratingReports.cleanliness.filter(r => r.rating === 10).reduce((r, c) => r + c.count, 0),
				communication: ratingReports.cleanliness.filter(r => r.rating === 10).reduce((r, c) => r + c.count, 0)
			},

		]
		return data;
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

		const ratingRep = this.getTotalRatingData();
		const priceRep = this.getPriceRatingData();
		const availabilityRep = this.getAvailabilityReportData();
		const typesOfRatingReport = this.getAllTypesOfRatingRepor();

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
						{ratingRep && <Grid item md={6}>
							<h3 style={{ textAlign: 'center' }}>Rating reports</h3>
							<div style={style}>
								<SimpleRadialBarChart data={ratingRep} />
							</div>
						</Grid>}
						{priceRep && <Grid item md={6}>
							<h3 style={{ textAlign: 'center' }}>Price reports</h3>
							<div style={style}>
								<SpecialDomainRadarChart data={priceRep} />
							</div>
						</Grid>}
						{typesOfRatingReport && <Grid item md={6}>
							<h3 style={{ textAlign: 'center' }}>Cleanliness, Location, Checkin</h3>
							<div style={style}>
								<SimpleLineChart data={typesOfRatingReport} label="name" dataKey1="cleanliness" dataKey2="location" dataKey3="checkin" />
							</div>
						</Grid>}
						{availabilityRep && <Grid item md={6}>
							<h3 style={{ textAlign: 'center' }}>Availability reports</h3>
							<div style={style}>
								<ComposedBarChart data={availabilityRep} />
							</div>
						</Grid>}
						{typesOfRatingReport && <Grid item md={6}>
							<h3 style={{ textAlign: 'center' }}>Communication, Value, Accuracy</h3>
							<div style={style}>
								<SimpleLineChart data={typesOfRatingReport} label="name" dataKey1="communication" dataKey2="value" dataKey3="accuracy" />
							</div>
						</Grid>}
					</Grid>
				</div>}
			</Layout >
		</React.Fragment>
	}
};

export default ReportsScene;
