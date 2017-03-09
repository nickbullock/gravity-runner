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

        game.physics.startSystem(Phaser.Physics.ARCADE);

        // bg = game.add.tileSprite(0, 0, 800, 600, 'background');
        // bg.fixedToCamera = true;
        game.stage.backgroundColor = "#fff";

        //  load level
        const map = game.add.tilemap('map');

        map.addTilesetImage('level-spring');

        map.setCollisionBetween(1, 4);
        map.setCollisionBetween(81, 92);
        map.setCollisionBetween(169, 176);
        map.setCollisionBetween(9, 12);
        map.setCollisionBetween(253, 256);

        layer = map.createLayer('Layer1');

        layer.resizeWorld();

        game.physics.arcade.gravity.y = 250;

        //  todo: position first title
        //  todo: player as class object
        player = game.add.sprite(10, 50, 'player');

        game.physics.enable(player, Phaser.Physics.ARCADE);

        player.body.bounce.y = 0.2;
        player.body.collideWorldBounds = true;
        player.body.setSize(100, 125, 0, 0);

        player.scale.setTo(1, 1);
        player.animations.add(
            'runing',
            Phaser.Animation.generateFrameNames('Run__00', 1, 9, ".png"),
            15,
            true);
        player.animations.add(
            'jumping',
            Phaser.Animation.generateFrameNames('Jump__00', 1, 9, ".png"),
            5,
            false);
        player.animations.add(
            'dying',
            Phaser.Animation.generateFrameNames('Dead__00', 1, 9, ".png"),
            5,
            false);

        player.animations.play('runing');
        player.body.velocity.x = 250;

        game.camera.follow(player);

        //  controls
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        jumpButton.onDown.add(function () {
            this.jump(player)

        }, this);

        this.jumpCount = 0;
        this.isPlayerDead = false;
        this.isJump = false;
    }

    update () {
        const game = this.game;

        game.physics.arcade.collide(player, layer, function () {
            //  todo: вынести в класс player
            if (!this.isPlayerDead) {
                player.body.velocity.x = 250;

                if (player.body.onFloor()) {
                    this.jumpCount = 0;
                    this.isJump = false;
                    player.animations.play('runing');
                }

                if (player.body.blocked.right && !this.isJump) {
                    this.isPlayerDead = true;

                    player.animations.play('dying', 5, false);
                    player.body.velocity.x = 0;
                }
            }
        }, null, this);
    }

    render () {
        const game = this.game;

        game.debug.text(game.time.physicsElapsed, 32, 32);
        game.debug.body(player);
        game.debug.bodyInfo(player, 16, 24);
    }

    jump (player) {
        if (player.body.onFloor() && this.jumpCount === 0) {
            this.isJump = true;
            player.animations.play('jumping');

            player.body.velocity.y = -250;

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
