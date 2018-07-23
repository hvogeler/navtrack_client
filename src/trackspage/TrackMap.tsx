import * as React from 'react';
import {LayerGroup, Map, Rectangle} from "react-leaflet";
import {TileLayer} from "react-leaflet";
import {Polyline} from "react-leaflet";
import {ITrackDetailProps} from "./TrackDetailController";

// const tileserverOSMStandard = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tileserverThunderforestLandscape = "http://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=26282baad33249a2993f500028d75b5b";
// const tileserverThunderforestOutdoors = "http://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=26282baad33249a2993f500028d75b5b";
const markerRectSize = 0.0001

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

        const lastTrackPt = trackPts[trackPts.length - 1];
        return (
            <div className="border border-light rounded">
                <Map id="viewMap" center={[trackPts[0].lat, trackPts[0].lng]} zoom={14}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url={tileserverThunderforestLandscape}
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
            </div>
        );
    }
    //
    // private trackPtsFromGpx(gpx: string): TrackPtDo[] {
    //     const xxx = (new DOMParser()).parseFromString(this.props.trackData.gpx, 'text/xml');
    //     const elements = this.nodeListtoArray(xxx.querySelectorAll("trkpt"));
    //     return elements.map((element) => {
    //         return {
    //             ele: 0,
    //             lat: +(element.getAttribute("lat") || 0),
    //             lng: +(element.getAttribute("lon") || 0),
    //         }
    //     })
    //
    // }
    //
    // private nodeListtoArray(nodeList: NodeListOf<Element>): Element[] {
    //     const elements: Element[] = [];
    //     let i: number;
    //     for (i = 0; i < nodeList.length; i++) {
    //         console.log(`${i}. (${nodeList.item(i).getAttribute("lat")}, ${nodeList.item(i).getAttribute("lon")}`)
    //         elements.push(nodeList.item(i))
    //     }
    //     return elements
    // }
}

