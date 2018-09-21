import * as React from 'react';

import {LatLng} from "leaflet";
import {computed, observable} from "mobx";
import {observer} from "mobx-react";
import {RouteComponentProps} from "react-router";
import {globalRootStore} from "../App";
import {fetchJson} from "../backend/Backend";
import teaserimg from '../images/IMG_0107.jpg'
import {MainMenu, MenuItem} from "../MainMenu";
import {RootStore} from "../RootStore";
import {Teaser} from "../Teaser";
import {CountryTo} from "../transport/CountryTo";
import {TrackTo} from "../transport/TrackTo";
import {TrackTypeTo} from "../transport/TrackTypeTo";
import {AdditionalTrackInfo} from "./AdditionalTrackInfo";
import {TrackCreateController} from "./TrackCreateController";
import {TrackPtDo} from "./TrackPtDo";

export interface IMapCenter {
    location: LatLng;
    label: string;
}

interface ITracksCreateMain extends RouteComponentProps<any> {
    rootStore: RootStore;
}

@observer
export class TracksCreateMain extends React.Component<ITracksCreateMain, any> {

    private static nodeListtoArray(nodeList: NodeListOf<Element>): Element[] {
        const elements: Element[] = [];
        let i: number;
        for (i = 0; i < nodeList.length; i++) {
            console.log(`${i}. (${nodeList.item(i).getAttribute("lat")}, ${nodeList.item(i).getAttribute("lon")}`)
            elements.push(nodeList.item(i))
        }
        return elements
    }

    private static emptyTrack(): TrackTo {
        return {
            country: null,
            created: "",
            description: "",
            gpx: "",
            id: 0,
            owner: null,
            region: "",
            trackname: "",
            tracktypes: []
        }
    }

    @observable private newTrack: TrackTo;
    @observable private mapCenter: IMapCenter = {
        label: "Eifel, Germany",
        location: new LatLng(50.0, 6.98, 49),
    };
    @observable private trackPts: TrackPtDo[] = [];

    constructor(props: ITracksCreateMain) {
        super(props);
        this.newTrack = TracksCreateMain.emptyTrack();
        this.changeTrackData = this.changeTrackData.bind(this);
        this.setMapCenter = this.setMapCenter.bind(this);
        this.addTrackPt = this.addTrackPt.bind(this);
        this.deleteTrackPt = this.deleteTrackPt.bind(this);
        this.saveTrack = this.saveTrack.bind(this);
    }

    public componentWillMount() {
        this.getCountries();
        this.getTracktypes();
    }

    public componentDidMount() {
        globalRootStore.uiStore.currentMenuItem = MenuItem.create;
    }

    public render() {
        return (
            <div>
                <MainMenu rootStore={this.props.rootStore}/>
                <Teaser image={teaserimg} title={"New Track"}/>
                <TrackCreateController
                    trackData={this.newTrack}
                    trackPts={this.trackPts}
                    additionalTrackInfo={this.additionalTrackInfo}
                    changeTrack={this.changeTrackData}
                    mapCenter={this.mapCenter}
                    setMapCenter={this.setMapCenter}
                    addTrackPt={this.addTrackPt}
                    deleteTrackPt={this.deleteTrackPt}
                    trackLengthInKm={this.trackLengthInKm}
                    countries={globalRootStore.uiStore.countries}
                    tracktypes={globalRootStore.uiStore.tracktypes}
                    saveTrack={this.saveTrack}
                />
            </div>
        );
    }

    private getCountries() {
        if (globalRootStore.uiStore.countries.length === 0) {
            fetchJson("/api/countries")
                .then((countries: CountryTo[]) => {
                    globalRootStore.uiStore.countries = countries;
                });
        } else {
            console.log("countries still exist. not fetched again.")
        }
    }

    private getTracktypes() {
        if (globalRootStore.uiStore.tracktypes.length === 0) {
            fetchJson("/api/tracktypes")
                .then((tracktypes: TrackTypeTo[]) => {
                    globalRootStore.uiStore.tracktypes = tracktypes;
                });
        } else {
            console.log("tracktypes still exist. not fetched again.")
        }
    }

    private addTrackPt(trackPt: TrackPtDo) {
        this.trackPts.push(trackPt)
        console.log(this.trackPts.length)
    }

    private deleteTrackPt(idx: number) {
        this.trackPts.filter((element, index, array) => index !== idx)
    }

    private saveTrack() : boolean {
        if (this.trackPts.length <= 0) {
            return false;
        }

        return true;
    }

    private changeTrackData(track: TrackTo) {
        this.newTrack = track;
    }

    private setMapCenter(mapCenter: IMapCenter) {
        this.mapCenter = mapCenter;
    }

    private get trackPtsFromGpx(): TrackPtDo[] {
        if (this.newTrack === undefined) {
            return []
        }
        const doc = (new DOMParser()).parseFromString(this.newTrack.gpx, 'text/xml');
        const elements = TracksCreateMain.nodeListtoArray(doc.querySelectorAll("trkpt"));
        return elements.map((element) =>
            new TrackPtDo(+(element.getAttribute("lat") || 0),
                +(element.getAttribute("lon") || 0),
                0));

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
        this.trackPts.forEach(
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

