import Helicopter from 'objects/Helicopter';
import MovingWalls from 'objects/MovingWalls';

class Main extends Phaser.State {

    create() {

        //Enable Arcade Physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //Set the games background colour
        this.game.stage.backgroundColor = '#cecece';

        this.helicopter = new Helicopter(this.game);
        this.helicopter.spawn();

        this.walls = new MovingWalls(this.game);

        this.addControls();
        this.addTimers();
    }

    update() {

        this.game.physics.arcade.overlap(this.helicopter.sprite, this.walls.spriteGroup, this.gameOver, null, this);

        // Check if out of bounds
        if(this.helicopter.isOutOfBounds()){
            this.gameOver();
        }

        // Check if  helicopter is rising
        if(this.helicopter.isRising){
            this.helicopter.increaseVerticalVelocity();
        }

    }

    addControls(){
        this.game.input.onDown.add(this.helicopter.setRising, this.helicopter);
        this.game.input.onUp.add(this.helicopter.setFalling, this.helicopter);
    }

    addTimers(){
        this.game.time.events.loop(2000, this.walls.spawn, this.walls);
    }

    gameOver(){
        this.game.state.restart();
    }

}

export default Main;