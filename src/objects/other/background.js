class Background extends Phaser.TileSprite {
    constructor(stateGame, position, properties) {
        const game = stateGame.game;

        super(stateGame, position.x, position.y, game.width, game.height, properties.key);

        this.stateGame = stateGame;

        this.fixedToCamera = true;
        this.tilePosition.set(-game.camera.x, -game.camera.y);

        game.add.existing(this);

        return this;
    }

    update() {
        if (this.stateGame.prefabs.player.alive) {
            this.tilePosition.x--;
        }
    }
}

export default Background;
