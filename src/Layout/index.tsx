import * as React from 'react';
import NavigationBar from './components/NavigationBar';
import { connect } from 'react-redux';
import { IProfilePayload } from '../models/auth/IProfilePayload';
import auth0Client from '../Auth';
import { IApplicationState } from '../redux/store';
import { isAuthenticated, clearAuthState } from '../redux/actions/authActions';

interface ILayoutProps {
    isAuth: boolean;
    children?: React.ReactNode;
    idTokenPayload?: IProfilePayload;
    clearAuthState: () => void;
}

class Layout extends React.Component<ILayoutProps> {

    signIn = () => {
        auth0Client.signIn();
    }

    signOut = () => {
        auth0Client.signOut();
        this.props.clearAuthState();
    }

    render() {
        const { isAuth, idTokenPayload, children } = this.props;
        return <React.Fragment>
            <NavigationBar onSignIn={this.signIn} onSignOut={this.signOut} isAuth={isAuth} idTokenPayload={idTokenPayload}/>
            <main>
                {this.props.children}
            </main>
        </React.Fragment>;
    }
}

const mapStateToProps = (state: IApplicationState) => ({
    idTokenPayload: state.auth.idTokenPayload,
    isAuth: isAuthenticated(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    clearAuthState: () => dispatch(clearAuthState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);