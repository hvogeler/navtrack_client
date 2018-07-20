import {TrackTypeDo} from "./TrackTypeDo";

export class TrackDo {
    public id: number;
    public trackname: string;
    public description: string;
    public country: string;
    public region: string;
    public ownerid: string;
    public created: string;
    public gpx: string;
    public tracktypes: TrackTypeDo[] = [];
}
