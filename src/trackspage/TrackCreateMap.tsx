import * as React from 'react';
import {CircleMarker, Map, Popup, TileLayer} from "react-leaflet";
import {IMapCenter} from "./TracksCreateMain";

// const tileserverOSMStandard = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
// const tileserverThunderforestLandscape = "http://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=26282baad33249a2993f500028d75b5b";
// const tileserverThunderforestOutdoors = "http://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=26282baad33249a2993f500028d75b5b";

const TILESERVER = process.env.REACT_APP_TILESERVER;

interface ITrackCreateMap {
    mapCenter: IMapCenter;
    zoom: number;
}

export class TrackCreateMap extends React.Component<ITrackCreateMap, any> {

    constructor(props: ITrackCreateMap) {
        super(props);
    }

    public render() {

        return (
            <div className="border border-light rounded">
                <Map id="viewMap" center={this.props.mapCenter.location} zoom={this.props.zoom}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url={TILESERVER === undefined ? "" : TILESERVER}
                    />
                    <CircleMarker center={[this.props.mapCenter.location.lat, this.props.mapCenter.location.lng]} color="yellow" radius={12}>
                        <Popup>{this.props.mapCenter.label}</Popup>
                    </CircleMarker>
                 </Map>
            </div>
        );
    }
}

