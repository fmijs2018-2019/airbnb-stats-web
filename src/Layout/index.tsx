import * as React from 'react';
import NavBar from './components/NavBar';

export const Layout: React.SFC<{}> = (props) => {
    return <React.Fragment>
        <NavBar />
        <main>
            {props.children}
        </main>
    </React.Fragment>;
}
