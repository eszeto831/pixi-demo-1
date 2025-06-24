import * as PIXI from "pixi.js";
import { ConfigData } from "../game/Config";

export class Loader {
    loader:PIXI.Loader;
    config:ConfigData;
    resources:PIXI.utils.Dict<PIXI.LoaderResource>;

    constructor(loader:PIXI.Loader, config:ConfigData) {
        this.loader = loader;
        this.config = config;
        this.resources = {};
    }

    preload() {
        for (const asset of this.config.loader) {
            let key = asset.key.substr(asset.key.lastIndexOf('/') + 1);
            key = key.substring(0, key.indexOf('.'));
            if (asset.key.indexOf(".png") !== -1 || asset.key.indexOf(".jpg") !== -1) {
                this.loader.add(key, asset.req(key).default)
            }
        }

        return new Promise(resolve => {
            this.loader.load((loader, resources) => {
                this.resources = resources;
                resolve("Data successfully fetched!");
            });
        });
    }
}