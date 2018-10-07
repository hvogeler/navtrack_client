import * as elasticsearch from 'elasticsearch';
import {LatLng} from "leaflet";
import {action, computed, observable} from "mobx";
import {observer} from "mobx-react";
import * as React from 'react';
import {RouteComponentProps} from "react-router";
import {globalRootStore} from "../App";
import {fetchJson} from "../backend/Backend";
import teaserimg from '../images/IMG_0107.jpg'
import {MainMenu, MenuItem} from "../MainMenu";
import {RootStore} from "../RootStore";
// import {PageTitle} from "../PageTitle";
import {Teaser} from "../Teaser";
import {TrackTo} from "../transport/TrackTo";
import {AdditionalTrackInfo} from "./AdditionalTrackInfo";
import {TrackDetailController} from "./TrackDetailController";
import {TrackList} from "./TrackList";
import {TrackMetadata} from "./TrackMetadata";
import {TrackPtDo} from "./TrackPtDo";


interface ITracksMain extends RouteComponentProps<any> {
    rootStore: RootStore;
}

interface IElasticTrackHit {
    trackid: number;
    trackname: string;
    owner: string;
    description: string;
}

@observer
export class TrackMain extends React.Component<ITracksMain, any> {

    @computed
    private get currentTrack(): TrackTo {
        return this.trackListData[this.findIndexForTrackListid(this.currentTrackListId)]
    }

