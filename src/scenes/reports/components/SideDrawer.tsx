import React from 'react';
import { withStyles, WithStyles, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import { ChevronRight } from '@material-ui/icons';
import { INeighborhood } from '../../../models/neighborhoods/neighborhood';

const styles = (theme: Theme) => createStyles({
	root: {
		zIndex: 1302
	}
});

export interface IDrawerProps extends WithStyles<typeof styles>, IOwnProps { }
interface IOwnProps {
	neighborhoods: INeighborhood[];
	onNgSelect: (ng: INeighborhood) => void;
}

export interface IDrawerState {
	open: boolean
}

class LeftSideDrawer extends React.Component<IDrawerProps, IDrawerState> {

	constructor(props) {
		super(props);
		this.state = {
			open: false
		}
	}

	toggleDrawer = (value: boolean) => {
		this.setState({
			open: value,
		});
	};

	onSelect = (ng: INeighborhood) => {
		this.toggleDrawer(false);
		this.props.onNgSelect(ng);
	}

	render() {
		const { classes, neighborhoods } = this.props;
		const { open } = this.state;

		const sideList = (
			<div>
				<List>
					{neighborhoods.map((ng, index) => (
						<ListItem button key={'neigh' + index} onClick={() => this.onSelect(ng)}>
							<ListItemText primary={ng.name} />
						</ListItem>
						))}
				</List>
			</div>
				);
		
				return (
			<React.Fragment>
						<IconButton onClick={() => this.toggleDrawer(true)} >
							<ChevronRight />
						</IconButton>
						<Drawer
							open={open}
							onClose={() => this.toggleDrawer(false)}
							classes={classes as any}
						>
							<div
								tabIndex={0}
								role="button"
								onKeyDown={() => this.toggleDrawer(false)}>
								{sideList}
							</div>
						</Drawer>
					</React.Fragment >
					);
				}
			};
			
			export default withStyles(styles)(LeftSideDrawer);
