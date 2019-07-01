import * as React from 'react';
import Layout from '../../Layout';
import { Grid, Theme, createStyles, WithStyles, Paper, withStyles } from '@material-ui/core';
import SideDrawer from './components/SideDrawer';

const styles = (theme: Theme) => createStyles({
	container: {
		position: 'relative',
		top: '50px',
		flexGrow: 1
	},
	paper: {
		height: 140,
		width: 100,
	},
	control: {
		padding: theme.spacing.unit * 2,
	},
});

interface IReportSceneProps extends WithStyles<typeof styles> { }

class ReportsScene extends React.Component<IReportSceneProps> {
	render() {
		const { classes } = this.props;

		return <Layout>
			<SideDrawer />
			<Grid container className={classes.container} spacing={16}>
				<Grid item xs={12}>
					<Grid container justify="center" spacing={16}>
						{[0, 1, 2].map(value => (
							<Grid key={value} item>
								<Paper className={classes.paper} />
							</Grid>
						))}
					</Grid>
				</Grid>
			</Grid>
		</Layout>
	}
};

export default withStyles(styles)(ReportsScene);
