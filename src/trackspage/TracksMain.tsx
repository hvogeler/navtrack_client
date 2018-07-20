import * as React from 'react';

import {observable} from "mobx";
import {observer} from "mobx-react";
import teaserimg from '../images/IMG_0107.jpg'
import {PageTitle} from "../PageTitle";
import {Teaser} from "../Teaser";
import {TrackDetailController} from "./TrackDetailController";
import {TrackList} from "./TrackList";

@observer
export class TracksMain extends React.Component {

    @observable
    public currentTrackListId: number = 1;

    @observable
    private trackListData: TrackDo[] = [
        {
            country: "Germany",
            created: "2018-03-14 09:24:00",
            id: 1,
            length: 7.91,
            name: "Bayenthal_Jogging",
            region: "Cologne"
        },
        {
            country: "Switzerland",
            created: "2018-03-14 09:24:00",
            id: 2,
            length: 5.62,
            name: "Furggulti",
            region: "Wallis"
        }];

    public render() {
        return (
            <div>
                <Teaser image={teaserimg}/>
                <PageTitle title={"Tracks"}/>
                <TrackList currentTrackListId={this.currentTrackListId}
                           setCurrentTrackListId={(id: number) => this.currentTrackListId = id}
                           trackList={this.trackListData}/>
                <TrackDetailController trackData={this.trackListData[this.findIndexForTrackListid(this.currentTrackListId)]}/>
            </div>
        );
    }

    private findIndexForTrackListid(id: number): number {
        const idx = this.trackListData.findIndex((value, index) =>
            value.id === id
        );
        return idx >= 0 ? idx : 0
    }
}

