import * as React from 'react';

import teaserimg from '../images/IMG_0107.jpg'
import {Teaser} from "../Teaser";

export class IntroMain extends React.Component {
    public render() {
        return (
            <div className="container-fluid">
                <Teaser image={teaserimg} title={"Introduction"}/>
                Navure is an iPhone app that guides you thru nature.
            </div>
        );
    }
}

