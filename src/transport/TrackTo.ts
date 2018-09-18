import {CountryTo} from "./CountryTo";
import {TrackTypeTo} from "./TrackTypeTo";
import {UserTo} from "./UserTo";

export class TrackTo {
    public id: number;
    public trackname: string;
    public description: string;
    public country: CountryTo | null;
    public region: string;
    public owner: UserTo | null;
    public created: string;
    public gpx: string;
    public tracktypes: TrackTypeTo[] = [];
}
