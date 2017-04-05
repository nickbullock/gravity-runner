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
        this.body.setSize(30, 64, 21, 0);
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

        this.body.velocity.x = 450;
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

        jumpButton.onDown.add(this.jump, this);
        gravityButton.onDown.add(this.changeGravity, this);
        attackButton.onDown.add(this.attack, this);

        game.input.onTap.add(this.jump, this);

        return this;
    }

    update () {
        this.stateGame.game.physics.arcade.collide(this, this.stateGame.layers.LayerCollision, this.collisionCallback, null, this);
        this.stateGame.game.physics.arcade.collide(this, this.stateGame.groups.static_enemy, this.hitEnemy, null, this);
        this.stateGame.game.physics.arcade.collide(this, this.stateGame.groups.movable_enemy, this.hitEnemy, null, this);
        this.stateGame.game.physics.arcade.collide(this.bloodEmitter, this.stateGame.layers.LayerCollision, this.bloodCollision, null, this);

        //  todo: add restart level after end level
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
            this.body.velocity.x = 450;
        }
    }

    hitEnemy (player, enemy) {
        player.damage(1);

        const bloodEmitter = this.game.add.emitter(player.x, player.y - 10, 80);

        bloodEmitter.makeParticles('blood');
        bloodEmitter.gravity = 500;
        bloodEmitter.minParticleScale = 1;
        bloodEmitter.maxParticleScale = 2;
        bloodEmitter.setXSpeed(150, 400);
        bloodEmitter.start(true, 2000, null, 80);

        this.bloodEmitter = bloodEmitter;

        enemy.tint = 0x990000;

        // this.stateGame.restartLevel();
    }

    bloodCollision (particle, layer) {
        particle.body.velocity.x = 0;
    }
}

export default Player;
