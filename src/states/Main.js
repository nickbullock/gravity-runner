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

    preload () {
        this.game.load.tilemap(
            'myLevel',
            `/assets/maps/${this.mapKey}.json`,
            null,
            Phaser.Tilemap.TILED_JSON);
    }

    create () {
        const game = this.game;

        game.time.advancedTiming = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 200;

        //  init level and player
        // map = new Map(game, this.mapKey);
        // layer = map.layersFull[0];

        map = game.add.tilemap("myLevel");

        map.addTilesetImage('grass');

        map.setCollisionBetween(15, 17);
        map.setCollisionBetween(43, 45);

        layer = map.createLayer('Layer1');

        layer.resizeWorld();

        // player = new Player(game, map.playerStartPositions.x, map.playerStartPositions.y, 'dude');
        player = new Player(game, 10, 10, 'dude');

        if(this.game.device.cocoonJS){
            player.scale.setTo(4, 4);
            player.body.velocity.x = 600;
        }

        game.camera.follow(player);

        //  init controls
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        jumpButton.onDown.add(player.jump, player);
        game.input.onTap.add(player.jump, player);
    }

    update () {
        const game = this.game;

        game.physics.arcade.collide(player, layer, player.collisionCallback, null, player);
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
