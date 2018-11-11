import {observable} from "mobx";
import {MenuItem} from "./MainMenu";
import {CountryTo} from "./transport/CountryTo";
import {Roles} from "./transport/RoleTo";
import {TrackTypeTo} from "./transport/TrackTypeTo";
import {UserTo} from "./transport/UserTo";

export enum LocalStorageKeys {
    navure_jwt = 'navure.jwt',
    navure_user = 'navure.user'
}

export class UiStore {
    @observable public user: string | null;
    @observable public password: string | null;
    @observable public userDo: UserTo | null;
    @observable public isLoggedIn: boolean = false;
    @observable public secToken: string | null;
    @observable public countries: CountryTo[] = [];
    @observable public tracktypes: TrackTypeTo[] = [];
    @observable public currentMenuItem: MenuItem = MenuItem.tracks;
    @observable public searchText: string | null = null;
    @observable public isMapViewMaximized: boolean = false;

    public isLoggedInWithRole(role: Roles) : boolean {
            if (this.isLoggedIn) {
                if (this.userDo != null) {
                    if (this.userDo!.roles.find(it => it.rolename === role)) {
                        return true;
                    }
                }
            }
        return false;
    }

    public setUserStore(user: string | null, userDo: UserTo, secToken: string) {
        this.user = user;
        this.userDo = userDo;
        this.secToken = secToken;
        this.isLoggedIn = true;
        localStorage.setItem(LocalStorageKeys.navure_jwt, this.secToken)
        localStorage.setItem(LocalStorageKeys.navure_user, JSON.stringify(userDo))
    }

    public clearUserStore() {
        this.user = null;
        this.password = null;
        this.isLoggedIn = false;
        this.secToken = null;
        this.userDo = null;
        localStorage.removeItem(LocalStorageKeys.navure_jwt);
        localStorage.removeItem(LocalStorageKeys.navure_user);
    }

}