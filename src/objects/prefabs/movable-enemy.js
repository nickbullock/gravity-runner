import Prefabs from "./prefabs";

class MovableEnemy extends Prefabs {
    constructor(stateGame, position, properties) {
        const game = stateGame.game;

        super(stateGame, position, properties);

        game.physics.enable(this, Phaser.Physics.ARCADE, true);

        this.body.immovable = true;
        this.direction = properties.direction;
        this.distance = properties.distance;
        this.speed = properties.speed;
        this.previousX = this.x;
        this.body.velocity.x = this.direction * this.speed;

        this.anchor.setTo(0.5);

        if(this.animations
            && this.animations._frameData
            && this.animations._frameData._frames
            && this.animations._frameData._frames.length > 0){

            this.animations.add('idle', this.animations._frameData._frames.map((frame) => frame.index), 12, true);
            this.animations.play('idle');
        }

        return this;
    }

    update() {
        this.stateGame.game.physics.arcade.collide(this, this.stateGame.layers.LayerCollision);

        if (Math.abs(this.x - this.previousX) === this.distance) {
            this.body.velocity.x = -this.body.velocity.x;
            this.previousX = this.x;
            this.scale.x = -this.scale.x;
        }
    }
}

export default MovableEnemy;
