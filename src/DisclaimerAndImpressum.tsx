import {observable} from "mobx";
import {observer} from "mobx-react";
import * as React from 'react'
import {RouteComponentProps} from "react-router";
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import teaserimg from './images/IMG_0107.jpg'
import {MainMenu} from "./MainMenu";
import {RootStore} from "./RootStore";
import {Teaser} from "./Teaser";


interface IDisclaimerAndImpressumProps extends RouteComponentProps<any> {
    rootStore: RootStore;
}

@observer
export class DisclaimerAndImpressum extends React.Component<IDisclaimerAndImpressumProps> {
    // private styles = {
    //     backgroundColor: 'rgba(255,255,255,0.6)',
    //     height: '20px',
    // };

    @observable private disclaimer: string = "";
    @observable private impressum: string = "";

    constructor(props: IDisclaimerAndImpressumProps) {
        super(props)
    }

    public componentDidMount() {
        fetch("/disclaimer.html").then((response) => response.text())
            .then((text) => this.disclaimer = text);

        fetch("/impressum.html").then((response) => response.text())
            .then((text) => this.impressum = text);
    }

    public render() {
        return (
            <div className="container-fluid">
                <MainMenu rootStore={this.props.rootStore!}/>
                <div className="row">
                    <Teaser image={teaserimg} title={"Disclaimer and Impressum"}/>
                </div>
                <div>
                    <div className="row">
                        <div className="card col-sm-5 ml-1">
                            <div className="card-body">
                                <h2 className="card-title">
                                    Disclaimer
                                </h2>
                                <div className="card-text">
                                    <div className="text-secondary"
                                         dangerouslySetInnerHTML={{__html: this.disclaimer}}/>
                                </div>
                            </div>
                        </div>
                        <div className="card col-sm-5 ml-1">
                            <div className="card-body">
                                <h2 className="card-title">
                                    Impressum
                                </h2>
                                <div className="card-text">
                                    <div className="text-secondary" dangerouslySetInnerHTML={{__html: this.impressum}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}