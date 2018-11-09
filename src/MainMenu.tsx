import {observer} from "mobx-react";
import * as React from 'react'
import {FormEvent} from "react";
import {Link} from "react-router-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import {globalRootStore} from "./App";
import navureLogo from './images/Navure58-1.png'
import {RootStore} from "./RootStore";
import {Roles} from "./transport/RoleTo";

interface IMainMenu {
    rootStore: RootStore;
    refreshTrackList?: () => void;
}

export enum MenuItem {
    tracks,
    login,
    docs,
    create,
    editTrack,
    navure,
    logViewer
}

@observer
export class MainMenu extends React.Component<IMainMenu, any> {

    private static isActiveMenuItem(menuItem: MenuItem): string {
        if (menuItem === globalRootStore.uiStore.currentMenuItem) {
            return "active";
        }
        return "";
    }

    private searchField: string;

    constructor(props: IMainMenu) {
        super(props);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickSearchButton = this.onClickSearchButton.bind(this);
    }

    public render() {
        const isSearchBoxHidden = !(this.props.rootStore.uiStore.isLoggedIn && this.props.rootStore.uiStore.currentMenuItem === MenuItem.tracks);
        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light sticky-top">
                <Link className="navbar-brand" to="/intro"><img src={navureLogo} className="img-thumbnail" width="32px"
                                                                height="32px"/></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className={`nav-item ${MainMenu.isActiveMenuItem(MenuItem.tracks)} ${MainMenu.isActiveMenuItem(MenuItem.editTrack)}`}>
                            <Link className="nav-link" to={"/tracks"}>Tracks <span
                                className="sr-only">(current)</span></Link>
                        </li>
                        {globalRootStore.uiStore.isLoggedInWithRole(Roles.ROLE_USER) ?
                            <li className={`nav-item ${MainMenu.isActiveMenuItem(MenuItem.create)}`}>
                                <Link className="nav-link" to="/create">Create</Link>
                            </li> : ""
                        }
                        <li className={`nav-item ${MainMenu.isActiveMenuItem(MenuItem.docs)}`}>
                            <Link className="nav-link" to="/docs">Documentation</Link>
                        </li>
                        <li className={`nav-item ${MainMenu.isActiveMenuItem(MenuItem.login)}`}>
                            <Link className="nav-link"
                                  to="/login">{this.props.rootStore.uiStore.isLoggedIn ? `Logged in as ${this.props.rootStore.uiStore.user}` : "Login"}</Link>
                        </li>
                        <li className="nav-item" hidden={globalRootStore.uiStore.currentMenuItem !== MenuItem.create && globalRootStore.uiStore.currentMenuItem !== MenuItem.editTrack}>
                            <span className="nav-link" onClick={() => globalRootStore.uiStore.isMapViewMaximized = !globalRootStore.uiStore.isMapViewMaximized}>
                                {globalRootStore.uiStore.isMapViewMaximized ? "Smaller Map" : "Larger Map"}</span>
                        </li>
                        {globalRootStore.uiStore.isLoggedInWithRole(Roles.ROLE_ADMIN) ?
                            <li className={`nav-item ${MainMenu.isActiveMenuItem(MenuItem.logViewer)}`}>
                                <Link className="nav-link" to="/logViewer">Log Viewer</Link>
                            </li> : ""
                        }
                    </ul>

                    <form className="form-inline my-3 my-lg-0" hidden={isSearchBoxHidden}>
                        <input className="form-control mr-lg-3" type="search" placeholder="Search"
                               aria-label="Search" onChange={this.onChangeHandler}  hidden={isSearchBoxHidden}/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit"
                                onClick={(event) => this.onClickSearchButton(event)} hidden={isSearchBoxHidden}>Search
                        </button>
                    </form>
                </div>
            </nav>
        )
    }

    private onChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.searchField = event.currentTarget.value;
    }

    private onClickSearchButton(event: FormEvent) {
        globalRootStore.uiStore.searchText = this.searchField;
        if (this.props.refreshTrackList) {
            this.props.refreshTrackList();
        }
        event.preventDefault();
    }
}