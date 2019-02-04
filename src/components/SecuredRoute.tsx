import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { isAuthenticated } from 'src/redux/actions/authActions';
import { IApplicationState } from 'src/redux/store';
import auth0Client from 'src/Auth';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

interface SecureRouteProps extends RouteProps {
	silentAuthInProgress: boolean;
	isAuth: boolean;
}

class SecureRoute extends React.Component<SecureRouteProps> {

	render() {
		const { isAuth, silentAuthInProgress, component, ...routerProps } = this.props;
		const Component: any = component;

		return (
			<Route {...routerProps} render={(props) => {
				if (silentAuthInProgress) {
					return <LoadingScreen />;
				}

				if (!isAuth) {
					const authOptions: any = { appState: { redirectUrl: location } };
					auth0Client.signIn(authOptions);
					return <div>401 Unauthorized</div>;
				}

				return <Component {...props} />;
			}} />
		);
	}
}

export const LoadingScreen = (props: any) => {
	return (
		<div style={{ display: 'inline-block', position: 'absolute', width: '100px', height: '100px', top: '50%', left: '50%', marginTop: '-50px', marginLeft: '-50px' }}>
			<CircularProgress color="primary" size={65} />
		</div>
	);
}

const mapStateToProps = (state: IApplicationState) => ({
	silentAuthInProgress: state.auth.silentAuthInProgress,
	isAuth: isAuthenticated(state),
});

export default connect(mapStateToProps, null)(SecureRoute);
