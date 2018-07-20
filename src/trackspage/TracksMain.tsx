import * as React from 'react';

import {action, observable} from "mobx";
import {observer} from "mobx-react";
import {fetchJson} from "../backend/Backend";
import teaserimg from '../images/IMG_0107.jpg'
import {PageTitle} from "../PageTitle";
import {Teaser} from "../Teaser";
import {TrackDetailController} from "./TrackDetailController";
import {TrackDo} from "./TrackDo";
import {TrackList} from "./TrackList";

@observer
export class TracksMain extends React.Component {

    @observable
    public currentTrackListId: number = 1;


    @observable private trackListData: TrackDo[] = [];

    public componentWillMount() {
        this.refreshTrackListData()
    }

    public componentDidMount() {
        this.refreshTrackListData()
    }

    public render() {
        if (this.trackListData.length <= 0) {
            return (
                <div>
                    <Teaser image={teaserimg}/>
                    <PageTitle title={"Tracks"}/>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Teaser image={teaserimg}/>
                    <PageTitle title={"Tracks"}/>
                    <TrackList currentTrackListId={this.currentTrackListId}
                               setCurrentTrackListId={(id: number) => this.currentTrackListId = id}
                               trackList={this.trackListData}/>
                    <TrackDetailController
                        trackData={this.trackListData[this.findIndexForTrackListid(this.currentTrackListId)]}/>
                </div>
            );
        }
    }

    @action
    private refreshTrackListData() {
        fetchJson("/api/tracks")
            .then((tracks) => {
                this.trackListData = tracks
            })

    }

    private findIndexForTrackListid(id: number): number {
        const idx = this.trackListData.findIndex((value, index) =>
            value.id === id
        );
        return idx >= 0 ? idx : 0
    }
}

