class MovingWalls {

    constructor(game){

        this.game = game;
        this.wallGroup = null;
        this.spriteGroup = null;
        this.wallSpeed = 300;

        let seed = Date.now();
        this.random = new Phaser.RandomDataGenerator([seed]);

        this.initWalls();
    }

    initWalls(){

        this.wallHeight = this.random.integerInRange(20, this.game.world.height / 3);
        this.wallWidth = 200;

        let wallSprite = new Phaser.Graphics(this.game)
            .beginFill(Phaser.Color.hexToRGB('#e74c3c'), 1)
            .drawRect(0, 0, this.wallWidth, this.wallHeight);

        let wallSpriteTexture = wallSprite.generateTexture();

        this.spriteGroup = this.game.add.group();
        this.spriteGroup.enableBody = true;
        this.spriteGroup.createMultiple(10, wallSpriteTexture);

    }

    spawn(){

        let wall = this.spriteGroup.getFirstDead();

        wall.body.gravity.y = 0;

        wall.reset(this.game.world.width, this.random.integerInRange(0, this.game.world.height));

        wall.body.velocity.x = -this.wallSpeed;
        wall.body.immovable = true;

        //When the block leaves the screen, kill it
        wall.checkWorldBounds = true;
        wall.outOfBoundsKill = true;

    }

}

export default MovingWalls;