import * as React from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

interface INavBarProps extends RouteComponentProps {
};

class NavBar extends React.Component<INavBarProps> {
    render () {
        return <AppBar position="relative" color="default">
                <Tabs
                    value={this.props.history.location.pathname}
                    onChange={(e: any, value: number) => this.setState({ value })}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab value="/dashboard" component={(props: any) => <Link to="/dashboard" {...props}>Dashboard</Link>}></Tab>
                    <Tab value="/listings" component={(props: any) => <Link to="/listings" {...props}>Listings</Link>}></Tab>
                    <Tab value="/reports" component={(props: any) => <Link to="/reports" {...props}>Reports</Link>}></Tab>
                    <Tab value="/about" component={(props: any) => <Link to="/about" {...props}>About</Link>}></Tab>
                </Tabs>
            </AppBar>
    }
}

export default withRouter(NavBar);