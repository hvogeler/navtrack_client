import * as React from 'react';
import {LayerGroup, Map, Rectangle} from "react-leaflet";
import {TileLayer} from "react-leaflet";
import {Polyline} from "react-leaflet";
import {Constants} from "../Constants";
import {ITrackDetailProps} from "./TrackDetailController";

const markerRectSize = 0.0001;
const TILESERVER = process.env.REACT_APP_TILESERVER;

export class TrackMap extends React.Component<ITrackDetailProps, any> {

    constructor(props: ITrackDetailProps) {
        super(props);
    }

    public render() {
//        const trackPts = this.trackPtsFromGpx(this.props.trackData.gpx)
        const trackPts = this.props.trackPts;
        if (trackPts.length <= 0) {
            return ""
        }

/*
        const mapStyle = {
            hight: "600px",
            width: `800px`,
        };
*/

        const lastTrackPt = trackPts[trackPts.length - 1];
        return (
                <Map id="viewMapSmall" center={[trackPts[0].lat, trackPts[0].lng]} zoom={Constants.INITIAL_ZOOM_LEVEL}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url={TILESERVER === undefined ? "" : TILESERVER}
                    />
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
                </Map>
        );
    }

}

