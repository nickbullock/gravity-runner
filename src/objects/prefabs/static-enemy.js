import Prefabs from "./prefabs";

class StaticEnemy extends Prefabs {
    constructor(stateGame, position, properties) {
        const game = stateGame.game;

        super(stateGame, position, properties);

        game.physics.enable(this, Phaser.Physics.ARCADE, true);

        this.body.allowGravity = false;
        this.body.setSize(64, 64, 0, 0);

        this.anchor.setTo(0.5);

        return this;
    }
}

export default StaticEnemy;
