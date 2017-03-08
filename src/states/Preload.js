class Preload extends Phaser.State {

    preload() {
        this.game.stage.backgroundColor = '#ffffff';
        const text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Loading...');

        this.game.load.spritesheet('logo', 'assets/imgs/game-title/logo.png', 70, 90);
        this.game.load.spritesheet('shadow', 'assets/imgs/game-title/shadow.png', 138, 15);
        this.game.load.bitmapFont('desyrel', 'assets/fonts/bitmap/desyrel/desyrel.png', 'assets/fonts/bitmap/desyrel/desyrel.xml');

        this.game.load.onFileComplete.add(this.showProgress.bind(null, text), this);
        this.game.load.onLoadComplete.add(this.startGame, this);
    }

    showProgress(text, progress) {
        text.setText("Loading: " + progress + "%");
    }

    startGame() {
        const GAME_TITLE_STATE_START_TIMEOUT = 1000;

        setTimeout(() => {this.game.state.start("GameTitle")}, GAME_TITLE_STATE_START_TIMEOUT);
    }

}

export default Preload;
