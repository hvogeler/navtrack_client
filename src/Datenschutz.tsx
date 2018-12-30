import {observable} from "mobx";
import {observer} from "mobx-react";
import * as React from 'react'
import {RouteComponentProps} from "react-router";
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import teaserimg from './images/IMG_0107.jpg'
import {MainMenu} from "./MainMenu";
import {RootStore} from "./RootStore";
import {Teaser} from "./Teaser";


interface IDatenschutzProps extends RouteComponentProps<any> {
    rootStore: RootStore;
}

@observer
export class Datenschutz extends React.Component<IDatenschutzProps> {
    @observable private datenschutzMobile: string = "";
    @observable private datenschutzWeb: string = "";

    constructor(props: IDatenschutzProps) {
        super(props)
    }

    public componentDidMount() {
        fetch("/datenschutz_mobile.html").then((response) => response.text())
            .then((text) => this.datenschutzMobile = text);

        fetch("/datenschutz_web.html").then((response) => response.text())
            .then((text) => this.datenschutzWeb = text);
    }

    public render() {
        return (
            <div className="container-fluid">
                <MainMenu rootStore={this.props.rootStore!}/>
                <div className="row">
                    <Teaser image={teaserimg} title={"Datenschutzhinweise"}/>
                </div>
                <div>
                    <div className="row">
                        <div className="card col-sm-5 ml-1">
                            <div className="card-body">
                                <h2 className="card-title">
                                    Mobile App
                                </h2>
                                <div className="card-text">
                                    <div className="text-secondary"
                                         dangerouslySetInnerHTML={{__html: this.datenschutzMobile}}/>
                                </div>
                            </div>
                        </div>
                        <div className="card col-sm-5 ml-1">
                            <div className="card-body">
                                <h2 className="card-title">
                                    Web Page
                                </h2>
                                <div className="card-text">
                                    <div className="text-secondary" dangerouslySetInnerHTML={{__html: this.datenschutzWeb}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}