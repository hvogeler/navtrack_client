import * as elasticsearch from "elasticsearch";
import {LatLng} from "leaflet";
import {computed, observable} from "mobx";
import {observer} from "mobx-react";
import * as React from 'react';
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
        this.readGpxFile = this.readGpxFile.bind(this);
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
            this.trackPts = [];
        }
    }

    public componentDidMount() {
        console.log(`TrackCreateMain Called for track : ${this.props.match.params.trackId}`);
    }

    public render() {
        return (
            <div>
                <MainMenu rootStore={this.props.rootStore}/>
                <Teaser image={teaserimg} title={this.props.mode === EditOrCreate.create ? "New Track" : "Edit Track"}/>
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
                    readGpxFile={this.readGpxFile}
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
        if (this.insertMode == null) {
            this.trackPts.push(trackPt);
        } else {
            const at = this.insertMode.position === InsertPosition.before ? this.insertMode.idx : this.insertMode.idx + 1;
            this.trackPts.splice(at, 0, trackPt);
            this.setInsertMode(null);
        }
        console.log(this.trackPts.length)
    }

    private deleteTrackPt(idx: number) {
        this.trackPts = this.trackPts.filter((element, index, array) => index !== idx)
    }

    private getTrack(trackId: number) {
        fetchJson(`/api/tracks/${trackId}`)
            .then((resp) => {
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
                                this.errorMsg = null;
                                this.indexTrackForSearch(this.newTrack);
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

    private readGpxFile(gpxfile: File) {
        this.resetTrackData();
        const reader = new FileReader();
        reader.onload = () => {
            console.log(`reading file`);
        };
        reader.onloadend = () => {
            const gpxdoc = reader.result.toString()
            console.log(`finished reading file `)
            console.log(gpxdoc);
            let tracknameFromGpx: string | null = null;
            try {
                tracknameFromGpx = TrackMain.trackMetadataFromGpxUtil(gpxdoc).trackname;
            } catch (e) {
                this.errorMsg = e.toString();
                return;
            }
            this.newTrack.trackname = tracknameFromGpx || "";
            this.trackPts = TrackMain.trackPtsFromGpxUtil(gpxdoc);
        };
        reader.readAsText(gpxfile);
        this.errorMsg = null;
    }

    private resetTrackData() {
        this.newTrack = TrackCreateMain.emptyTrack();
        this.trackPts = [];
        this.selectedTrackPtIdx = -1;
    }

    private async indexTrackForSearch(track: TrackTo) {
        const ELASTIC_URL = process.env.REACT_APP_ELASTIC_URL;
        const es = new elasticsearch.Client({
            host: ELASTIC_URL,
            log: 'trace'
        });

        if (this.props.mode === EditOrCreate.edit) {
            const response = await es.update({
                body: {
                    "doc": {
                        "country": track.country,
                        "created": track.created,
                        "description": track.description,
                        "owner": track.owner!.username,
                        "owneremail": track.owner!.email,
                        "region": track.region,
                        "trackid": track.id,
                        "trackname": track.trackname,
                        "tracktypes": track.tracktypes.join(" ")
                    }
                },
                id: track.id.toString(),
                index: 'tracks',
                refresh: "true",
                type: 'track',
            });
            console.log(`Elastic create response ${response}`);
        } else {
            const response = await es.create({
                body: {
                    "country": track.country,
                    "created": track.created,
                    "description": track.description,
                    "owner": track.owner!.username,
                    "owneremail": track.owner!.email,
                    "region": track.region,
                    "trackid": track.id,
                    "trackname": track.trackname,
                    "tracktypes": track.tracktypes.join(" ")
                },
                id: track.id.toString(),
                index: 'tracks',
                refresh: "true",
                type: 'track',
            });
            console.log(`Elastic create response ${response}`);
        }

    }

    private changeTrackData(track: TrackTo) {
        this.newTrack = track;
    }

    private setMapCenter(mapCenter: IMapCenter) {
        this.mapCenter = mapCenter;
    }

    private setSelectedTrackPt(idx: number = -1) {
        this.selectedTrackPtIdx = idx;
        // kill insert mode if another trackpoint iss selected
        if (this.insertMode !== null && this.insertMode.idx !== idx) {
            this.insertMode = null;
        }
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

