import { Auth0DecodedHash } from 'auth0-js';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { LoadingScreen } from './SecuredRoute';
import { IApplicationState } from '../redux/store';
import { handleAuthentication } from '../redux/actions/authActions';

interface ICallbackProps extends RouteComponentProps {
    handleAuthentication: () => Promise<Auth0DecodedHash>
}

class Callback extends React.Component<ICallbackProps> {
    constructor(props: Readonly<ICallbackProps>) {
        super(props);
    }

    async componentDidMount() {
        try { 
            const result = await this.props.handleAuthentication();
            const { appState } = result;

            if (appState && appState.redirectUrl) {
                this.props.history.replace(appState.redirectUrl);
            } else {
                this.props.history.replace("/dashboard");
            }

        } catch (error) {
            //todo: handle error
            console.log("Auth error", error);
        }
    }

    render() {
        return <LoadingScreen />;
    }
}

const cmpWithRouter = withRouter(Callback);

const mapStateToProps = (state: IApplicationState) => ({
});

const mapDispatchToProps = (dispatch: any) => ({
    handleAuthentication: (): Promise<Auth0DecodedHash> => dispatch(handleAuthentication()),
});

export default connect(mapStateToProps, mapDispatchToProps)(cmpWithRouter);