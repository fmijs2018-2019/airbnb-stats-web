import * as React from 'react';
import { AppBar, Tabs, Tab, LinearProgress, Theme, createStyles, WithStyles, withStyles } from '@material-ui/core';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IApplicationState } from 'src/redux/store';

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        zIndex: 1,
    }
})

interface INavBarProps extends RouteComponentProps, WithStyles<typeof styles> {
    isFetching: boolean
};

class NavBar extends React.Component<INavBarProps> {
    getValue(): number {
        const path = this.props.history.location.pathname;

        if (path.startsWith("/dashboard")) {
            return 0;
        } else if (path.startsWith("/listings")) {
            return 1;
        } else if (path.startsWith("/reports")) {
            return 2;
        } else if (path.startsWith("/about")) {
            return 3;
        }

        return 0;
    }

    render() {
        const { classes, isFetching } = this.props;

        return <React.Fragment>
            <AppBar position="relative" color="default">
                <Tabs
                    value={this.getValue()}
                    onChange={(e: any, value: number) => this.setState({ value })}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab value={0} component={(props: any) => <Link to="/dashboard" {...props}>Dashboard</Link>}></Tab>
                    <Tab value={1} component={(props: any) => <Link to="/listings" {...props}>Listings</Link>}></Tab>
                    <Tab value={2} component={(props: any) => <Link to="/reports" {...props}>Reports</Link>}></Tab>
                    <Tab value={3} component={(props: any) => <Link to="/about" {...props}>About</Link>}></Tab>
                </Tabs>
            </AppBar>
            {isFetching && <LinearProgress classes={classes} />}
        </React.Fragment>
    }
}

const mapStateToProps = (state: IApplicationState) => ({
    isFetching: state.common.isFetching
})

export default connect(mapStateToProps)(withRouter(withStyles(styles)(NavBar)));