import * as React from 'react';
import {Map} from "react-leaflet";
import {TileLayer} from "react-leaflet";
import {ITrackDetailProps} from "./TrackDetailController";


export class TrackMap extends React.Component<ITrackDetailProps, any> {
    constructor(props: ITrackDetailProps) {
        super(props)
    }

    public render() {
        return (
            <div className="border border-light rounded">
                <Map id="viewMap" center={[51.505, -0.09]} zoom={5}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </Map>
            </div>
        );
    }
}

