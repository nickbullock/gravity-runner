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
        game.physics.arcade.gravity.y = 200;

        map = game.add.tilemap("myLevel");

        map.addTilesetImage('grass');

        map.setCollisionBetween(15, 17);
        map.setCollisionBetween(43, 45);

        layer = map.createLayer('Layer1');

        layer.resizeWorld();

        //  object
        //  start position
        var objects = map.objects["Object1"].filter(item => item.name === "start_position")[0];

        // const spriteStart = game.cache.getImage('start', true);

        // player = new Player(game, map.playerStartPositions.x, map.playerStartPositions.y, 'dude');
        player = new Player(game, objects.x, objects.y, 'player');

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

        game.physics.arcade.collide(player, layer, null, null, player);
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
