import {observable} from "mobx";
import {observer} from "mobx-react";
import * as React from "react";
import {RouteComponentProps} from "react-router";
import teaserimg from '../images/IMG_0107.jpg'
import {Teaser} from "../Teaser";
import {LoginDlg} from "./LoginDlg";

export interface ILoginDlgMain extends RouteComponentProps<any> {
    user: string | null;
    password: string | null;
    isLoggedIn: boolean;
}

@observer
export class LoginDlgMain extends React.Component<ILoginDlgMain, any> {

    @observable private user: string | null = null;
    @observable private password: string | null = null;
    @observable private isLoggedIn: boolean = false;

    constructor(props: ILoginDlgMain) {
        super(props);
        this.setCredentials = this.setCredentials.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    public render() {
        return (
            <div>
                <Teaser image={teaserimg} title={"Login"}/>
                <LoginDlg setCredentials={this.setCredentials} isLoggedIn={this.isLoggedIn} logout={this.logOut}/>
             </div>
       );
    }

    private setCredentials(user: string | null, password: string | null) {
        this.user = user;
        this.password = password;
        this.isLoggedIn = true;
        this.props.history.push("/tracks")
    }

    private logOut() {
        console.log(`Logging out ${this.user}/${this.password}`);
        this.user = null;
        this.password = null;
        this.isLoggedIn = false;
    }

}