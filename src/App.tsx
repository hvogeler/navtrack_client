import * as React from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {DocsMain} from "./docspage/DocsMain";
import {IntroMain} from "./intro/IntroMain";
import {LoginDlgMain} from "./login/LoginDlgMain";
import {RootStore} from "./RootStore";
import './styles/mainstyles.css'
import {EditOrCreate, TrackCreateMain} from "./trackspage/TrackCreateMain";
import {TrackMain} from "./trackspage/TrackMain"

export let globalRootStore: RootStore;

export class App extends React.Component<any, any> {

    private rootStore: RootStore;

    constructor(props: any) {
        super(props);
        console.log(`Initialize rootStore ${Date.now()}`);
        this.rootStore = new RootStore();
        globalRootStore = this.rootStore
    }

    public render() {
        return (
            <div className="App">
                <Router basename={"/navtrack"}>
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
                    </Switch>
                </Router>
            </div>
        );
    }

}

