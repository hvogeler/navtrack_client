import {LatLng, LeafletMouseEvent} from "leaflet";
import {action} from "mobx";
import {observer} from "mobx-react";
// import * as L from "leaflet";
import * as React from 'react';
import {Circle, LayerGroup, Map, Marker, Polyline, Popup, TileLayer} from "react-leaflet";
import {fetchJson} from "../backend/Backend";
import {Constants} from "../Constants";
import {IMapCenter} from "./TrackCreateMain";
import {TrackPtDo} from "./TrackPtDo";

// const tileserverOSMStandard = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
// const tileserverThunderforestLandscape = "http://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=26282baad33249a2993f500028d75b5b";
// const tileserverThunderforestOutdoors = "http://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=26282baad33249a2993f500028d75b5b";

const TILESERVER = process.env.REACT_APP_TILESERVER;
const markerCircleSize = 40;

interface ITrackCreateMap {
    mapCenter: IMapCenter;
    addTrackPt: (trackPt: TrackPtDo) => void;
    trackPts: TrackPtDo[];
    trackLengthInKm: number;
    selectedTrackPtIdx: number;
    setSelectedTrackPt: (idx: number) => void;
}

interface IGetElevationResponse {
    lat: number,
    lng: number,
    ele: number
}

@observer
export class TrackCreateMap extends React.Component<ITrackCreateMap, any> {
    private static clickedOnCircle: boolean = false;
    private static colorGreen = "#00ff7f";
    private static colorYellow = "#ffff01";
    private static colorRed = "#ff2d41";
    private static colorBlue = "#00f8ff";
    private map: any;

    constructor(props: ITrackCreateMap) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.clickOnTrackPtCircle = this.clickOnTrackPtCircle.bind(this);
    }


    public render() {
        const trackPts = this.props.trackPts;
        const {...mapCenter} = this.props.mapCenter;

        let trackLayer: any;
        let trackPtCircles: any;
        if (trackPts.length > 0) {
            mapCenter.location = trackPts[0].toLatLng();
            mapCenter.label = null;
            trackPtCircles = (
                trackPts.map((pt, idx) => {
                    const isFirstTrackPt = idx === 0;
                    const isLastTrackPt = idx === (trackPts.length - 1);
                    const isSelectedTrackPt = this.props.selectedTrackPtIdx === idx;
                    let circle = (<Circle key={idx} center={pt.toLatLng()} radius={markerCircleSize} opacity={0.8}
                                          fill={true} fillOpacity={0.7} fillColor={TrackCreateMap.colorBlue}
                                          color={TrackCreateMap.colorBlue} onClick={this.clickOnTrackPtCircle} idx={idx}/>);
                    if (isFirstTrackPt) {
                        circle = (<Circle key={idx} center={pt.toLatLng()} radius={markerCircleSize} opacity={0.8}
                                          fill={true} fillOpacity={0.7} fillColor={TrackCreateMap.colorGreen}
                                          color={TrackCreateMap.colorGreen} onClick={this.clickOnTrackPtCircle} idx={idx}/>);
                    }
                    if (isLastTrackPt) {
                        circle = (<Circle key={idx} center={pt.toLatLng()} radius={markerCircleSize} opacity={0.8}
                                          fill={true} fillOpacity={0.7} fillColor={TrackCreateMap.colorYellow}
                                          color={TrackCreateMap.colorYellow} onClick={this.clickOnTrackPtCircle} idx={idx}/>);
                    }
                    if (isSelectedTrackPt) {
                        circle = (<Circle key={idx} center={pt.toLatLng()} radius={markerCircleSize} opacity={0.8}
                                          fill={true} fillOpacity={0.7} fillColor={TrackCreateMap.colorRed}
                                          color={TrackCreateMap.colorRed} onClick={this.clickOnTrackPtCircle} idx={idx}/>);
                    }
                    return circle;

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
        const circleClickedidx = event.target.options.idx;
        console.log(`Circle clicked on trackPt: ${circleClickedidx}`);
        if (this.props.selectedTrackPtIdx === circleClickedidx) {
            this.props.setSelectedTrackPt(-1);
        } else {
            this.props.setSelectedTrackPt(circleClickedidx);
        }
    }

    private actOnClick(resp: IGetElevationResponse) {
        this.props.addTrackPt(new TrackPtDo(resp.lat, resp.lng, resp.ele));

    }

}

