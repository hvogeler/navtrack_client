import {observer} from "mobx-react";
import * as React from "react";
import {RouteComponentProps} from "react-router";
import {fetchJsonPost} from "../backend/Backend";
import teaserimg from '../images/IMG_0107.jpg'
import {MainMenu} from "../MainMenu";
import {RootStore} from "../RootStore";
import {Teaser} from "../Teaser";
import {UserTo} from "../transport/UserTo";
import {LoginDlg} from "./LoginDlg";


interface ILoginDlgMain extends RouteComponentProps<any> {
    rootStore: RootStore;
}

interface IJwtResponse {
    jwt: string;
    user: UserTo;
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
                <LoginDlg setCredentials={this.setCredentials} isLoggedIn={this.props.rootStore.uiStore.isLoggedIn}
                          logout={this.logOut}/>
            </div>
        );
    }

    private setCredentials(user: string | null, password: string | null): Promise<any> {
        this.clearUserStore();
        return fetchJsonPost("/auth/requestJwt", JSON.stringify({"user": user, "password": password}))
            .then((response: any) => {
                const {status} = response;
                if (status === undefined) {
                    const jwtResponse = response as IJwtResponse;
                    this.props.rootStore.uiStore.user = user;
                    this.props.rootStore.uiStore.password = password;
                    this.props.rootStore.uiStore.isLoggedIn = true;
                    this.props.rootStore.uiStore.secToken = jwtResponse.jwt;
                    this.props.rootStore.uiStore.userDo = jwtResponse.user;
                    console.log(`LoginDlgMain: Received token ${jwtResponse.jwt}`);
                    console.log(`LoginDlgMain: Received user ${jwtResponse.user.username}`);
                } else {
                    console.log(`LoginDlgMain: Received error response ${status}`);

                }
            });
    }

    private clearUserStore() {
        this.props.rootStore.uiStore.user = null;
        this.props.rootStore.uiStore.password = null;
        this.props.rootStore.uiStore.isLoggedIn = false;
        this.props.rootStore.uiStore.secToken = null;
        this.props.rootStore.uiStore.userDo = null;

    }

    private logOut() {
        console.log(`Logging out ${this.props.rootStore.uiStore.user}/${this.props.rootStore.uiStore.password}`);
        this.clearUserStore()

    }

}