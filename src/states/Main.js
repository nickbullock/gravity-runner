import Map from './../objects/map/map';
import Player from './../objects/player/player';

/* global Phaser*/

let cursors;
let player;
let jumpButton;
let map;
let layer;
let jumpTimer = 0;

/**
 * @class Main
 */
class Main extends Phaser.State {

    init (mapKey) {
        this.mapKey = mapKey;
    }

    create () {
        const game = this.game;

        game.time.advancedTiming = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = "#e3e3e3";
        game.physics.arcade.gravity.y = 200;

        //  init level and player
        map = new Map(game, this.mapKey);
        player = new Player(game, map.playerStartPositions.x, map.playerStartPositions.y, 'dude');

        game.camera.follow(player);

        //  init controls
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        jumpButton.onDown.add(player.jump, player);
        game.input.onTap.add(player.jump, player);
    }

    update () {
        const game = this.game;
        
        // maybe bad for perfomance?
        // map.layersFull.forEach((layer) => {
        //     game.physics.arcade.collide(player, layer, player.collisionCallback, null, player);
        // });
        game.physics.arcade.collide(player, map.layersFull[0], player.collisionCallback, null, player);
      
    }

    render () {
        const game = this.game;

        // game.debug.text(game.time.physicsElapsed, 32, 32);
        game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
        // game.debug.body(player);
        // game.debug.bodyInfo(player, 16, 24);
    }
}

export default Main;
