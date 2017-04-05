class Score extends Phaser.Text {
    constructor(stateGame, position, properties) {
        const game = stateGame.game;

        super(game, position.x, position.y, properties.text);

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
