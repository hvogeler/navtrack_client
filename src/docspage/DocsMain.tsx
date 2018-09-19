import * as React from 'react';

import {RouteComponentProps} from "react-router";
import {globalRootStore} from "../App";
import teaserimg from '../images/IMG_0107.jpg'
import {MainMenu, MenuItem} from "../MainMenu";
import {PageContent} from "../PageContent";
import {RootStore} from "../RootStore";
// import {PageTitle} from "../PageTitle";
import {Teaser} from "../Teaser";


interface IDocsMain extends RouteComponentProps<any> {
    rootStore: RootStore;
}
export class DocsMain extends React.Component<IDocsMain, any> {
    constructor(props: IDocsMain) {
        super(props);
    }

    public componentDidMount() {
        globalRootStore.uiStore.currentMenuItem = MenuItem.docs;
    }

    public render() {
        return (
            <div className="container-fluid">
                <MainMenu rootStore={this.props.rootStore!}/>
                <Teaser image={teaserimg} title={"Documentation"}/>
                <PageContent/>
            </div>
        );
    }
}

