import * as React from 'react';
import { AppBar, Tabs, Tab, LinearProgress, Theme, createStyles, WithStyles, withStyles } from '@material-ui/core';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IApplicationState } from 'src/redux/store';
import auth0Client from 'src/Auth';

const styles = (theme: Theme) => createStyles({
    navbar: {
        backgroundColor: 'black',
        opacity: 0.7,
        color: 'white',
    },
    progress: {
        flexGrow: 1,
        zIndex: 1,
        height: '3px',
    },
    tab: {
        color: 'white',
    },
    indicator: {
        backgroundColor: 'white',
    }
})

interface INavBarProps extends RouteComponentProps, WithStyles<typeof styles> {
    isFetching: boolean,
};

class NavBar extends React.Component<INavBarProps> {
    constructor(props: Readonly<INavBarProps>) {
        super(props);
        this.signOut = this.signOut.bind(this);
    }

    signOut(): void {
        auth0Client.signOut();
        this.props.history.replace('/');
    };

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
            <AppBar className={classes.navbar} position="relative" >
                <Tabs
                    classes={{ indicator: classes.indicator }}
                    value={this.getValue()}
                    onChange={(e: any, value: number) => this.setState({ value })}
                    centered
                >
                    <Tab classes={{ root: classes.tab }} value={0} component={(props: any) => <Link to="/dashboard" {...props}>Dashboard</Link>}></Tab>
                    <Tab classes={{ root: classes.tab }} value={1} component={(props: any) => <Link to="/listings" {...props}>Listings</Link>}></Tab>
                    <Tab classes={{ root: classes.tab }} value={2} component={(props: any) => <Link to="/reports" {...props}>Reports</Link>}></Tab>
                    <Tab classes={{ root: classes.tab }} value={3} component={(props: any) => <Link to="/about" {...props}>About</Link>}></Tab>
                    {
                        !auth0Client.isAuthenticated() &&
                        <button onClick={auth0Client.signIn}>Sign In</button>
                    }
                    {
                        auth0Client.isAuthenticated() &&
                        <div>
                            <label>{auth0Client.getProfile().name}</label>
                            <button onClick={() => { this.signOut() }}>Sign Out</button>
                        </div>
                    }
                </Tabs>
            </AppBar>
            {isFetching && <LinearProgress classes={{ root: classes.progress }} />}
        </React.Fragment>
    }
}

const mapStateToProps = (state: IApplicationState) => ({
    isFetching: state.common.isFetching
})

const navWithStyles = withStyles(styles)(NavBar);
const navWithRouter = withRouter(navWithStyles);

export default connect(mapStateToProps)(navWithRouter);