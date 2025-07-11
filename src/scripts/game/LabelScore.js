import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class LabelScore extends PIXI.Text {


    static idnum = 0;

    constructor() {
        super();
        this.x = App.config.score.x;
        this.y = App.config.score.y;
        this.anchor.set(App.config.score.anchor);
        this.style = App.config.score.style;

        this.id = ++LabelScore.idnum;

        this.renderScore();
    }

    renderScore(score = 0) {
        
        console.log(`edmond :: update score UI ${score} id: ${this.id}`);
        this.text = `Score: ${score}`;
    }
}