import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { withStyles, Theme, WithStyles, createStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { AccountCircle } from '@material-ui/icons';
import GithubIcon from '../../components/icnos/GithubIcon';
import { IProfilePayload } from '../../models/auth/IProfilePayload';

const styles = (theme: Theme) => createStyles({
    navBar: {
        width: '100%',
        backgroundColor: 'rgba(32, 35, 42, 0.8)',
        position: 'fixed',
		height: '56px',
		top: 0,
        zIndex: 1301,
    },
    toolbar: {
        minHeight: '56px'
    },
    grow: {
        flexGrow: 1,
    },
    nopad: {
        padding: 0,
    },
    avatar: {
        backgroundColor: 'white',
        display: 'inline-flex',
        fontSize: '1.35em',
        width: '40px',
        height: '40px',
    },
    logoText: {
        paddingRight: '30px',
        paddingLeft: '0',
        color: 'white',
        fontWeight: 'bold',
        display: 'block',
        '@media screen and (max-width: 700px)': {
            display: 'none',
        },
    },
    menuItem: {
        display: 'block',
        '@media screen and (max-width: 700px)': {
            display: 'none',
        },
        textTransform: 'none',
        fontSize: '17px',
        fontWeight: 'normal'
    },
    logInOutBtn: {
        display: 'block',
        textTransform: 'none',
        fontSize: '17px',
        fontWeight: 'normal'
    },
    menuList: {
        display: 'none',
        '@media screen and (max-width: 700px)': {
            display: 'block',
        },
    },
    logoIcon: {
        height: '40px',
        width: '40px',
        color: 'white',
        minHeight: '0',
        minWidth: '0',
        padding: '0',
        display: 'block',
        '@media screen and (max-width: 700px)': {
            display: 'none',
        },
    },
    drawerItem: {
        display: 'block',
        color: 'white'
    },
    drawer: {
        top: '56px',
        backgroundColor: 'rgba(32, 35, 42, 0.8)',
    },
});

interface INavigationBarProps extends RouteComponentProps, WithStyles<typeof styles> {
    onSignOut: () => void;
    onSignIn: () => void;
    isAuth: boolean;
    idTokenPayload?: IProfilePayload;
};

interface INavigationBarState {
    isDrawerOpen: boolean;
    headerColor: string;
}

class NavigationBar extends React.Component<INavigationBarProps, INavigationBarState> {
    constructor(props: Readonly<INavigationBarProps>) {
        super(props);

        this.state = {
            isDrawerOpen: false,
            headerColor: 'rgba(32, 35, 42, 0.8)',
        };
    }

    toggleDrawer = (isDrawerOpen: boolean) => () => {
        let state: INavigationBarState = { ...this.state, isDrawerOpen };
        if (isDrawerOpen) {
            state.headerColor = 'rgba(32, 35, 42)';
        }
        this.setState(state);
    };

    updateHeaderColorOnClose = () => {
        const { isDrawerOpen } = this.state;
        if (!isDrawerOpen) {
            this.setState({
                headerColor: 'rgba(32, 35, 42, 0.8)'
            })
        }
    }

    getButtonsList = (className: string) => {
        return (
            <React.Fragment>
                <Button className={className} color="inherit" component={(props: any) => <Link to="/dashboard" {...props}>Dashboard</Link>}>Dashboard</Button>
                <Button className={className} color="inherit" component={(props: any) => <Link to="/listings" {...props}>Listings</Link>}>Listings</Button>
                <Button className={className} color="inherit" component={(props: any) => <Link to="/reports" {...props}>Reports</Link>}>Reports</Button>
                {/* <Button className={className} color="inherit" component={(props: any) => <Link to="/about" {...props}>About</Link>}>About</Button> */}
            </React.Fragment>
        );
    }

    render() {
        const { classes, isAuth, onSignOut, onSignIn, idTokenPayload } = this.props;
        const { isDrawerOpen, headerColor } = this.state;

        return (
            <React.Fragment>
                <AppBar className={classes.navBar} position="static" style={{ backgroundColor: headerColor }}>
                    <Toolbar classes={{ root: classes.toolbar }}>
                        <Typography className={classes.logoText} variant="h6" color="inherit" noWrap>
                            Amsterdam
                        </Typography>
                        <IconButton className={classes.menuList} color="inherit" aria-label="Open drawer">
                            <MenuIcon onClick={this.toggleDrawer(!isDrawerOpen)} />
                        </IconButton>
                        {this.getButtonsList(classes.menuItem)}
                        <div className={classes.grow} />
                        <IconButton style={{ padding: 0, color: 'white', margin: '0 15px' }} target="_black" href="https://github.com/fmijs2018-2019">
                            <GithubIcon style={{ height: '24px', width: '24px' }} />
                        </IconButton>
                        {idTokenPayload && <Avatar color="inherit" className={classes.avatar} src={idTokenPayload.picture} style={{ color: headerColor }} />}
                        {!isAuth && <Button onClick={onSignIn} className={classes.logInOutBtn} color="inherit">LogIn</Button>}
                        {isAuth && <Button onClick={onSignOut} className={classes.logInOutBtn} color="inherit">LogOut</Button>}
                    </Toolbar>
                </AppBar>
                <Drawer
                    SlideProps={{
                        onExited: this.updateHeaderColorOnClose
                    }}
                    classes={{ paperAnchorTop: classes.drawer }}
                    anchor="top" open={isDrawerOpen} onClose={this.toggleDrawer(false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer(false)}
                        onKeyDown={this.toggleDrawer(false)}
                    >
                        {this.getButtonsList(classes.drawerItem)}
                    </div>
                </Drawer>
            </React.Fragment>
        );
    }
}

export default withRouter(withStyles(styles)(NavigationBar));
