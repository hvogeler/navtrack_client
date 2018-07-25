declare module 'leaflet-geosearch' {

    interface IGeoSearchResult
    {
        x: number;                      // lon,
        y: number;                      // lat,
        label: string;                  // formatted address
        bounds: [
            [number, number],             // s, w - lat, lon
            [number, number]             // n, e - lat, lon
            ];
        raw: any;                        // raw provider result
    }

    class OpenStreetMapProvider {
        public search(query: {query: string}): Promise<IGeoSearchResult[]>
    }
}
