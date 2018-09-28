import * as React from 'react';

import {LatLng} from "leaflet";
import {computed, observable} from "mobx";
import {observer} from "mobx-react";
import {RouteComponentProps} from "react-router";
import {globalRootStore} from "../App";
import {fetchJson, fetchJsonPost} from "../backend/Backend";
import teaserimg from '../images/IMG_0107.jpg'
import {MainMenu, MenuItem} from "../MainMenu";
import {RootStore} from "../RootStore";
import {Teaser} from "../Teaser";
import {CountryTo} from "../transport/CountryTo";
import {TrackTo} from "../transport/TrackTo";
import {TrackTypeTo} from "../transport/TrackTypeTo";
import {AdditionalTrackInfo} from "./AdditionalTrackInfo";
import {TrackCreateController} from "./TrackCreateController";
import {TrackMain} from "./TrackMain";
import {TrackPtDo} from "./TrackPtDo";

export interface IMapCenter {
    location: LatLng;
    label: string | null;
}

export enum EditOrCreate {
    edit,
    create
}

interface ITracksCreateMain extends RouteComponentProps<any> {
    rootStore: RootStore;
    mode: EditOrCreate;
}

interface IJson2GpxResponse {
    gpx: string
}

export interface InsertMode {
    position: InsertPosition;
    idx: number;
}

export enum InsertPosition {
    before = "before",
    after = "after"
}


@observer
export class TrackCreateMain extends React.Component<ITracksCreateMain, any> {
    private static emptyTrack(): TrackTo {
        return {
            country: "",
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
    @observable private selectedTrackPtIdx = -1;
    @observable private errorMsg: string | null = null;
    @observable private insertMode: InsertMode | null = null;

    constructor(props: ITracksCreateMain) {
        super(props);
        this.newTrack = TrackCreateMain.emptyTrack();
        this.changeTrackData = this.changeTrackData.bind(this);
        this.setMapCenter = this.setMapCenter.bind(this);
        this.addTrackPt = this.addTrackPt.bind(this);
        this.deleteTrackPt = this.deleteTrackPt.bind(this);
        this.saveTrack = this.saveTrack.bind(this);
        this.setSelectedTrackPt = this.setSelectedTrackPt.bind(this);
        this.setInsertMode = this.setInsertMode.bind(this);
    }

    public componentWillMount() {
        this.getCountries();
        this.getTracktypes();
        if (this.props.mode === EditOrCreate.edit) {
            globalRootStore.uiStore.currentMenuItem = MenuItem.tracks;
            this.getTrack(this.props.match.params.trackId)
        } else {
            globalRootStore.uiStore.currentMenuItem = MenuItem.create;
            this.newTrack = TrackCreateMain.emptyTrack();
        }
    }

    public componentDidMount() {
        console.log(`TrackCreateMain Called for track : ${this.props.match.params.trackId}`);
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
                    errorMsg={this.errorMsg}
                    mode={this.props.mode}
                    setSelectedTrackPt={this.setSelectedTrackPt}
                    selectedTrackPtIdx={this.selectedTrackPtIdx}
                    insertMode={this.insertMode}
                    setInsertMode={this.setInsertMode}
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
        this.trackPts.push(trackPt);
        console.log(this.trackPts.length)
    }

    private deleteTrackPt(idx: number) {
        this.trackPts = this.trackPts.filter((element, index, array) => index !== idx)
    }

    private getTrack(trackId: number) {
        fetchJson(`/api/tracks/${trackId}`)
            .then( (resp) => {
                this.newTrack = resp;
                this.trackPts = TrackMain.trackPtsFromGpxUtil(this.newTrack.gpx);
            })
    }

    private saveTrack(): string {
        this.errorMsg = null;
        if (this.trackPts.length <= 0) {
            return "No Trackpoints. Please select some track points for the track";
        }

        // convert tracklist to gpx track
        fetchJsonPost(`/api/trackutil/json2gpx?trackname=${this.newTrack.trackname}&author=${this.newTrack.owner!.username}`,
            JSON.stringify(this.trackPts))
            .then((json2GpxResponse: IJson2GpxResponse) => {
                this.newTrack.gpx = json2GpxResponse.gpx;
                console.log(`gpx: ${json2GpxResponse.gpx}`);

                // here save the track
                fetchJsonPost(this.newTrack.id === 0 ? "/api/createtrack" : "/api/updatetrack",
                    JSON.stringify(this.newTrack))
                    .then((saveResp) => {
                        if (saveResp !== undefined) {
                            const createdTrack: TrackTo = saveResp;
                            if (createdTrack.trackname !== undefined) {
                                console.log(`new track is: ${createdTrack.trackname}, id: ${createdTrack.id}`);
                                this.newTrack = createdTrack;
                                this.errorMsg = null
                            } else {
                                this.errorMsg = `Error on createTrack api : ${saveResp.message}`;
                                console.log(this.errorMsg)
                            }
                        }
                    })
                    .catch(ex => {
                        this.errorMsg = `Error on createTrack api : ${ex}`;
                        console.log(this.errorMsg)
                    });
            })
            .catch(ex => {
                this.errorMsg = `Error on json2gpx api : ${ex}`;
                console.log(this.errorMsg)
            });
        return "OK";
    }

    private changeTrackData(track: TrackTo) {
        this.newTrack = track;
    }

    private setMapCenter(mapCenter: IMapCenter) {
        this.mapCenter = mapCenter;
    }

    private setSelectedTrackPt(idx: number = -1) {
        this.selectedTrackPtIdx = idx;
    }

    private setInsertMode(mode: InsertMode | null = null) {
        this.insertMode = mode;
    }

    @computed
    private get additionalTrackInfo(): AdditionalTrackInfo {
        return {
            length: this.trackLengthInKm,
            trackPtCnt: TrackMain.trackPtsFromGpxUtil(this.newTrack.gpx).length
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

