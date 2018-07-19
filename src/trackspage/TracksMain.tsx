import * as React from 'react';

import teaserimg from '../images/IMG_0107.jpg'
import {PageTitle} from "../PageTitle";
import {Teaser} from "../Teaser";
import {TrackList} from "./TrackList";

export class TracksMain extends React.Component {
    public render() {
        return (
            <div className="container-fluid">
                <Teaser image={teaserimg}/>
                <PageTitle title={"Tracks"}/>
                <TrackList/>
            </div>
        );
    }
}

