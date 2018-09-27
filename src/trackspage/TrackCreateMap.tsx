import {LatLng, LeafletMouseEvent} from "leaflet";
import {action, observable} from "mobx";
import {observer} from "mobx-react";
// import * as L from "leaflet";
import * as React from 'react';
import {Circle, LayerGroup, Map, Marker, Polyline, Popup, Rectangle, TileLayer} from "react-leaflet";
import {fetchJson} from "../backend/Backend";
import {Constants} from "../Constants";
import {IMapCenter} from "./TrackCreateMain";
import {TrackPtDo} from "./TrackPtDo";

// const tileserverOSMStandard = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
// const tileserverThunderforestLandscape = "http://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=26282baad33249a2993f500028d75b5b";
// const tileserverThunderforestOutdoors = "http://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=26282baad33249a2993f500028d75b5b";

const TILESERVER = process.env.REACT_APP_TILESERVER;
const markerRectSize = 0.0001;
const markerCircleSize = 40;

interface ITrackCreateMap {
    mapCenter: IMapCenter;
    addTrackPt: (trackPt: TrackPtDo) => void;
    trackPts: TrackPtDo[];
    trackLengthInKm: number;
}

interface IGetElevationResponse {
    lat: number,
    lng: number,
    ele: number
}

@observer
export class TrackCreateMap extends React.Component<ITrackCreateMap, any> {
    private static clickedOnCircle: boolean = false;
    private map: any;

    @observable private selectedTrackPtIdx: number = -1;

    constructor(props: ITrackCreateMap) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);
    }


    public render() {
        const trackPts = this.props.trackPts;
        const lastTrackPt = trackPts[trackPts.length - 1];
        const {...mapCenter} = this.props.mapCenter;

        let trackLayer: any;
        let trackPtCircles: any;
        if (trackPts.length > 0) {
            mapCenter.location = trackPts[0].toLatLng();
            mapCenter.label = null;

            trackPtCircles = (
                trackPts.map( (pt, idx) => {
                    return (<Circle key={idx} center={pt.toLatLng()} radius={markerCircleSize} color={this.selectedTrackPtIdx === idx ? "#c82333" : "#00ff7f"} onClick={this.clickOnTrackPtCircle} idx={idx}/>);
                })
            );

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
                    {trackPtCircles}
                </LayerGroup>

            )

        }

        let marker: any;
        if (mapCenter.label !== null) {
            marker = (
                <Marker position={mapCenter.location}
                        color="yellow" radius={12}>
                    <Popup>{this.props.mapCenter.label}</Popup>
                </Marker>
            )
        }

        return (
            <div>
                <Map id="viewMap" center={mapCenter.location} zoom={Constants.INITIAL_ZOOM_LEVEL}
                     onClick={this.onClickHandler} ref={(ref => this.map = ref)}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url={TILESERVER === undefined ? "" : TILESERVER}
                    />
                    {marker}
                    {trackLayer}
                </Map>
            </div>
        );
    }

    @action
    private onClickHandler(event: LeafletMouseEvent) {
        if (TrackCreateMap.clickedOnCircle) {
            TrackCreateMap.clickedOnCircle = false;
            return;
        }

        let locationWithElevation: LatLng;
        fetchJson(`/api/trackutil/elevation?lat=${event.latlng.lat}&lon=${event.latlng.lng}`).then((resp: IGetElevationResponse) => {
            locationWithElevation = new LatLng(resp.lat, resp.lng, resp.ele);
            console.log(`Elevation of: ${locationWithElevation.lat} / ${locationWithElevation.lng} = ${locationWithElevation.alt}`);
            this.actOnClick(resp);
        });
    }

    @action
    private clickOnTrackPtCircle(event: LeafletMouseEvent) {
        TrackCreateMap.clickedOnCircle = true;
        console.log(`Circle clicked on trackPt: ${event.target.options.idx}`);
        if (this.selectedTrackPtIdx === event.target.options.idx) {
            this.selectedTrackPtIdx = -1;
        } else {
            this.selectedTrackPtIdx = 2;
        }
    }

    private actOnClick(resp: IGetElevationResponse) {
        this.props.addTrackPt(new TrackPtDo(resp.lat, resp.lng, resp.ele));

    }

}

