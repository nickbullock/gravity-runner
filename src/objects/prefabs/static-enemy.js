import Prefabs from "./prefabs";

class StaticEnemy extends Prefabs {
    constructor(stateGame, position, properties) {
        const game = stateGame.game;

        super(stateGame, position, properties);

        game.physics.enable(this, Phaser.Physics.ARCADE, true);

        this.body.allowGravity = false;
        this.body.immovable = true;

        if(this.animations
            && this.animations._frameData
            && this.animations._frameData._frames
            && this.animations._frameData._frames.length > 0){

            this.animations.add('idle', this.animations._frameData._frames.map((frame) => frame.index), 12, true);
            this.animations.play('idle');
        }

        this.anchor.setTo(0.5);

        return this;
    }
}

export default StaticEnemy;
