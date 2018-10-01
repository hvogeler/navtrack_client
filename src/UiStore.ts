import {observable} from "mobx";
import {MenuItem} from "./MainMenu";
import {CountryTo} from "./transport/CountryTo";
import {Roles} from "./transport/RoleTo";
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
    @observable public currentMenuItem: MenuItem = MenuItem.tracks;
    @observable public searchText: string | null = null;

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

}