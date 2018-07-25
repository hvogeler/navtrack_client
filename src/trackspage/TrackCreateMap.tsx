import {LeafletMouseEvent} from "leaflet";
// import * as L from "leaflet";
import * as React from 'react';
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
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
    private map: any;

    constructor(props: ITrackCreateMap) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);
    }


    public render() {
        return (
            <div className="border border-light rounded">
                <Map id="viewMap" center={this.props.mapCenter.location} zoom={this.props.zoom} onClick={this.onClickHandler} ref={(ref => this.map = ref)}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        url={TILESERVER === undefined ? "" : TILESERVER}
                    />
                    <Marker position={[this.props.mapCenter.location.lat, this.props.mapCenter.location.lng]} color="yellow" radius={12}>
                        <Popup>{this.props.mapCenter.label}</Popup>
                    </Marker>
                 </Map>
            </div>
        );
    }

    private onClickHandler(event: LeafletMouseEvent) {
        console.log(event.latlng)
    }
}

