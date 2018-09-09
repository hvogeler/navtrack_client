
import {observer} from "mobx-react";
import * as React from "react";
import teaserimg from '../images/IMG_0107.jpg'
import {rootStore} from "../RootStore";
import {Teaser} from "../Teaser";
import {LoginDlg} from "./LoginDlg";

@observer
export class LoginDlgMain extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.setCredentials = this.setCredentials.bind(this);
        this.logOut = this.logOut.bind(this);
        this.setState = this.setState.bind(this);
    }

    public render() {
        return (
            <div>
                <Teaser image={teaserimg} title={"Login"}/>
                <LoginDlg setCredentials={this.setCredentials} isLoggedIn={rootStore.uiStore.isLoggedIn} logout={this.logOut}/>
             </div>
       );
    }

    private setCredentials(user: string | null, password: string | null) {
        rootStore.uiStore.user = user;
        rootStore.uiStore.password = password;
        rootStore.uiStore.isLoggedIn = true;
    }

    private logOut() {
        console.log(`Logging out ${rootStore.uiStore.user}/${rootStore.uiStore.password}`);
        rootStore.uiStore.user = null;
        rootStore.uiStore.password = null;
        rootStore.uiStore.isLoggedIn = false;
    }

}