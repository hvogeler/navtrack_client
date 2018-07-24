import * as React from 'react';

import {LatLng} from "leaflet";
import {action, computed, observable} from "mobx";
import {observer} from "mobx-react";
import teaserimg from '../images/IMG_0107.jpg'
import {PageTitle} from "../PageTitle";
import {Teaser} from "../Teaser";
import {AdditionalTrackInfo} from "./AdditionalTrackInfo";
import {TrackCreateController} from "./TrackCreateController";
import {TrackDo} from "./TrackDo";
import {TrackPtDo} from "./TrackPtDo";

@observer
export class TracksCreateMain extends React.Component {

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

    public render() {
        return (
            <div>
                <Teaser image={teaserimg}/>
                <PageTitle title={"New Track"}/>
                <TrackCreateController
                    trackData={this.currentTrack}
                    trackPts={[]}
                    additionalTrackInfo={this.additionalTrackInfo}
                />
            </div>
        );
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
        const elements = TracksCreateMain.nodeListtoArray(doc.querySelectorAll("trkpt"));
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
            length: this.trackLengthInKm,
            trackPtCnt: this.trackPtsFromGpx.length
        }
    }

    @computed
    private get trackLengthInKm(): number {
        let akku = 0;
        this.trackPtsFromGpx.forEach(
            (trackPt, idx, v) => {
                if (idx === 0) {
                    return;
                }
                const latlng1 = new LatLng(v[idx].lat, v[idx].lng);
                const latlng2 = new LatLng(v[idx - 1].lat, v[idx - 1].lng);
                akku += latlng1.distanceTo(latlng2)
            }
        );

        return akku / 1000;
    }

}

