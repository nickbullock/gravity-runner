/* global Phaser */
class PieProgress extends Phaser.Sprite {
    constructor (stateGame, position, properties) {
        const game = stateGame.game;
        const {radius = 20, color = '0x000000', angle = -90} = properties;

        const bmp = game.add.bitmapData(radius * 2, radius * 2);

        super(game, position.x, position.y, bmp);

        this.stateGame = stateGame;

        this.stateGame.groups[properties.group].add(this);

        this.fixedToCamera = true;

        this.bmp = bmp;
        this._radius = radius;
        this._progress = 1;

        this.anchor.set(1, 1);
        this.angle = angle;
        this.color = color;
        this.alpha = 0.5;

        this.updateProgress();
    }

    updateProgress () {
        const progress = Phaser.Math.clamp(this._progress, 0.00001, 0.99999);

        this.bmp.clear();
        this.bmp.ctx.fillStyle = this.color;
        this.bmp.ctx.beginPath();
        this.bmp.ctx.arc(this._radius, this._radius, this._radius, 0, (Math.PI * 2) * progress, true);
        this.bmp.ctx.lineTo(this._radius, this._radius);
        this.bmp.ctx.closePath();
        this.bmp.ctx.fill();
        this.bmp.dirty = true;
    }

    get radius () {
        return this._radius;
    }

    set radius (val) {
        this._radius = (val > 0 ? val : 0);
        this.bmp.resize(this._radius * 2, this._radius * 2);
        this.updateProgress();
    }

    get progress () {
        return this._progress;
    }

    set progress (val) {
        this._progress = Phaser.Math.clamp(val, 0, 1);
        this.updateProgress();
    }
}

export default PieProgress;
