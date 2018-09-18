import {observable} from "mobx";
import {CountryTo} from "./transport/CountryTo";
import {TrackTypeTo} from "./transport/TrackTypeTo";
import {UserTo} from "./transport/UserTo";

export class UiStore {
    @observable public user: string | null;
    @observable public password: string | null;
    @observable public userDo: UserTo | null;
    @observable public isLoggedIn: boolean = false;
    @observable public secToken: string | null;
    @observable public countries: CountryTo[] = [];
    @observable public tracktypes: TrackTypeTo[] = [];
}