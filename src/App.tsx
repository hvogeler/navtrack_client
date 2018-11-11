import * as React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import {DisclaimerAndImpressum} from "./DisclaimerAndImpressum";
import {DocsMain} from "./docspage/DocsMain";
import {IntroMain} from "./intro/IntroMain";
import {LoginDlgMain} from "./login/LoginDlgMain";
import {LogViewerMain} from "./logviewer/LogViewerMain";
import {RootStore} from "./RootStore";
import './styles/mainstyles.css'
import {EditOrCreate, TrackCreateMain} from "./trackspage/TrackCreateMain";
import {TrackMain} from "./trackspage/TrackMain"
import {UserTo} from "./transport/UserTo";
import {LocalStorageKeys} from "./UiStore";

export let globalRootStore: RootStore;

export class App extends React.Component<any, any> {

    private rootStore: RootStore;

    constructor(props: any) {
        super(props);
        this.rootStore = new RootStore();
        globalRootStore = this.rootStore
    }

    public componentDidMount() {
        const jwt = localStorage.getItem(LocalStorageKeys.navure_jwt);
        const userJson = localStorage.getItem(LocalStorageKeys.navure_user);
        let userTo : UserTo | null = null;
        if (userJson !== null) {
            userTo = JSON.parse(userJson);
        }

        if (jwt !== null && userTo !== null) {
            this.rootStore.uiStore.setUserStore(userTo.username, userTo, jwt);
        }
    }

    public render() {
        return (
            <div className="App">
                <Router basename={"/"}>
                    <Switch>
                        <Route exact={true} path="/"
                               render={(props) => <TrackMain {...props} rootStore={this.rootStore}/>}/>
                        <Route exact={true} path="/tracks"
                               render={(props) => <TrackMain {...props} rootStore={this.rootStore}/>}/>
                        <Route exact={true} path="/create"
                               render={(props) => <TrackCreateMain {...props} key={1} rootStore={this.rootStore} mode={EditOrCreate.create}/>}/>
                        <Route exact={true} path="/edit/:trackId"
                               render={(props) => <TrackCreateMain {...props} key={2} rootStore={this.rootStore} mode={EditOrCreate.edit}/>}/>
                        <Route exact={true} path="/docs"
                               render={(props) => <DocsMain {...props} rootStore={this.rootStore}/>}/>
                        <Route exact={true} path="/intro"
                               render={(props) => <IntroMain {...props} rootStore={this.rootStore}/>}/>
                        <Route exact={true} path="/login"
                               render={(props) => <LoginDlgMain {...props} rootStore={this.rootStore!}/>}/>
                        <Route exact={true} path="/pwreset/:confirmationkey"
                               render={(props) => <LoginDlgMain {...props} rootStore={this.rootStore!}/>}/>
                        <Route exact={true} path="/disclaimerAndImpressum"
                               render={(props) => <DisclaimerAndImpressum {...props} rootStore={this.rootStore!}/>}/>
                        <Route exact={true} path="/logViewer"
                               render={(props) => <LogViewerMain {...props} rootStore={this.rootStore!}/>}/>
                    </Switch>
                </Router>
            </div>
        );
    }

}

