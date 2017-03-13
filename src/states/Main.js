import Map from './../objects/map/map';

/* global Phaser*/

let cursors;
let player;
let jumpButton;
let layer;
let jumpTimer = 0;

/**
 * @class Main
 */
class Main extends Phaser.State {

    create () {
        const game = this.game;

        game.time.advancedTiming = true;

        game.physics.startSystem(Phaser.Physics.ARCADE);

        // bg = game.add.tileSprite(0, 0, 800, 600, 'background');
        // bg.fixedToCamera = true;
        game.stage.backgroundColor = "#fff";

        //  load level
        const map = new Map("myLevel", game);
        layer = map.layersFull[0];

        game.physics.arcade.gravity.y = 200;

        //  todo: position first title
        //  todo: player as class object
        player = game.add.sprite(map.playerStartPositions.x, map.playerStartPositions.y, 'dude');

        game.physics.enable(player, Phaser.Physics.ARCADE);

        player.body.collideWorldBounds = true;
        player.body.setSize(25, 50, 25, 0);
        player.body.gravity.y = 500;

        player.scale.setTo(2, 2);
        player.animations.add('running', [0,1,2,3,4,5], 12, true);
        // player.animations.add(
        //     'running',
        //     Phaser.Animation.generateFrameNames('Run__00', 1, 9, ".png"),
        //     15,
        //     true);
        // player.animations.add(
        //     'jumping',
        //     Phaser.Animation.generateFrameNames('Jump__00', 1, 9, ".png"),
        //     5,
        //     false);
        // player.animations.add(
        //     'dying',
        //     Phaser.Animation.generateFrameNames('Dead__00', 1, 9, ".png"),
        //     5,
        //     false);

        player.animations.play('running');
        player.body.velocity.x = 250;

        game.camera.follow(player);

        //  controls
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        jumpButton.onDown.add(this.jump.bind(this, player), this);
        game.input.onTap.add(this.jump.bind(this, player), this);

        this.jumpCount = 0;
        this.isPlayerDead = false;
        this.isJump = false;
    }

    update () {
        const game = this.game;

        game.physics.arcade.collide(player, layer, function () {
            //  todo: вынести в класс player
            if (!this.isPlayerDead) {
                player.body.velocity.x = 150;

                if (player.body.onFloor()) {
                    this.jumpCount = 0;
                    this.isJump = false;
                    player.animations.play('running');
                }

                // if (player.body.blocked.right && !this.isJump) {
                //     this.isPlayerDead = true;
                //
                //     player.animations.play('dying', 5, false);
                //     player.body.velocity.x = 0;
                // }
            }
        }, null, this);

    }

    render () {
        const game = this.game;

        // game.debug.text(game.time.physicsElapsed, 32, 32);
        game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
        // game.debug.body(player);
        // game.debug.bodyInfo(player, 16, 24);
    }

    jump (player) {
        if (player.body.onFloor() && this.jumpCount === 0) {
            this.isJump = true;
            player.animations.play('jumping');

            player.body.velocity.y = -520;

            jumpTimer = this.game.time.now + 750;

            this.jumpCount++;
        } else {
            if (this.game.time.now > jumpTimer && this.jumpCount === 1) {
                this.isJump = true;
                player.animations.play('jumping');

                player.body.velocity.y = -250;

                jumpTimer = this.game.time.now + 750;

                this.jumpCount++;
            }
        }
    }
}

export default Main;
