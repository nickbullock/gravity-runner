class Player extends Phaser.Sprite {
    constructor(game, x, y, sprite) {
        super(game, x, y, sprite);

        this.gravity = 1000;
        this.velocityJumpY = -500;
        this.gravityLow = false;

        game.physics.enable(this, Phaser.Physics.ARCADE, true);

        this.body.collideWorldBounds = true;
        this.body.setSize(64, 64, 0, 0);
        this.body.gravity.y = this.gravity;

        this.animations.add('run', [0,1,2,3,4,5,6], 12, true);

        this.animations.add('attack', [7,8,9,10,11,12,13,14,15,16,17,18,19], 12, true)
            .onComplete.add(() => {
                this.animations.play('run');
            });

        this.animations.add('changeGravitySecond', [24,25,26,27], 12, true)
            .onComplete.add(() => {
                this.animations.play('run');
            });

        this.animations.add('changeGravityFirst', [20,21,22,23], 12, true)
            .onComplete.add(() => {
                this.scale.y = -this.scale.y;
                this.animations.play('changeGravitySecond', null, false);
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

        if (this.checkGround()) {
            this.isJump = true;
            // this.animations.play('jumping');

            this.body.velocity.y = this.velocityJumpY;

            this.jumpTimer = this.game.time.now + 750;
        }
    }
    
    attack() {
        this.animations.play('attack', null, false);
    }

    changeGravity() {
        this.gravityLow = !this.gravityLow;
        this.gravity = -this.gravity;
        this.velocityJumpY = -this.velocityJumpY;
        this.body.gravity.y = this.gravity;
        this.animations.play('changeGravityFirst', null, false);
    }
    
    checkGround () {
        
        return this.gravityLow ? this.body.onCeiling() : this.body.onFloor();
    }

    collisionCallback () {
        if(this.checkGround()){
            this.body.velocity.x = 550;
        }
    }
}

export default Player;
