class GameTitle extends Phaser.State {

	create() {

	}

	startGame() {
		this.game.state.start("Main");
	}

}

export default GameTitle;
