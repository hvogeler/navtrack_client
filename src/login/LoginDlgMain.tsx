
import {observer} from "mobx-react";
import * as React from "react";
import {RouteComponentProps} from "react-router";
import teaserimg from '../images/IMG_0107.jpg'
import {MainMenu} from "../MainMenu";
import {RootStore} from "../RootStore";
import {Teaser} from "../Teaser";
import {LoginDlg} from "./LoginDlg";

interface ILoginDlgMain extends RouteComponentProps<any> {
    rootStore: RootStore;
}

@observer
export class LoginDlgMain extends React.Component<ILoginDlgMain, any> {

    constructor(props: ILoginDlgMain) {
        super(props);
        this.setCredentials = this.setCredentials.bind(this);
        this.logOut = this.logOut.bind(this);
        this.setState = this.setState.bind(this);
    }

    public render() {
        return (
            <div>
                <MainMenu rootStore={this.props.rootStore!}/>
                <Teaser image={teaserimg} title={"Login"}/>
                <LoginDlg setCredentials={this.setCredentials} isLoggedIn={this.props.rootStore.uiStore.isLoggedIn} logout={this.logOut}/>
             </div>
       );
    }

    private setCredentials(user: string | null, password: string | null) {
        console.log(`LoginDlgMain: setCredentials for ${user}`);
        this.props.rootStore.uiStore.user = user;
        this.props.rootStore.uiStore.password = password;
        this.props.rootStore.uiStore.isLoggedIn = true;
    }

    private logOut() {
        console.log(`Logging out ${this.props.rootStore.uiStore.user}/${this.props.rootStore.uiStore.password}`);
        this.props.rootStore.uiStore.user = null;
        this.props.rootStore.uiStore.password = null;
        this.props.rootStore.uiStore.isLoggedIn = false;
    }

}