import Prefabs from "./prefabs";

class StaticEnemy extends Prefabs {
    constructor(stateGame, position, properties) {
        const game = stateGame.game;

        super(stateGame, position, properties);

        game.physics.enable(this, Phaser.Physics.ARCADE, true);

        const {width=64, height=64, offsetX=0, offsetY=0} = properties;

        this.body.allowGravity = false;
        // this.body.setSize(width, height, offsetX, offsetY);
        this.body.setCircle(32);
        this.body.immovable = true;
        this.anchor.setTo(0.5, 0.5);

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
