import MapConfig from './../objects/map/map-configuration';
import Level1MapTiled from './../../build/assets/maps/level1-gravity-v1.json'

class Levels extends Phaser.State {

    create() {
        const game = this.game;
        const fontSettings = { font: "32px Arial",  fill: this.generateHexColor(), backgroundColor: '000000' };
        let counter = 1;

        // for(let mapKey in MapConfig){
        //     let text = game.add.text(
        //         game.world.centerX,
        //         game.world.centerY + (80 * counter) - 200,
        //         MapConfig[mapKey].name,
        //         fontSettings
        //     );
        //
        //     text.anchor.setTo(0.5);
        //     text.lineSpacing = 10;
        //     text.inputEnabled = true;
        //     text.events.onInputDown.add(this.startGame.bind(this, mapKey), this);
        //     counter++;
        // }

        let text = game.add.text(
            game.world.centerX,
            game.world.centerY + (80 * counter) - 200,
            Level1MapTiled.properties.name,
            fontSettings
        );

        text.anchor.setTo(0.5);
        text.lineSpacing = 10;
        text.inputEnabled = true;
        text.events.onInputDown.add(this.startGame.bind(this, Level1MapTiled.properties.nameFile), this);
    }
    
    generateHexColor() {
        return '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16);
    }

    startGame(mapKey) {
        this.game.state.start("Main", null, null, true, false, mapKey);
    }

}

export default Levels;