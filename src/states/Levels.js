class Levels extends Phaser.State {

    create() {

    }

    startGame() {
        this.game.state.start("Levels");
    }

}

export default Levels;