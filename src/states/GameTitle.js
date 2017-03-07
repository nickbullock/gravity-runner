class GameTitle extends Phaser.State {

    preload() {
        this.game.load.spritesheet('logo', 'assets/imgs/BRUS.png', 70, 90);
        this.game.load.spritesheet('shadow', 'assets/imgs/shadow.png', 138, 15);
        this.game.load.bitmapFont('desyrel', 'assets/fonts/bitmap/desyrel/desyrel.png', 'assets/fonts/bitmap/desyrel/desyrel.xml');
    }

    create() {
        this.game.stage.backgroundColor = '#ffffff';

        for (let i = 0; i < 4; i++) {
            const shadow = this.game.add.sprite(this.game.world.centerX - 100 + 69 * i, this.game.world.centerY - 63, 'shadow');
            const letter = this.game.add.sprite(this.game.world.centerX - 100 + 69 * i, -50, 'logo', i);

            shadow.scale.setTo(0.0, 0.0);
            shadow.anchor.setTo(0.5, 0.5);
            letter.anchor.setTo(0.5, 0.5);

            this.game.add.tween(shadow.scale).to({x: 1.0, y: 1.0}, 2400, Phaser.Easing.Bounce.Out, true);
            this.game.add.tween(letter).to({y: this.game.world.centerY - 100}, 2400, Phaser.Easing.Bounce.Out, true, 1000 + 400 * i);
        }

        const text = this.game.add.bitmapText(this.game.world.centerX + 20, this.game.world.centerY - 50 , 'desyrel', 'games', 64);

        text.alpha = 0;
        text.rotation = -0.3;

        this.game.add.tween(text).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 3000);

        setTimeout(() => {this.startGame()}, 8000);
    }

    startGame() {
        this.game.state.start("Main");
    }

}

export default GameTitle;
