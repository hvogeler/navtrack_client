import {observable} from "mobx";
import {UserDo} from "./dataObjects/UserDo";

export class UiStore {
    @observable public user: string | null;
    @observable public password: string | null;
    @observable public userDo: UserDo | null;
    @observable public isLoggedIn: boolean = false;
    @observable public secToken: string | null;
    @observable public countries: string[] = [];
    @observable public tracktypes: string[] = [];
}