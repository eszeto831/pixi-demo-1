import { App } from '../system/App';

export class DifficultyIncrementer {
    constructor() {
        this.incrementTime = App.config.difficultyIncrementer.incrementTime;
        this.platformSpeedIncrement = App.config.difficultyIncrementer.platformSpeedIncrement;
        this.bgSpeedIncrement = App.config.difficultyIncrementer.bgSpeedIncrement;
        this.totalTime = 0;
        this.platformSpeedAddition = 0;
        this.bgSpeedAddition = 0;
    }

    update(dt) {
        this.totalTime += dt;
        let diff = Math.floor(this.totalTime / this.incrementTime);
        console.log("edmond :: total "+this.totalTime+" diff "+diff);
        this.platformSpeedAddition = diff * this.platformSpeedIncrement;
        this.bgSpeedAddition = diff * this.bgSpeedIncrement;
    }

    getAdditionalPlatformSpeed()
    {
        return this.platformSpeedAddition;
    }

    getAdditionalBgSpeed()
    {
        return this.bgSpeedAddition;
    }
}