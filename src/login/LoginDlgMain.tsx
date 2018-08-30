import * as React from "react";
import teaserimg from '../images/IMG_0107.jpg'
import {PageTitle} from "../PageTitle";
import {Teaser} from "../Teaser";
import {LoginDlg} from "./LoginDlg";

export class LoginDlgMain extends React.Component<any, any> {

    public render() {
        return (
            <div>
                <Teaser image={teaserimg}/>
                <PageTitle title={"Login"}/>
                <LoginDlg/>
             </div>
       );
    }

}