import {CountryDo} from "./CountryDo";
import {TrackTypeDo} from "./TrackTypeDo";
import {UserDo} from "./UserDo";

export class TrackDo {
    public id: number;
    public trackname: string;
    public description: string;
    public country: CountryDo | null;
    public region: string;
    public owner: UserDo | null;
    public created: string;
    public gpx: string;
    public tracktypes: TrackTypeDo[] = [];
}
