import {UiStore} from "./UiStore";

export class RootStore {
    public uiStore: UiStore;

    constructor() {
        this.uiStore = new UiStore();
    }
}
