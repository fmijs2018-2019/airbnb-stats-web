import * as React from 'react';
import { Route, RouteProps, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CircularProgress, Button } from '@material-ui/core';
import amsterdamImg from './utils/amsterdam.jpg';
import { IApplicationState } from '../redux/store';
import { isAuthenticated } from '../redux/actions/authActions';
import auth0Client from '../Auth';

interface SecureRouteProps extends RouteProps {
	silentAuthInProgress: boolean;
	isAuth: boolean;
}

class SecureRoute extends React.Component<SecureRouteProps> {

	signIn = () => {
		const authOptions: any = { appState: { redirectUrl: location } };
		auth0Client.signIn(authOptions);
	}

	render() {
		const { isAuth, silentAuthInProgress, component, ...routerProps } = this.props;
		const Component: any = component;

		return (
			<Route {...routerProps} render={(props) => {
				if (silentAuthInProgress) {
					return <LoadingScreen />;
				}

				if (!isAuth) {
					return <UnauthorizedScreen onSignIn={() => this.signIn()} />;
				}

				return <Component {...props} />;
			}} />
		);
	}
}

interface IUnauthorizedScreenProps {
	onSignIn: () => void;
}

export const LoadingScreen = (props: any) => {
	return (
		<div style={{ display: 'inline-block', position: 'absolute', width: '100px', height: '100px', top: '50%', left: '50%', marginTop: '-50px', marginLeft: '-50px' }}>
			<CircularProgress color="primary" size={65} />
		</div>
	);
}

export const UnauthorizedScreen = (props: IUnauthorizedScreenProps) => {
	return (
		<div>
			<div style={{ textAlign: 'center', fontSize: '20px', marginTop: '50px'}}>401 Unauthorized</div>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<div style={{ display: 'inline-block', margin: 'auto' }}>
					<Button
						style={{ marginRight: '30px', backgroundColor: 'rgba(255, 255, 255, 0.3)'}}
						variant="outlined"
						component={(props: any) => <Link to="/dashboard" {...props}></Link>}>
						Home
					</Button>
					<Button
						style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)'}}
						variant="outlined" color="primary" onClick={() => props.onSignIn()}>
						LogIn
					</Button>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state: IApplicationState) => ({
	silentAuthInProgress: state.auth.silentAuthInProgress,
	isAuth: isAuthenticated(state),
});

export default connect(mapStateToProps, null)(SecureRoute);