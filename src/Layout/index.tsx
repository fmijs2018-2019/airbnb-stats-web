import * as React from 'react';
import NavigationBar from './components/NavigationBar';

export const Layout: React.SFC<{}> = (props) => {
    return <React.Fragment>
        <NavigationBar />
        <main>
            {props.children}
        </main>
    </React.Fragment>;
}