    @computed
    private get trackPtsFromGpx(): TrackPtDo[] {
        if (this.currentTrack === undefined) {
            return []
        }
        return (TrackMain.trackPtsFromGpxUtil(this.currentTrack.gpx));
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

    public static trackMetadataFromGpxUtil(gpxdoc: string): TrackMetadata {
        const trackMetadata = new TrackMetadata();
        const doc = (new DOMParser()).parseFromString(gpxdoc, 'text/xml');
        const metadataElement = doc.querySelector("metadata");
        if (metadataElement === null) {
            throw new Error("Track Metadata missing. Is this really a gpx file?");
        } else {
            const trackname = metadataElement.querySelector("name");
            if (trackname !== null) {
                trackMetadata.trackname = trackname.innerHTML;
            } else {
                trackMetadata.trackname = null;
            }
        }
        return trackMetadata;
    }

    public static trackPtsFromGpxUtil(gpxdoc: string): TrackPtDo[] {
        const doc = (new DOMParser()).parseFromString(gpxdoc, 'text/xml');
        const elements = TrackMain.nodeListtoArray(doc.querySelectorAll("trkpt"));
        return elements.map((element) => {
                const children = TrackMain.nodeListtoArray(element.querySelectorAll("ele"));
                const ele: number = children.length === 1 ? +children[0].innerHTML : 0;
                const trackpt = new TrackPtDo(+(element.getAttribute("lat") || 0),
                    +(element.getAttribute("lon") || 0),
                    ele);

                return trackpt;
            }
        );
    }

    private static nodeListtoArray(nodeList: NodeListOf<Element>): Element[] {
        const elements: Element[] = [];
        let i: number;
        for (i = 0; i < nodeList.length; i++) {
            // console.log(`${i}. (${nodeList.item(i).getAttribute("lat")}, ${nodeList.item(i).getAttribute("lon")}`)
            elements.push(nodeList.item(i))
        }
        return elements
    }

    @observable public currentTrackListId: number = 1;
    @observable private trackListData: TrackTo[] = [];
    @observable private trackListPageSize = +(process.env.REACT_APP_ELASTIC_PAGESIZE || "10");

    constructor(props: ITracksMain) {
        super(props);
        this.setCurrentTrack = this.setCurrentTrack.bind(this);
        this.refreshTrackListData = this.refreshTrackListData.bind(this);
        this.prepareTrackListPage = this.prepareTrackListPage.bind(this);
        this.setTrackListPageSize = this.setTrackListPageSize.bind(this);
    }

    public componentWillMount() {
        this.refreshTrackListData();
    }

    public componentDidMount() {
        this.refreshTrackListData();
        globalRootStore.uiStore.currentMenuItem = MenuItem.tracks;
    }

    public render() {
        if (this.trackListData.length <= 0) {
            return (
                <div>
                    <MainMenu rootStore={this.props.rootStore!} refreshTrackList={this.refreshTrackListData}/>
                    <Teaser image={teaserimg} title={"Tracks"}/>
                </div>
            )
        }
        else {
            const trackPts = this.trackPtsFromGpx;
            return (
                <div>
                    <MainMenu rootStore={this.props.rootStore!} refreshTrackList={this.refreshTrackListData}/>
                    <div className="row">
                        <Teaser image={teaserimg} title={"Tracks"}/>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <TrackList currentTrackListId={this.currentTrackListId}
                                       setCurrentTrackListId={this.setCurrentTrack}
                                       tracks={this.trackListData}
                                       getPage={this.prepareTrackListPage}
                                       pageSizeInLines={this.trackListPageSize}
                                       numberOfPages={this.trackListNumberOfPages}
                                       setPageSize={this.setTrackListPageSize}
                            />
                        </div>
                        <div className="row">
                            <TrackDetailController
                                trackData={this.currentTrack}
                                trackPts={trackPts}
                                additionalTrackInfo={this.additionalTrackInfo}
                            />
                        </div>
                    </div>
                </div>
            );
        }
    }

    private prepareTrackListPage(pageNumber: number): TrackTo[] {
        const pageStart = pageNumber * this.trackListPageSize;
        const pageEnd = pageStart + this.trackListPageSize;
        return this.trackListData.slice(pageStart, pageEnd);
    }

    @action
    private refreshTrackListData() {
        // if logged in prefer users own tracks
        // if search text is given, use it for a fulltext elastic search
        if (globalRootStore.uiStore.searchText !== null) {
            this.trackListData = [];
            const query = {
                "_source": {
                    "includes": ["trackid", "trackname", "owner", "description"]
                },
                "query": {
                    "bool": {
                        "must": [],
                        "should": [
                            {"match": {"trackname": globalRootStore.uiStore.searchText}},
                            {"match": {"description": globalRootStore.uiStore.searchText}},
                            {"match": {"region": globalRootStore.uiStore.searchText}},
                            {"match": {"owner": (globalRootStore.uiStore.userDo !== null ? globalRootStore.uiStore.userDo.username + " " : "") + globalRootStore.uiStore.searchText}},
                            {"match": {"owneremail": globalRootStore.uiStore.searchText}},
                            {"match": {"tracktypes": globalRootStore.uiStore.searchText}},
                            {"match": {"country": globalRootStore.uiStore.searchText}}
                        ],
                    }
                },
            };
            const ELASTIC_URL = process.env.REACT_APP_ELASTIC_URL;
            const es = new elasticsearch.Client({
                host: ELASTIC_URL,
                log: 'trace'
            });
            es.search({
                body: query,
                index: 'tracks',
                size: +(process.env.REACT_APP_ELASTIC_MAX_RESULT_SIZE || "200"),
            }).then((resp) => {
                const hits = resp.hits.hits;
                hits.filter((hit) => hit._score > 0.0).forEach((hit) => {
                    const trackHit: IElasticTrackHit = hit._source as IElasticTrackHit;
                    console.log(`Elastic found id: ${trackHit.trackid}, trackname: ${trackHit.trackname}`);
                    fetchJson(`/api/tracks/${trackHit.trackid}`)
                        .then((track: TrackTo) => {
                            this.trackListData.push(track);
                            this.currentTrackListId = this.trackListData.length > 0 ? this.trackListData[0].id : 0;
                        });

                });
            }, (err) => {
                console.trace(err.message);
                throw new Error(err.message);
            });
            globalRootStore.uiStore.searchText = null;
        } else {
            fetchJson("/api/tracks")
                .then((tracks: TrackTo[]) => {
                    this.trackListData = tracks;
                    this.currentTrackListId = tracks[0].id
                });
        }


        // const client = new ApolloClient({
        //     request : async operation => {
        //         operation.setContext({
        //             headers: {
        //                 authorization: "Basic aHZvOmh2bw==",
        //                 "mode": "no-cors"
        //             }
        //         })
        //     },
        //     uri : "http://192.168.178.21:8080/graphql"
        // });

        // client.query<AllTracksQ1>({
        //     query: gql`
        //         query AllTracksQ1 {
        //             allTracks {
        //                 trackname
        //                 region
        //                 tracktypes {
        //                     tracktypename
        //                 }
        //             }
        //         }
        //     `
        //     }
        // ).then( (result) => {
        //     const res = result.data.allTracks!.map( (value) => {
        //         return value != null ? value.region : "";
        //     });
        //     console.log(`===>> ${res}`);
        // });
    }

    private findIndexForTrackListid(id: number): number {
        const idx = this.trackListData.findIndex((value) =>
            value.id === id
        );
        return idx >= 0 ? idx : 0
    }

    @action
    private setTrackListPageSize(lines: number) {
        this.trackListPageSize = lines;
    }

    @action
    private setCurrentTrack(id: number) {
        this.currentTrackListId = id;
    }

    @computed
    private get trackListNumberOfPages(): number {
        return Math.ceil(this.trackListData.length / this.trackListPageSize);
    }

}

