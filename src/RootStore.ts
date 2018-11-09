import {UiStore} from "./UiStore";

export class RootStore {
    public version = "0.1.2";
    public versionYear = "2018";
    public uiStore: UiStore;

    constructor() {
        this.uiStore = new UiStore();
    }
}
