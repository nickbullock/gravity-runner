class Player extends Phaser.Sprite {
    constructor(game, x, y, sprite) {
        super(game, x, y, sprite);

        this.gravity = 1000;
        this.velocityJumpY = -500;
        this.gravityLow = false;

        game.physics.enable(this, Phaser.Physics.ARCADE);

        this.body.collideWorldBounds = true;
        this.body.setSize(25, 50, 25, 0);
        this.body.gravity.y = this.gravity;
        this.scale.setTo(2, 2);
        this.anchor.setTo(0,1);

        this.animations.add('running', [0,1,2,3,4,5], 12, true);
        this.animations.play('running');
        this.body.velocity.x = 350;

        this.jumpCount = 0;
        this.jumpTimer = 0;
        this.isPlayerDead = false;
        this.isJump = false;
        
        // this.animations.add(
        //     'running',
        //     Phaser.Animation.generateFrameNames('Run__00', 1, 9, ".png"),
        //     15,
        //     true);
        // this.animations.add(
        //     'jumping',
        //     Phaser.Animation.generateFrameNames('Jump__00', 1, 9, ".png"),
        //     5,
        //     false);
        // this.animations.add(
        //     'dying',
        //     Phaser.Animation.generateFrameNames('Dead__00', 1, 9, ".png"),
        //     5,
        //     false);


        game.add.existing(this);

        return this;
    }

    jump() {
        if (this.checkGround() && this.jumpCount === 0) {
            this.isJump = true;
            this.animations.play('jumping');

            this.body.velocity.y = this.velocityJumpY;

            this.jumpTimer = this.game.time.now + 750;

            this.jumpCount++;
        } else {
            if (this.game.time.now > this.jumpTimer && this.jumpCount === 1) {
                this.animations.play('jumping');

                this.isJump = true;
                // this.body.velocity.y = -250;

                if (this.gravityLow) {
                    this.anchor.setTo(0.5, 1);
                    this.scale.y = -2;
                    this.scale.y = 2;
                } else {
                    this.anchor.setTo(0.5, 1);
                    this.scale.y = 2;
                    this.scale.y = -2;
                }
                this.gravityLow = !this.gravityLow;
                this.gravity = -this.gravity;
                this.velocityJumpY = -this.velocityJumpY;

                this.body.gravity.y = this.gravity;
                this.jumpTimer = this.game.time.now + 750;
                this.jumpCount++;
            }
        }
    }
    
    collisionCallback() {
        if (!this.isPlayerDead) {
            this.body.velocity.x = 150;

            if (this.checkGround()) {
                this.jumpCount = 0;
                this.isJump = false;
                this.animations.play('running');
            }

            // if (player.body.blocked.right && !this.isJump) {
            //     this.isPlayerDead = true;
            //
            //     player.animations.play('dying', 5, false);
            //     player.body.velocity.x = 0;
            // }
        }
    }
    
    checkGround () {
        
        return this.gravityLow ? this.body.onCeiling() : this.body.onFloor();
    }
}

export default Player;
