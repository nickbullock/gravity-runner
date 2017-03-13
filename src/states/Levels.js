import MapConfig from './../objects/map/map-configuration';

class Levels extends Phaser.State {

    create() {
        const game = this.game;
        let counter = 1;

        for(let mapKey in MapConfig){
            let text = game.add.text(
                game.world.centerX,
                game.world.centerY + 100 * counter,
                MapConfig[mapKey].name,
                { font: "32px Arial",  fill: this.generateHexColor(), backgroundColor: 'rgba(255,0,0,0.25)' }
            );

            text.anchor.setTo(0.5);
            text.lineSpacing = 20;
            text.inputEnabled = true;
            text.events.onInputDown.add(this.startGame.bind(this, mapKey), this);
            counter++;
        }
    }

    generateHexColor() {
        return '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16);
    }

    startGame(mapKey) {
        this.game.state.start("Main", true, false, mapKey);
    }

}

export default Levels;