import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import auth0Client from 'src/Auth';
import { CircularProgress } from '@material-ui/core';

interface ICallbackProps extends RouteComponentProps{}

class Callback extends React.Component<ICallbackProps> {
    constructor(props: Readonly<ICallbackProps>) {
        super(props);
    }

    async componentDidMount() {
        await auth0Client.handleAuthentication();
        this.props.history.replace('/');
    }

    render() {
        return <CircularProgress />;
    }
}

export default withRouter(Callback);