import {observer} from "mobx-react";
import * as React from 'react'
import {Link} from "react-router-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import {RootStore} from "./RootStore";

interface IMainMenu  {
    rootStore: RootStore;
}


@observer
export class MainMenu extends React.Component<IMainMenu, any> {
    constructor(props: IMainMenu) {
        super(props);
    }

    public render() {
        console.log(`MainMenu: SecToken = ${this.props.rootStore.uiStore.secToken}, user = ${this.props.rootStore.uiStore.user}`);
        return (
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/intro">Navure</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to={"/tracks"}>Tracks <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/create">Create</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/docs">Documentation</Link>
                            </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">{this.props.rootStore.uiStore.isLoggedIn ? `Logged in as ${this.props.rootStore.uiStore.user}` : "Login"}</Link>
                                </li>
                        </ul>

                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                   aria-label="Search"/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </div>
        )
    }
}