import * as Matter from 'matter-js';
import { App } from '../system/App';
import { TweenMax } from 'gsap';

export class Diamond {
    constructor(x, y) {
        this.createSprite(x, y);
        App.app.ticker.add(this.update, this);
        this.flyingAway = false;
    }

    createSprite(x, y) {
        this.sprite = App.sprite("diamond");
        this.sprite.anchor.set(0.5);
        this.sprite.x = x;
        this.sprite.y = y;
    }

    update() {
        if (this.sprite) {
            Matter.Body.setPosition(this.body, {x: this.sprite.width / 2 + this.sprite.x + this.sprite.parent.x, y: this.sprite.height / 2 + this.sprite.y + this.sprite.parent.y});
        }
    }

    createBody() {
        this.body = Matter.Bodies.rectangle(this.sprite.width / 2 + this.sprite.x + this.sprite.parent.x, this.sprite.height / 2 + this.sprite.y + this.sprite.parent.y, this.sprite.width, this.sprite.height, {friction: 0, isStatic: true, render: { fillStyle: '#060a19' }});
        this.body.isSensor = true;
        this.body.gameDiamond = this;
        Matter.World.add(App.physics.world, this.body);
    }

    flyAway() {
        if(!this.flyingAway)
        {
            this.flyingAway = true;
            TweenMax.to(this.sprite, 1, {
                x: this.sprite.x,
                y: this.sprite.y - 30,
                alpha: 0.5,
                onUpdate: () => {
                    this.sprite.rotation += 0.1;
                },
                onComplete: () => {
                    this.destroy();
                }
            });
        }
    }

    // [14]
    destroy() {
        if (this.sprite) {
            App.app.ticker.remove(this.update, this);
            Matter.World.remove(App.physics.world, this.body);
            this.sprite.destroy();
            this.sprite = null;
        }
    }
}