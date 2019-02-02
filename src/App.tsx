import * as React from 'react';
import { Route, Switch, Redirect, RouteComponentProps, withRouter } from 'react-router';
import DashBoardScene from './scenes/dashboard/DashboardScene';
import ListingsScene from './scenes/listings/ListingsScene';
import ReportsScene from './scenes/reports/ReportsScene';
import SecuredRoute from './components/SecuredRoute';
import Callback from './components/Callback';
import auth0Client from './Auth';
import { Layout } from './Layout';

interface IAppProps extends RouteComponentProps {

}

interface IAppState {
    checkingSession: boolean
}

class App extends React.Component<IAppProps, IAppState> {
    constructor(props: Readonly<IAppProps>) {
        super(props);
        this.state = {
            checkingSession: true,
        }
    }

    async componentDidMount() {
        if (this.props.location.pathname === '/callback') {
            this.setState({ checkingSession: false });
            return;
        }

        try {
            await auth0Client.silentAuth();
            this.forceUpdate();
        } catch (err) {
            if (err.error !== 'login_required') console.log(err.error);
        }

        this.setState({ checkingSession: false });
    }

    public render() {
        return <Layout>
            <Switch>
                {/* <SecuredRoute path='/dashboard' component={DashBoardScene} checkingSession={this.state.checkingSession} /> */}
                <Route exact path='/callback' component={Callback} />
                <Route exact path="/dashboard" component={DashBoardScene} />
                <SecuredRoute path='/listings' component={ListingsScene} />
                <SecuredRoute path='/reports' component={ReportsScene} />
                <SecuredRoute path='/about' component={AbortController} />
                {/* <Route exact path="/listings" component={ListingsScene} />
                <Route exact path="/reports" component={ReportsScene} />
                <Route exact path="/about" component={AboutScene} /> */}
                <Redirect to="/dashboard" />
            </Switch>
        </Layout>;
    }
}

export default withRouter(App);
