/* global _, Phaser */

import Prefabs from "./prefabs";

class Coin extends Prefabs {
    constructor(stateGame, position, properties) {
        const game = stateGame.game;

        super(stateGame, position, properties);

        game.physics.enable(this, Phaser.Physics.ARCADE, true);

        const {width=32, height=32, offsetX=0, offsetY=0} = properties;
        const {score=10} = properties;

        this.score = score;

        this.body.allowGravity = false;
        this.body.setSize(width, height, offsetX, offsetY);
        this.body.immovable = true;

        const listAnimationIndex = _.get(this, "animations._frameData._frames");

        if(Array.isArray(listAnimationIndex)){
            const {frames=12} = properties;

            this.animations
                .add('idle', listAnimationIndex.map((frame) => frame.index), frames, true)
                .play();
        }

        this.anchor.setTo(0.5);

        return this;
    }

    update () {
        this.stateGame.game.physics.arcade.overlap(this, this.stateGame.groups.players, this.getCoin, null, this);
    }

    getCoin (coin, player) {
        // kill coin and increase score
        coin.kill();

        player.score += coin.score;
    }
}

export default Coin;
