import * as React from 'react';

import teaserimg from '../images/IMG_0107.jpg'
import {PageTitle} from "../PageTitle";
import {Teaser} from "../Teaser";

export class IntroMain extends React.Component {
    public render() {
        return (
            <div className="container-fluid">
                <Teaser image={teaserimg}/>
                <PageTitle title={"Introduction"}/>
                Navure is an iPhone app that guides you thru nature.
            </div>
        );
    }
}

