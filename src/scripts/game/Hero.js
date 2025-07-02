import * as Matter from 'matter-js';
import * as PIXI from "pixi.js";
import { App } from '../system/App';

export class Hero {
    constructor() {
        this.createSprite();
        this.createBody();
        App.app.ticker.add(this.update, this);

        this.dx = App.config.hero.airDashSpeed;
        this.dy = App.config.hero.jumpSpeed;
        this.rightEdgeBounceSpeed = App.config.hero.rightEdgeBounceSpeed;
        this.maxJumps = App.config.hero.maxJumps;
        this.jumpIndex = 0;
        this.score = 0;
    }

    collectDiamond(diamond) {
        //if(!diamond.flyingAway)
        {
            ++this.score;
            //[13]
            this.walkAnimation.emit("score");
            //[/13]
            diamond.flyAway();
        }
    }
    //[/12]

    startJump() {
        if (this.platform) {
            ++this.jumpIndex;
            this.platform = null;
            Matter.Body.setVelocity(this.body, { x: 0, y: -this.dy });
            this.switchAnimation(this.jumpAnimation);
        }
        else if (this.jumpIndex === 1) {
            ++this.jumpIndex;
            this.platform = null;
            Matter.Body.setVelocity(this.body, { x: this.dx, y: 0 });
            this.switchAnimation(this.airDashAnimation);
        }
    }

    // [08]
    stayOnPlatform(platform) {
        this.platform = platform;
        this.jumpIndex = 0;
        this.switchAnimation(this.walkAnimation);
    }
    // [/08]

    createBody() {
        this.body = Matter.Bodies.rectangle(this.sprite.x + this.sprite.width / 2, this.sprite.y + this.sprite.height / 2, this.sprite.width, this.sprite.height, {friction: 0});
        Matter.World.add(App.physics.world, this.body);
        this.body.gameHero = this;
    }

    update() {
        this.sprite.x = this.body.position.x - this.sprite.width / 2;
        this.sprite.y = this.body.position.y - this.sprite.height / 2;

        if (this.sprite.x > window.innerWidth) {
            Matter.Body.setVelocity(this.body, { x: -this.rightEdgeBounceSpeed, y: -this.dy });
            this.switchAnimation(this.jumpAnimation);
            this.jumpIndex = 1;
        }

        // [14]
        if (this.sprite.y > window.innerHeight) {
            this.walkAnimation.emit("die");
        }
        // [/14]
    }

    switchAnimation(animation)
    {
        this.sprite.stop();
        this.sprite.visible = false;
        this.sprite = animation;
        this.sprite.x = this.body.position.x - this.sprite.width / 2;
        this.sprite.y = this.body.position.y - this.sprite.height / 2;
        this.sprite.play();
        this.sprite.visible = true;

    }

    createSprite() {
        if(this.walkAnimation == null)
        {
            this.walkAnimation = new PIXI.AnimatedSprite([
                App.res("walk1"),
                App.res("walk2")
            ]);
            this.walkAnimation.x = App.config.hero.position.x;
            this.walkAnimation.y = App.config.hero.position.y;
            this.walkAnimation.loop = true;
            this.walkAnimation.animationSpeed = 0.1;
            this.walkAnimation.visible = true;
        }

        if(this.jumpAnimation == null)
        {
            this.jumpAnimation = new PIXI.AnimatedSprite([
                App.res("jump")
            ]);
            this.jumpAnimation.x = App.config.hero.position.x;
            this.jumpAnimation.y = App.config.hero.position.y;
            this.jumpAnimation.loop = true;
            this.jumpAnimation.animationSpeed = 0.1;
            this.jumpAnimation.visible = false;
        }

        if(this.landAnimation == null)
        {
            this.landAnimation = new PIXI.AnimatedSprite([
                App.res("hero")
            ]);
            this.landAnimation.x = App.config.hero.position.x;
            this.landAnimation.y = App.config.hero.position.y;
            this.landAnimation.loop = true;
            this.landAnimation.animationSpeed = 0.1;
            this.landAnimation.visible = false;
        }

        if(this.airDashAnimation == null)
        {
            this.airDashAnimation = new PIXI.AnimatedSprite([
                App.res("fly1"),
                App.res("fly2")
            ]);
            this.airDashAnimation.x = App.config.hero.position.x;
            this.airDashAnimation.y = App.config.hero.position.y;
            this.airDashAnimation.loop = true;
            this.airDashAnimation.animationSpeed = 0.1;
            this.airDashAnimation.visible = false;
        }

        this.sprite = this.walkAnimation;
        this.sprite.play();
    }

    destroy() {
        App.app.ticker.remove(this.update, this);
        Matter.World.add(App.physics.world, this.body);
    }
}