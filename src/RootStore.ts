import {UiStore} from "./UiStore";

export class RootStore {
    public uiStore: UiStore;

    constructor(uiStore: UiStore) {
        this.uiStore = uiStore;
    }
}

export const rootStore = new RootStore(new UiStore());
console.log("+++ rootStore created");