import * as React from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {DocsMain} from "./docspage/DocsMain";
import {IntroMain} from "./intro/IntroMain";
import {LoginDlgMain} from "./login/LoginDlgMain";
import {RootStore} from "./RootStore";
import './styles/mainstyles.css'
import {TracksCreateMain} from "./trackspage/TracksCreateMain";
import {TracksMain} from "./trackspage/TracksMain"

export class App extends React.Component<any, any> {


    private rootStore: RootStore;

    constructor(props: any) {
        super(props);
        console.log(`Initialize rootStore ${Date.now()}`);
        this.rootStore = new RootStore();


        this.rootStore.uiStore.secToken = "testtest";
        console.log(`+++ rootStore created. SecToken = ${this.rootStore.uiStore.secToken}`);

    }


    public render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact={true} path="/"
                               render={(props) => <TracksMain {...props} rootStore={this.rootStore}/>}/>
                        <Route exact={true} path="/tracks"
                               render={(props) => <TracksMain {...props} rootStore={this.rootStore}/>}/>
                        <Route exact={true} path="/create"
                               render={(props) => <TracksCreateMain {...props} rootStore={this.rootStore}/>}/>
                        <Route exact={true} path="/docs"
                               render={(props) => <DocsMain {...props} rootStore={this.rootStore}/>}/>
                        <Route exact={true} path="/intro"
                               render={(props) => <IntroMain {...props} rootStore={this.rootStore}/>}/>
                        <Route exact={true} path="/login"
                               render={(props) => <LoginDlgMain {...props} rootStore={this.rootStore!}/>}/>
                    </Switch>
                </Router>
            </div>
        );
    }

}

