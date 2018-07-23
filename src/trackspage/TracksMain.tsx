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
import {TrackPtDo} from "./TrackPtDo";

@observer
export class TracksMain extends React.Component {

    private static nodeListtoArray(nodeList: NodeListOf<Element>): Element[] {
        const elements: Element[] = [];
        let i: number;
        for (i = 0; i < nodeList.length; i++) {
            console.log(`${i}. (${nodeList.item(i).getAttribute("lat")}, ${nodeList.item(i).getAttribute("lon")}`)
            elements.push(nodeList.item(i))
        }
        return elements
    }

    private static trackPtsFromGpx(track: TrackDo): TrackPtDo[] {
        if (track === undefined) {
            return []
        }
        const xxx = (new DOMParser()).parseFromString(track.gpx, 'text/xml');
        const elements = TracksMain.nodeListtoArray(xxx.querySelectorAll("trkpt"));
        return elements.map((element) => {
            return {
                ele: 0,
                lat: +(element.getAttribute("lat") || 0),
                lng: +(element.getAttribute("lon") || 0),
            }
        })

    }

    @observable
    public currentTrackListId: number = 1;

    @observable private trackListData: TrackDo[] = [];

    constructor(props: any) {
        super(props);
        this.setCurrentTrack = this.setCurrentTrack.bind(this);
    }

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
            const trackPts = TracksMain.trackPtsFromGpx(this.trackListData[this.findIndexForTrackListid(this.currentTrackListId)]);
            return (
                <div>
                    <Teaser image={teaserimg}/>
                    <PageTitle title={"Tracks"}/>
                    <TrackList currentTrackListId={this.currentTrackListId}
                               setCurrentTrackListId={this.setCurrentTrack}
                               trackList={this.trackListData}/>
                    <TrackDetailController
                        trackData={this.trackListData[this.findIndexForTrackListid(this.currentTrackListId)]}
                        trackPts={trackPts}
                    />
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

    @action
    private setCurrentTrack(id: number) {
        this.currentTrackListId = id
    }

}

