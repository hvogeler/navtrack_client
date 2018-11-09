import {action, observable} from "mobx";
import {observer} from "mobx-react";
import * as React from 'react';
import {RouteComponentProps} from "react-router";
import {globalRootStore} from "../App";
import {fetchJson} from "../backend/Backend";
import {Footer} from "../Footer";
import teaserimg from '../images/IMG_0107.jpg'
import {MainMenu, MenuItem} from "../MainMenu";
import {RootStore} from "../RootStore";
import {Teaser} from "../Teaser";
import {AccessLogTo} from "../transport/AccessLogTo";
import {LogViewerList} from "./LogViewerList";


interface ILogViewerMain extends RouteComponentProps<any> {
    rootStore: RootStore;
}

@observer
export class LogViewerMain extends React.Component<ILogViewerMain, any> {

    @observable private logListData: AccessLogTo[] = [];
    @observable private errorMsg: string | null = null;

    constructor(props: ILogViewerMain) {
        super(props);
        this.refreshListData = this.refreshListData.bind(this);
    }

    public componentDidMount() {
        this.refreshListData();
        setInterval(this.refreshListData, 10000)
        globalRootStore.uiStore.currentMenuItem = MenuItem.logViewer;
    }

    public render() {
        if (this.logListData.length <= 0) {
            return (
                <div>
                    <MainMenu rootStore={this.props.rootStore!}/>
                    <Teaser image={teaserimg} title={"Access Log"}/>
                    <div className="row" hidden={this.errorMsg === null}>
                        <div className="alert alert-warning col-sm-12" role="alert">
                            {this.errorMsg}
                        </div>
                    </div>
                    <div className="row">
                        <div className="alert alert-info col-sm-12" role="alert">
                            No Log Entry found
                        </div>
                    </div>
                    <div className="row">
                        <div className="row col-12 d-inline-block">
                            <Footer/>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <MainMenu rootStore={this.props.rootStore!}/>
                    <div className="row">
                        <Teaser image={teaserimg} title={"Access Log"}/>
                    </div>
                    <div className="row" hidden={this.errorMsg === null}>
                        <div className="alert alert-warning col-sm-12" role="alert">
                            {this.errorMsg}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <LogViewerList accessLogEntries={this.logListData}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row col-12 d-inline-block">
                            <Footer/>
                        </div>
                    </div>
                </div>
            );
        }
    }

    @action
    private refreshListData() {
        fetchJson("/api/log/recent?reccnt=30")
            .then((logEntries) => {
                this.logListData = [];
                if (logEntries instanceof Array) {
                    this.logListData = logEntries;
                } else {
                    if (logEntries !== undefined) {
                        let msg = "Unknown Error";
                        if (typeof logEntries === "string") {
                            msg = logEntries;
                        }
                        if (logEntries.hasOwnProperty("message")) {
                            msg = logEntries.message
                        }
                        throw Error(msg)
                    }
                }
            }).catch((error) => {
            this.errorMsg = `${error}`
        });
    }
}

