import * as React from 'react';

import {action, computed, observable} from "mobx";
import {observer} from "mobx-react";
import {fetchJson} from "../backend/Backend";
import teaserimg from '../images/IMG_0107.jpg'
import {PageTitle} from "../PageTitle";
import {Teaser} from "../Teaser";
import {AdditionalTrackInfo} from "./AdditionalTrackInfo";
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
            const trackPts = this.trackPtsFromGpx;
            return (
                <div>
                    <Teaser image={teaserimg}/>
                    <PageTitle title={"Tracks"}/>
                    <TrackList currentTrackListId={this.currentTrackListId}
                               setCurrentTrackListId={this.setCurrentTrack}
                               trackList={this.trackListData}/>
                    <TrackDetailController
                        trackData={this.currentTrack}
                        trackPts={trackPts}
                        additionalTrackInfo={this.additionalTrackInfo}
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
                this.currentTrackListId = tracks[0].id
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

    @computed
    private get currentTrack(): TrackDo {
        return this.trackListData[this.findIndexForTrackListid(this.currentTrackListId)]
    }

    @computed
    private get trackPtsFromGpx(): TrackPtDo[] {
        if (this.currentTrack === undefined) {
            return []
        }
        const doc = (new DOMParser()).parseFromString(this.currentTrack.gpx, 'text/xml');
        const elements = TracksMain.nodeListtoArray(doc.querySelectorAll("trkpt"));
        return elements.map((element) => {
            return {
                ele: 0,
                lat: +(element.getAttribute("lat") || 0),
                lng: +(element.getAttribute("lon") || 0),
            }
        })

    }

    @computed
    private get additionalTrackInfo(): AdditionalTrackInfo {
        return {
            length: 42.1,
            trackPtCnt: this.trackPtsFromGpx.length
        }
    }

}

