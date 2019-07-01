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

const styles = (theme: Theme) => createStyles({
	list: {
		width: 250,
	},
	openButton: {
		top: 60
	},
	paperRoot: {
		top: 54
	}
});

interface IDrawerProps extends WithStyles<typeof styles> { }

interface IDrawerState {
	open: boolean
}

class LeftSideDrawer extends React.Component<IDrawerProps, IDrawerState> {

	constructor(props) {
		super(props);
		this.state = {
			open: false
		}
	}

	toggleDrawer = (open: boolean) => () => {
		this.setState({
			open,
		});
	};

	render() {
		const { classes } = this.props;

		const sideList = (
			<div className={classes.list}>
				<List>
					{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</div>
		);

		return (
			<div>
				<IconButton onClick={this.toggleDrawer(true)} className={classes.openButton}>
					<ChevronRight />
				</IconButton>
				<Drawer
					open={this.state.open}
					onClose={this.toggleDrawer(false)}
					classes={{ paper: classes.paperRoot }}>
					<div
						tabIndex={0}
						role="button"
						onClick={this.toggleDrawer(false)}
						onKeyDown={this.toggleDrawer(false)}>
						{sideList}
					</div>
				</Drawer>
			</div >
		);
	}
};

export default withStyles(styles)(LeftSideDrawer);
