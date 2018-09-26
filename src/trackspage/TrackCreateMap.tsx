import {LatLng, LeafletMouseEvent} from "leaflet";
import {action} from "mobx";
import {observer} from "mobx-react";
// import * as L from "leaflet";
import * as React from 'react';
import {LayerGroup, Map, Marker, Polyline, Popup, Rectangle, TileLayer} from "react-leaflet";
import {fetchJson} from "../backend/Backend";
import {IMapCenter} from "./TrackCreateMain";
import {TrackPtDo} from "./TrackPtDo";

// const tileserverOSMStandard = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
// const tileserverThunderforestLandscape = "http://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=26282baad33249a2993f500028d75b5b";
// const tileserverThunderforestOutdoors = "http://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=26282baad33249a2993f500028d75b5b";

const TILESERVER = process.env.REACT_APP_TILESERVER;
const markerRectSize = 0.0001;

interface ITrackCreateMap {
    mapCenter: IMapCenter;
    zoom: number;
    addTrackPt: (trackPt: TrackPtDo) => void;
    trackPts: TrackPtDo[];
    trackLengthInKm: number;
}

interface IGetElevationResponse {
    lat : number,
    lng : number,
    ele : number
}

@observer
export class TrackCreateMap extends React.Component<ITrackCreateMap, any> {
    private map: any;

    constructor(props: ITrackCreateMap) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);
    }


    public render() {
        const trackPts = this.props.trackPts;
        const lastTrackPt = trackPts[trackPts.length - 1];
        console.log(`Tracklength = ${this.props.trackLengthInKm}`)
        let trackLayer: any;
        if (trackPts.length > 0) {
            trackLayer = (
                <LayerGroup>
                    <Polyline positions={
                        trackPts.map((trackPt) => {
                            return trackPt
                        })}
                              color={"#6b1fde"}
                    />
                    <Rectangle
                        bounds={[[trackPts[0].lat - markerRectSize, trackPts[0].lng - markerRectSize], [trackPts[0].lat + markerRectSize, trackPts[0].lng + markerRectSize]]}
                        color={"#00cc00"}
                        fill={true}
                        fillcolor={"#00cc00"}
                        fillopacity={0.9}
                    />
                    <Rectangle
                        bounds={[[lastTrackPt.lat - markerRectSize, lastTrackPt.lng - markerRectSize], [lastTrackPt.lat + markerRectSize, lastTrackPt.lng + markerRectSize]]}
                        color={"#ffff00"}
                        fill={true}
                        fillcolor={"#ffff00"}
                        fillopacity={0.9}
                    />
                </LayerGroup>

            )
        }


        return (
            <div>
                <Map id="viewMap" center={this.props.mapCenter.location} zoom={this.props.zoom}
                     onClick={this.onClickHandler} ref={(ref => this.map = ref)}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url={TILESERVER === undefined ? "" : TILESERVER}
                    />
                    <Marker position={[this.props.mapCenter.location.lat, this.props.mapCenter.location.lng]}
                            color="yellow" radius={12}>
                        <Popup>{this.props.mapCenter.label}</Popup>
                    </Marker>
                    {trackLayer}
                </Map>
            </div>
        );
    }

    @action
    private onClickHandler(event: LeafletMouseEvent) {
        console.log(event.latlng);
        let locationWithElevation: LatLng;
        fetchJson(`/api/trackutil/elevation?lat=${event.latlng.lat}&lon=${event.latlng.lng}`).then((resp : IGetElevationResponse) => {
            locationWithElevation = new LatLng(resp.lat, resp.lng, resp.ele);
            console.log(`Elevation of: ${locationWithElevation.lat} / ${locationWithElevation.lng} = ${locationWithElevation.alt}`);
            this.props.addTrackPt(new TrackPtDo(resp.lat, resp.lng, resp.ele));
        });
//            .catch(ex => console.log(`Error on Elevation api ${ex}`));

    }
}

