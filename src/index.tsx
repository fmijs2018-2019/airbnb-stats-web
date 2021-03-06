import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<SnackbarProvider maxSnack={3}>
				<App />
			</SnackbarProvider>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
