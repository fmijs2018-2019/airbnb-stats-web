import * as React from 'react';
import NavBar from './components/NavBar';
import { Switch, Route, Redirect } from 'react-router';
import DashBoardScene from 'src/scenes/DashboardScene';
import ListingsScene from 'src/scenes/ListingsScene';
import ReportsScene from 'src/scenes/ReportsScene';
import AboutScene from 'src/scenes/AboutScene';

export const PrimaryLayout: React.SFC<{}> = (props) => {
    return <React.Fragment>
        <NavBar />
        <Switch>
            <Route exact path="/dashboard" component={DashBoardScene} />
            <Route exact path="/listings" component={ListingsScene} />
            <Route exact path="/reports" component={ReportsScene} />
            <Route exact path="/about" component={AboutScene} />
            <Redirect to="/dashboard" />
        </Switch>
    </React.Fragment>;
}
