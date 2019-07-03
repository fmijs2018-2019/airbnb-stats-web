import * as React from 'react';
import Layout from '../../Layout';
import { Theme, createStyles, WithStyles, withStyles, Grid } from '@material-ui/core';
import SimpleRadialBarChart from './components/SimpleRadialBarChart';
import SpecialDomainRadarChart from './components/SpecialDomainRadarChart';
import ComposedBarChart from './components/ComposedBarChart';
import SimpleLineChart from './components/SimpleLineChart';
import SideDrawer from './components/SideDrawer';
import { INeighborhood } from '../../models/neighborhoods/neighborhood';

interface IReportSceneStateProps {
	neighborhoods: INeighborhood[] | null;
	
}

interface IReportSceneProps extends IReportSceneStateProps { }

class ReportsScene extends React.Component<IReportSceneProps> {

	componentDidMount(){
		
	}

	render() {
		const style: any = {
			boxSizing: 'border-box',
			padding: '10px',
			width: 'auto',
			height: '500px',
			backgroundColor: '#fff'
		};

		return <Layout>
			<div>
				<SideDrawer />
			</div>
			<div style={{ marginTop: '20px' }}>
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
			</div>
		</Layout >
	}
};

export default ReportsScene;
