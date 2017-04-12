/* global Phaser*/

import Prefabs from "./prefabs";

let cursors;
let jumpButton;
let gravityButton;
let attackButton;

class Player extends Prefabs {
    constructor(stateGame, position, properties) {
        const game = stateGame.game;

        super(stateGame, position, properties);

        this.gravity = 1500;
        this.velocityJumpY = -800;
        this.gravityLow = false;

        game.physics.enable(this, Phaser.Physics.ARCADE, true);

        this.body.collideWorldBounds = true;
        this.body.setSize(30, 52, 21, 5);
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

        this.velocityBase = 450;
        this.body.velocity.x = this.velocityBase;

        this.countAcceleration = 0;
        this.totalAcceleration = 450;
        this.cooldownAcceleration = 5000;
        this.velocityAcceleration = this.plot();
        this.countVelocityAccelerationChank = this.velocityAcceleration.length - 1;

        this.anchor.setTo(0.5, 0.5);

        this.jumpCount = 0;
        this.jumpTimer = 0;
        this.isPlayerDead = false;
        this.isJump = false;
        this.gravityChangeTimer = 0;

        this.score = 0;

        game.camera.follow(this);

        //  init controls
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        gravityButton = game.input.keyboard.addKey(Phaser.Keyboard.C);
        attackButton = game.input.keyboard.addKey(Phaser.Keyboard.V);
        this.accelerationButton = game.input.keyboard.addKey(Phaser.Keyboard.B);

        jumpButton.onDown.add(this.jump, this);
        gravityButton.onDown.add(this.changeGravity, this);
        attackButton.onDown.add(this.attack, this);
        this.accelerationButton.onDown.add(this.accelerationPlayer, this);

        game.input.onTap.add(this.jump, this);

        return this;
    }

    update () {
        this.stateGame.game.physics.arcade.collide(this, this.stateGame.layers.LayerCollision, this.collisionCallback, null, this);
        this.stateGame.game.physics.arcade.collide(this, this.stateGame.groups.static_enemy, this.hitEnemy, null, this);
        this.stateGame.game.physics.arcade.collide(this, this.stateGame.groups.movable_enemy, this.hitEnemy, null, this);
        this.stateGame.game.physics.arcade.collide(this.bloodEmitter, this.stateGame.layers.LayerCollision, this.bloodCollision, null, this);

        this.changeVelocity()
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
        const game = this.game;

        if(game.time.now > this.gravityChangeTimer){
            this.gravityLow = !this.gravityLow;
            this.gravity = -this.gravity;
            this.velocityJumpY = -this.velocityJumpY;
            this.body.gravity.y = this.gravity;
            this.animations.play('changeGravityFirst', null, false);
            this.gravityChangeTimer = game.time.now + 700;
        }
    }
    
    checkGround () {
        
        return this.gravityLow ? this.body.onCeiling() : this.body.onFloor();
    }

    collisionCallback () {
        if(this.checkGround()){
            this.body.velocity.x = this.velocityBase;
        }
    }

    hitEnemy (player, enemy) {
        player.damage(1);

        this.bloodEmitter = this.game.add.emitter(player.x, player.y - 10, 80);

        this.bloodEmitter.makeParticles('blood');
        this.bloodEmitter.gravity = 500;
        this.bloodEmitter.minParticleScale = 1;
        this.bloodEmitter.maxParticleScale = 2;
        this.bloodEmitter.setXSpeed(150, 400);
        this.bloodEmitter.start(true, 2000, null, 80);

        enemy.tint = 0x990000;

        // this.stateGame.restartLevel();
    }

    bloodCollision (particle, layer) {
        particle.body.velocity.x = 0;
    }

    accelerationPlayer () {
        //  Не запускаем, если уже включена
        if (this.isAcceleration) {
            return null;
        }

        this.isAcceleration = true;
        this.isRiseAcceleration = true;

        // activate the cooldown animation
        const pie = this.stateGame.prefabs.icon_acceleration;

        pie.progress = 0;

        const tween = this.stateGame.game.add.tween(pie)
            .to({progress: 1}, this.cooldownAcceleration, Phaser.Easing.Quadratic.InOut, true, 0);
        tween.onComplete.add(() => {
            this.isAcceleration = false;
        });
    }

    changeVelocity () {
        if (!this.isAcceleration) {
            return null;
        }

        if (this.isRiseAcceleration) {
            if(this.countAcceleration < (this.countVelocityAccelerationChank)) {
                const velosity = this.velocityBase + this.velocityAcceleration[this.countAcceleration++];

                this.body.velocity.x = velosity;
            } else {
                this.isRiseAcceleration = false;
            }
        } else {
            if(this.countAcceleration > 0) {
                const velosity = this.velocityBase + this.velocityAcceleration[this.countAcceleration--];

                this.body.velocity.x = velosity;
            } else {
                this.body.velocity.x = this.velocityBase;
            }
        }
    }

    /**
     * Расчет значений увеличения скорости при ускорении
     *
     * @return {Array}
     */
    plot () {
        const stepVelocityAcceleration = 1/25;
        const velocityGrowAcceleration = [50, 150, 300, 380, 420, 440, 450];
        const velocityAcceleration = [];

        const math = this.stateGame.game.math;

        for (let i = 0; i <= 1; i += stepVelocityAcceleration){
            const velocity = ~~math.linearInterpolation(velocityGrowAcceleration, i);

            velocityAcceleration.push(velocity);
        }

        return velocityAcceleration;
    }
}

export default Player;
