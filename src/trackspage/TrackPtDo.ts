import {LatLng} from "leaflet";


export class TrackPtDo {
    public static fromLatLng(latlng: LatLng): TrackPtDo {
        return new TrackPtDo(latlng.lat, latlng.lng, latlng.alt === undefined ? 0 : latlng.alt)
    }

    public lat: number;
    public lng: number;
    public ele: number;

    constructor(lat: number, lng: number, ele: number) {
        this.lat = lat;
        this.lng = lng;
        this.ele = ele;
    }

    public toLatLng(): LatLng {
        return new LatLng(this.lat, this.lng, this.ele);
    }
}
