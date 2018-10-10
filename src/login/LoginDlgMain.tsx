import {observer} from "mobx-react";
import * as React from "react";
import {RouteComponentProps} from "react-router";
import {globalRootStore} from "../App";
import {fetchJson, fetchJsonPost} from "../backend/Backend";
import teaserimg from '../images/IMG_0107.jpg'
import {MainMenu, MenuItem} from "../MainMenu";
import {RootStore} from "../RootStore";
import {Teaser} from "../Teaser";
import {UserTo} from "../transport/UserTo";
import {LoginDlg} from "./LoginDlg";
import {RegisterDlg} from "./RegisterDlg";
import {SetPasswordDlg} from "./SetPasswordDlg";


interface ILoginDlgMain extends RouteComponentProps<any> {
    rootStore: RootStore;
}

interface IJwtResponse {
    jwt: string;
    user: UserTo;
}

@observer
export class LoginDlgMain extends React.Component<ILoginDlgMain, any> {

    private errMsg: string | null = null;

    constructor(props: ILoginDlgMain) {
        super(props);
        this.setCredentials = this.setCredentials.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.logOut = this.logOut.bind(this);
        this.setState = this.setState.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

    public componentDidMount() {
        globalRootStore.uiStore.currentMenuItem = MenuItem.login;
    }

    public render() {
        if (this.props.match.params.confirmationkey) {
            return (
                <div>
                    <MainMenu rootStore={this.props.rootStore!}/>
                    <Teaser image={teaserimg} title={"Set Password"}/>
                    <SetPasswordDlg confirmationkey={this.props.match.params.confirmationkey as string}
                                    setPassword={this.setPassword}/>
                </div>
            );
        } else {
            return (
                <div>
                    <MainMenu rootStore={this.props.rootStore!}/>
                    <Teaser image={teaserimg} title={"Login"}/>
                    <LoginDlg setCredentials={this.setCredentials} isLoggedIn={this.props.rootStore.uiStore.isLoggedIn}
                              logout={this.logOut}
                              forgotPassword={this.forgotPassword}/>
                    <RegisterDlg isLoggedIn={this.props.rootStore.uiStore.isLoggedIn}
                                 registerUser={this.registerUser}
                                 errMsg={this.errMsg}
                    />
                </div>
            );
        }
    }

    private registerUser(email: string | null, user: string | null, password: string | null): Promise<any> {
        return fetchJsonPost("/auth/registerUser", JSON.stringify({"email": email, "user": user, "password": password}))
            .then((response: any) => {
                const {status} = response;
                if (status === undefined) {
                    return "Please check your Email and confirm your registration"
                } else {
                    return response.message;
                }
            });
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
                    return response.message;

                }
            });
    }

    private forgotPassword(user: string | null): Promise<string> {
        return fetchJsonPost("/auth/forgotPassword", user || "")
            .then((response: any) => {
                const {status} = response;
                if (status === undefined) {
                    return "Please check your Email and confirm your password reset"
                } else {
                    return response.message;
                }
            });
    }

    private setPassword(password: string, confirmationkey: string): Promise<string> {
        const params = {
            "confirmationkey": confirmationkey,
            "password": password,
        };

        const path = `/auth/resetPassword?confirmationkey=${params.confirmationkey}&password=${params.password}`;
        return fetchJson(path)
            .then((response: any) => {
                this.props.history.push("/login");
                return "Password has been reset"
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