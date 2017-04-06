class Score extends Phaser.BitmapText {
    constructor(stateGame, position, properties) {
        const game = stateGame.game;

        super(game, position.x, position.y, properties.font, properties.text, properties.fontSize);

        this.stateGame = stateGame;

        this.stateGame.groups[properties.group].add(this);

        this.fixedToCamera = true;

        return this;
    }

    update () {
        this.text = `Score: ${this.stateGame.prefabs.player.score}`;
    }
}

export default Score;
