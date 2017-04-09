class GameOverPanel extends Phaser.Sprite {
    constructor(stateGame, key, score, returnCallback) {
        const game = stateGame;

        super(stateGame, window.innerWidth/2, window.innerHeight/2, key);

        this.fixedToCamera = true;
        this.scale.set(3, 2);
        this.anchor.setTo(0.5, 0.5);

        game.add.existing(this);

        const gameOverText = game.add.bitmapText(window.innerWidth/2, window.innerHeight/2, "desyrel", "GAME OVER");
        gameOverText.anchor.setTo(0.5, 0.5);
        gameOverText.fixedToCamera = true;

        const scoreText = game.add.bitmapText(window.innerWidth/2, window.innerHeight/2 + 50, "desyrel", score.text);
        scoreText.anchor.setTo(0.5, 0.5);
        scoreText.fixedToCamera = true;

        const returnButton = game.add.button(window.innerWidth/2 - 100, window.innerHeight/2 + 50, "return", returnCallback);
        returnButton.anchor.setTo(0.5, 0.5);
        returnButton.fixedToCamera = true;

        return this;
    }
}

export default GameOverPanel;