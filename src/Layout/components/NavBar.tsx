import * as React from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

interface INavBarProps extends RouteComponentProps {
};

class NavBar extends React.Component<INavBarProps> {
    getValue(): number {
        const path = this.props.history.location.pathname;

        if(path.startsWith("/dashboard")) {
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

    render () {
        return <AppBar position="relative" color="default">
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
    }
}

export default withRouter(NavBar);