import * as React from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {DocsMain} from "./docspage/DocsMain";
import {IntroMain} from "./intro/IntroMain";
import {MainMenu} from "./MainMenu";
import './styles/mainstyles.css'
import {TracksMain} from "./trackspage/TracksMain"

export class App extends React.Component {
  public render() {
    return (
      <div className="App">
          <MainMenu/>
          <Router>
              <Switch>
                  <Route exact={true} path="/" component={TracksMain}/>
                  <Route exact={true} path="/tracks" component={TracksMain}/>
                  <Route exact={true} path="/docs" component={DocsMain}/>
                  <Route exact={true} path="/intro" component={IntroMain}/>
              </Switch>
          </Router>
      </div>
    );
  }
}

