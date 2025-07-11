import * as Matter from 'matter-js';
import { LabelScore } from "./LabelScore";
import { App } from '../system/App';
import { Background } from "./Background";
import { Scene } from '../system/Scene';
import { Hero } from "./Hero";
import { Platforms } from "./Platforms";
import { DifficultyIncrementer } from "./DifficultyIncrementer";

export class GameScene extends Scene {
    constructor() {
        super();
        console.log("edmond :: game scnee constr");
    }

    create() {
        this.createDifficultyIncrementer()
        this.createBackground();
        this.createHero();
        this.createPlatforms();
        this.setEvents();
        //[13]
        this.createUI();
        //[/13]
    }
    //[13]
    createUI() {
        this.labelScore = new LabelScore();
        this.container.addChild(this.labelScore);
        
        this.hero.walkAnimation.on("score", () => {
            
        console.log(`edmond :: score emit call`);
            this.labelScore.renderScore(this.hero.score);
        });
    }
    //[13]

    setEvents() {
        this.onCollisionStart = this.onCollisionStart.bind(this);
        Matter.Events.on(App.physics, 'collisionStart', this.onCollisionStart);
    }

    onCollisionStart(event) {
        const colliders = [event.pairs[0].bodyA, event.pairs[0].bodyB];
        const hero = colliders.find(body => body.gameHero);
        const platform = colliders.find(body => body.gamePlatform);

        if (hero && platform) {
            this.hero.stayOnPlatform(platform.gamePlatform);
        }

        const diamond = colliders.find(body => body.gameDiamond);

        if (hero && diamond) {
            this.hero.collectDiamond(diamond.gameDiamond);
        }
    }

    createHero() {
        this.hero = new Hero();
        this.container.addChild(this.hero.airDashAnimation);
        this.container.addChild(this.hero.jumpAnimation);
        this.container.addChild(this.hero.landAnimation);
        this.container.addChild(this.hero.walkAnimation);
        //this.container.addChild(this.hero.sprite);

        this.container.interactive = true;
        this.container.on("pointerdown", () => {
            this.hero.startJump();
        });

        // [14]
        this.hero.walkAnimation.once("die", () => {
            App.scenes.start("Game");
        });
        // [/14]
    }

    createBackground() {
        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }

    createPlatforms() {
        this.platfroms = new Platforms();
        this.container.addChild(this.platfroms.container);
    }

    createDifficultyIncrementer()
    {
        this.difficultyIncrementer = new DifficultyIncrementer()
    }

    update(dt) {
        this.difficultyIncrementer.update(dt);
        this.bg.update(dt, this.difficultyIncrementer.getAdditionalBgSpeed());
        this.platfroms.update(dt, this.difficultyIncrementer.getAdditionalPlatformSpeed());
    }

    destroy() {
        super.destroy();
        Matter.Events.off(App.physics, 'collisionStart', this.onCollisionStart);
        App.app.ticker.remove(this.update, this);
        this.bg.destroy();
        this.hero.walkAnimation.removeAllListeners("score");
        this.hero.destroy();
        this.hero = null;
        this.platfroms.destroy();
        this.labelScore.destroy();
    }
}