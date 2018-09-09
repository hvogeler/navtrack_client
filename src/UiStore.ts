import {observable} from "mobx";

export class UiStore {
    @observable public user: string | null;
    @observable public password: string | null;
    @observable public isLoggedIn: boolean = false;
    @observable public secToken: string | null;
}