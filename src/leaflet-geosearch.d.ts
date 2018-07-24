declare module 'leaflet-geosearch' {
    import {LatLng} from "leaflet";

    class OpenStreetMapProvider {
        public search(query: {query: string}): Promise<LatLng>
    }
}
