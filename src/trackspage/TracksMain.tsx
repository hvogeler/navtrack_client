import * as React from 'react';

import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import {LatLng} from "leaflet";
import {action, computed, observable} from "mobx";
import {observer} from "mobx-react";
import {RouteComponentProps} from "react-router";
import {fetchJson} from "../backend/Backend";
import {AllTracksQ1} from "../graphql/q1types";
import teaserimg from '../images/IMG_0107.jpg'
import {MainMenu} from "../MainMenu";
import {RootStore} from "../RootStore";
// import {PageTitle} from "../PageTitle";
import {Teaser} from "../Teaser";
import {AdditionalTrackInfo} from "./AdditionalTrackInfo";
import {TrackDetailController} from "./TrackDetailController";
import {TrackDo} from "./TrackDo";
import {TrackList} from "./TrackList";
import {TrackPtDo} from "./TrackPtDo";

interface ITracksMain extends RouteComponentProps<any> {
    rootStore: RootStore;
}

@observer
export class TracksMain extends React.Component<ITracksMain, any> {

    private static nodeListtoArray(nodeList: NodeListOf<Element>): Element[] {
        const elements: Element[] = [];
        let i: number;
        for (i = 0; i < nodeList.length; i++) {
            // console.log(`${i}. (${nodeList.item(i).getAttribute("lat")}, ${nodeList.item(i).getAttribute("lon")}`)
            elements.push(nodeList.item(i))
        }
        return elements
    }

    @observable
    public currentTrackListId: number = 1;

    @observable private trackListData: TrackDo[] = [];

    constructor(props: ITracksMain) {
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
                    <MainMenu rootStore={this.props.rootStore!}/>
                    <Teaser image={teaserimg} title={"Tracks"}/>
                </div>
            )
        }
        else {
            const trackPts = this.trackPtsFromGpx;
            return (
                <div>
                    <MainMenu rootStore={this.props.rootStore!}/>
                    <Teaser image={teaserimg} title={"Tracks"}/>
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
            .then((tracks: TrackDo[]) => {
                this.trackListData = tracks;
                this.currentTrackListId = tracks[0].id
            });


        const client = new ApolloClient({
            request : async operation => {
                operation.setContext({
                    headers: {
                        authorization: "Basic aHZvOmh2bw=="
                    }
                })
            },
            uri : "http://192.168.178.21:8080/graphql"
        });

        client.query<AllTracksQ1>({
            query: gql`
                query AllTracksQ1 {
                    allTracks {
                        trackname
                        region
                        tracktypes {
                            tracktypename
                        }
                    }
                }
            `
            }
        ).then( (result) => {
            const res = result.data.allTracks!.map( (value) => {
                return value != null ? value.region : "";
            });
            console.log(res);
        });
    }

    private findIndexForTrackListid(id: number): number {
        const idx = this.trackListData.findIndex((value, index) =>
            value.id === id
        );
        return idx >= 0 ? idx : 0
    }

    @action
    private setCurrentTrack(id: number) {
        this.currentTrackListId = id;
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
        this.trackPtsFromGpx.forEach(
            (trackPt, idx, v) => {
                if (idx === 0) { return; }
                const latlng1 = new LatLng(v[idx].lat, v[idx].lng);
                const latlng2 = new LatLng(v[idx-1].lat, v[idx-1].lng);
                akku += latlng1.distanceTo(latlng2)
            }
        );

        return akku / 1000;
    }

}

