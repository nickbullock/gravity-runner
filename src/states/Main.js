import Player from './../objects/player/player';

/* global Phaser*/

let cursors;
let player;
let jumpButton;
let gravityButton;
let attackButton;
let map;
let layer;
let jumpTimer = 0;

/**
 * @class Main
 */
class Main extends Phaser.State {
    /**
     *
     * @param idLevel - относительный путь от /assets/maps с / без расширения. Поддерживаем пока только
     * JSON config tiles map
     */
    init (idLevel) {
        this.idLevel = idLevel;
    }

    preload () {
        this.game.load.tilemap(
            'myLevel',
            `/assets/maps${this.idLevel}.json`,
            null,
            Phaser.Tilemap.TILED_JSON);
    }

    create () {
        const game = this.game;

        game.time.advancedTiming = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);

        map = game.add.tilemap("myLevel");

        map.addTilesetImage('grass');

        map.setCollisionBetween(15, 17);
        map.setCollisionBetween(43, 45);

        layer = map.createLayer('Layer1');

        layer.resizeWorld();

        //  object
        //  start position
        const groupStart = game.add.group();
        map.createFromObjects('Object1', 1, 'start_position', 0, true, false, groupStart);

        const spriteStartPosition = groupStart.children[0];

        player = new Player(game, 0, 0, 'player');
        player.alignIn(spriteStartPosition, Phaser.BOTTOM_LEFT);

        // if(this.game.device.cocoonJS){
        //     player.scale.setTo(4, 4);
        //     player.body.velocity.x = 600;
        // }

        game.camera.follow(player);

        //  init controls
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        gravityButton = game.input.keyboard.addKey(Phaser.Keyboard.C);
        attackButton = game.input.keyboard.addKey(Phaser.Keyboard.V);

        jumpButton.onDown.add(player.jump, player);
        gravityButton.onDown.add(player.changeGravity, player);
        attackButton.onDown.add(player.attack, player);

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
        game.debug.body(player);
        game.debug.bodyInfo(player, 16, 24);
    }
}

export default Main;
