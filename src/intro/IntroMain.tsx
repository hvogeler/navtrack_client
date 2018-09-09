import * as React from 'react';

import {RouteComponentProps} from "react-router";
import teaserimg from '../images/IMG_0107.jpg'
import {MainMenu} from "../MainMenu";
import {RootStore} from "../RootStore";
import {Teaser} from "../Teaser";

interface IIntro extends RouteComponentProps<any> {
    rootStore: RootStore;
}

export class IntroMain extends React.Component<IIntro, any> {
    constructor(props: IIntro) {
        super(props);
    }

    public render() {
        return (
            <div className="container-fluid">
                <MainMenu rootStore={this.props.rootStore!}/>
                <Teaser image={teaserimg} title={"Introduction"}/>
                Navure is an iPhone app that guides you thru nature.
            </div>
        );
    }
}

