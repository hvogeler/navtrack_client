import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {rootStore} from "./RootStore";

export const RootStoreContext = React.createContext(rootStore);

ReactDOM.render(
    <RootStoreContext.Provider value={rootStore}>
        <App/>
    </RootStoreContext.Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
