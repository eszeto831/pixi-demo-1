import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class Background {

    speed:number;
    container:PIXI.Container;
    sprites:PIXI.Sprite[];

    constructor() {
        this.speed = App.config.bgSpeed;
        this.container = new PIXI.Container();
        this.sprites = [];

        this.createSprites();
    }

    createSprites() {
        //this.sprites = PIXI.Sprite[];

        const sprite = App.sprite("bg");
        console.log("edmond :: hello world");
        console.log("edmond :: sprites width: "+sprite.width);
        console.log("edmond :: screen width: "+App.app.screen.width);
        let spritesrequied:number = (App.app.screen.width / sprite.width) + 1;
        console.log("edmond :: sprites required: "+spritesrequied);
        for (let i = 0; i < spritesrequied; i++) {
            this.createSprite(i);
        }
    }

    createSprite(i:number) {
        const sprite = App.sprite("bg");

        sprite.x = sprite.width * i;
        sprite.y = 0;
        this.container.addChild(sprite);
        this.sprites.push(sprite);
    }

    move(sprite:PIXI.Sprite, offset:number) {
        const spriteRightX = sprite.x + sprite.width;

        const screenLeftX  = 0;

        if (spriteRightX <= screenLeftX) {
            sprite.x += sprite.width * this.sprites.length;
        }
        
        sprite.x -= offset;
    }

    update(dt:number) {
        const offset = this.speed * dt;

        this.sprites.forEach(sprite => {
            this.move(sprite, offset);
        });
    }

    destroy() {
        this.container.destroy();
    }
}