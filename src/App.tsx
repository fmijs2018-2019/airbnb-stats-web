import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import DashBoardScene from './scenes/dashboard/DashboardScene';
import ListingsScene from './scenes/listings/ListingsScene';
import ReportsScene from './scenes/reports/ReportsScene';
import AboutScene from './scenes/about/AboutScene';
import { Layout } from './Layout';

class App extends React.Component {
    public render() {
        return <Layout>
            <Switch>
                <Route exact path="/dashboard" component={DashBoardScene} />
                <Route exact path="/listings" component={ListingsScene} />
                <Route exact path="/reports" component={ReportsScene} />
                <Route exact path="/about" component={AboutScene} />
                <Redirect to="/dashboard" />
            </Switch>
        </Layout>;
    }
}

export default App;
