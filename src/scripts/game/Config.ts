import { Tools } from "../system/Tools";
import { GameScene } from "./GameScene";
import { RequireEntry } from "../system/Tools";
import { Scene } from '../system/Scene';

export class ConfigData {

    loader:RequireEntry[];
    bgSpeed:number;
    score:ScoreData;
    diamonds:DiamondData;
    platforms:PlatformData;
    hero:HeroData;
    scenes:any;
    //scenes:SceneMap;
    //scenes:Map<String, typeof Scene>; //edmond :: what is this type?

    constructor() {
        this.loader = [];
        this.bgSpeed = 0;
        this.score = new ScoreData();
        this.diamonds = new DiamondData();
        this.platforms = new PlatformData();
        this.hero = new HeroData();
        this.scenes = {"test": GameScene};
    }
}

export class ScoreData {
    x:number;
    y:number;
    anchor:number;
    style:StyleData;

    constructor() {
        this.x = 0;
        this.y = 0;
        this.anchor = 0;
        this.style = new StyleData();
    }
}

export class StyleData {
    fontFamily:String;
    fontWeight:String;
    fontSize:number;
    fill:String[];

    constructor() {
        this.fontFamily = "";
        this.fontWeight = "";
        this.fontSize = 0;
        this.fill = [];
    }
}

export class DiamondData {
    chance:number;
    offset:MinMaxData;

    constructor() {
        this.chance = 0;
        this.offset = new MinMaxData();
    }
}

export class MinMaxData {
    min:number;
    max:number;

    constructor() {
        this.min = 0;
        this.max = 0;
    }
}

export class PlatformData {
    moveSpeed:number;
    ranges:RangeData;

    constructor() {
        this.moveSpeed = 0;
        this.ranges = new RangeData();
    }
}

export class RangeData {
    rows:MinMaxData;
    cols:MinMaxData;
    offset:MinMaxData;

    constructor() {
        this.rows = new MinMaxData();
        this.cols = new MinMaxData();
        this.offset = new MinMaxData();
    }
}

export class HeroData {
    jumpSpeed:number;
    maxJumps:number;
    position:PositionData;
    constructor() {
        this.jumpSpeed = 0;
        this.maxJumps = 0;
        this.position = new PositionData();
    }
}

export class PositionData {
    x:number;
    y:number;

    constructor() {
        this.x = 0;
        this.y = 0;
    }
}

interface SceneMap {
   [key: string]: typeof GameScene;
}

export const Config:ConfigData = {
    loader: Tools.massiveRequire(require.context('./../../sprites/', true, /\.(mp3|png|jpe?g)$/)),
    bgSpeed: 2,
    score: {
        x: 10,
        y: 10,
        anchor: 0,
        style: {
            fontFamily: "Verdana",
            fontWeight: "bold",
            fontSize: 44,
            fill: ["#FF7F50"]
        }
    },
    diamonds: {
        chance: 0.4,
        offset: {
            min: 100,
            max: 200
        }
    },
    platforms: {
        moveSpeed: -1.5,
        ranges: {
            rows: {
                min: 2,
                max: 6
            },
            cols: {
                min: 3,
                max: 9
            },
            offset: {
                min: 60,
                max: 200
            }
        }
    },
    hero: {
        jumpSpeed: 15,
        maxJumps: 2,
        position: {
            x: 350,
            y: 595
        }
    },
    scenes: {
        "Game": GameScene
    }
};