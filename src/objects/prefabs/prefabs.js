/**
 * Created by Oleg Rusak on 02.04.2017.
 *
 * Class common prefabs object
 */

/* global Phaser*/

class Prefabs extends Phaser.Sprite {
    constructor (stateGame, position, properties) {
        const game = stateGame.game;

        super(game, position.x, position.y, properties.texture);

        this.stateGame = stateGame;
        this.stateGame.groups[properties.group].add(this);

        console.log(this.stateGame.groups[properties.group])
        console.log(this.stateGame.groups[properties.group].children)
    }
}

export default Prefabs;
