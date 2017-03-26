class Player extends Phaser.Sprite {
    constructor(game, x, y, sprite) {
        super(game, x, y, sprite);

        this.gravity = 1000;
        this.velocityJumpY = -500;
        this.gravityLow = false;

        game.physics.enable(this, Phaser.Physics.ARCADE, true);

        this.body.collideWorldBounds = true;
        // this.body.setSize(25, 50, 25, 0);
        this.body.gravity.y = this.gravity;

        this.animations.add('run', [0,1,2,3,4,5,6], 12, true);

        this.animations.add('attack', [7,8,9,10,11,12,13,14,15,16,17,18,19], 12, true)
            .onComplete.add(() => {
                this.animations.play('run');
            });

        this.animations.add('changeGravity', [20,21,22,23,24,25,26,27], 12, true)
            .onComplete.add(() => {
                this.animations.play('run');
            });
        
        this.animations.play('run');

        this.body.velocity.x = 550;
        this.anchor.setTo(0.5, 0.5);

        this.jumpCount = 0;
        this.jumpTimer = 0;
        this.isPlayerDead = false;
        this.isJump = false;

        game.add.existing(this);

        return this;
    }

    jump(pointer, doubleTap) {
        if(doubleTap){
            this.changeGravity();
            
            return;
        }

        if (this.checkGround() && this.jumpCount === 0) {
            this.isJump = true;
            // this.animations.play('jumping');

            this.body.velocity.y = this.velocityJumpY;

            this.jumpTimer = this.game.time.now + 750;

            this.jumpCount++;
        }
    }
    
    attack() {
        this.animations.play('attack', null, false);
    }

    changeGravity() {
        const MIDDLE_OF_ANIMATION_TIMEOUT = 300;

        this.gravityLow = !this.gravityLow;
        this.gravity = -this.gravity;
        this.velocityJumpY = -this.velocityJumpY;
        this.body.gravity.y = this.gravity;
        this.animations.play('changeGravity', null, false);

        // осторожно костылидзе
        setTimeout(() => {this.scale.y = -this.scale.y}, MIDDLE_OF_ANIMATION_TIMEOUT);
    }
    
    checkGround () {
        
        return this.gravityLow ? this.body.onCeiling() : this.body.onFloor();
    }
}

export default Player;
