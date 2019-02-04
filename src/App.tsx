import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Callback from './components/Callback';
import SecureRoute from './components/SecuredRoute';
import { isAuthenticated, silentAuth } from './redux/actions/authActions';
import store from './redux/store';
import DashBoardScene from './scenes/dashboard/DashboardScene';
import ListingsScene from './scenes/listings/ListingsScene';
import ReportsScene from './scenes/reports/ReportsScene';

class App extends React.Component<{}> {

    async componentDidMount() {
        const state = store.getState();
        if (isAuthenticated(state)) {
            return;
        }

        try {
            await this.trySilentAuth();
            this.forceUpdate();
        } catch (err) {
            if (err.error !== 'login_required') console.log(err.error);
        }
    }

    trySilentAuth = () => {
        store.dispatch(silentAuth() as any);
    }

    public render() {
        return <React.Fragment>
            <Switch>
                <Route exact path='/callback' component={Callback} />
                <Route exact path="/dashboard" component={DashBoardScene} />
                <SecureRoute path='/listings' component={ListingsScene} />
                <SecureRoute path='/reports' component={ReportsScene} />
                <Redirect to="/dashboard" />
            </Switch>
        </React.Fragment>;
    }
}

export default App;
