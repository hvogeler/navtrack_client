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
    @observable private isJwtExpired = false;

    private timerId: any;

    constructor(props: ILogViewerMain) {
        super(props);
        this.refreshListData = this.refreshListData.bind(this);
    }

    public componentDidMount() {
        this.refreshListData();
        this.timerId = setInterval(this.refreshListData, 10000);
        globalRootStore.uiStore.currentMenuItem = MenuItem.logViewer;
    }

    public render() {
        if (this.isJwtExpired) {
            return null;
        }
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
        this.errorMsg = null;
        fetchJson("/api/log/recent?reccnt=30")
            .then((response) => {
                if (this.isExpiredJwt(response)) {
                    return
                }

                this.logListData = [];
                if (response instanceof Array) {
                    this.logListData = response;
                } else {
                    if (response !== undefined) {
                        let msg = "Unknown Error";
                        if (typeof response === "string") {
                            msg = response;
                        }
                        if (response.hasOwnProperty("message")) {
                            msg = response.message
                        }
                        clearInterval(this.timerId);
                        throw Error(msg)
                    }
                }
            }).catch((error) => {
            this.errorMsg = `${error}`
        });
    }

    private isExpiredJwt(resp: any) : boolean {
        try {
            const respException = JSON.parse(resp);
            if (respException.exception !== undefined) {
                this.errorMsg = `Error on createTrack api : ${resp}`;
                if (this.errorMsg !== null && (this.errorMsg.includes("expired") || this.errorMsg.includes("period"))) {
                    this.isJwtExpired = true;
                    globalRootStore.uiStore.clearUserStore();
                    clearInterval(this.timerId);
                    this.props.history.push("/login");
                    return true;
                }
            }
        } catch (e) {
            ;
        }
        return false;
    }

}

