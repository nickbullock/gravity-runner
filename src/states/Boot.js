
import dataConfigGame from '../../static/assets/levels/levels.json';
import deviceConfig from '../../device-config.json';

/**
 * @class Boot
 */
class Boot extends Phaser.State {

    create() {
        "use strict";
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.scale.pageAlignHorizontally = true;

        Phaser.Plugin.StateTransition.Out.SlideLeft.duration = 1000;
        Phaser.Plugin.StateTransition.In.SlideLeft.duration = 1000;
        
        this.game.dataConfigGame = dataConfigGame;

        if(this.game.device.desktop){
            this.game.deviceConfig = deviceConfig["desktop"];
        }
        else{
            this.game.deviceConfig = deviceConfig["mobile"];
        }

        console.log(">>>>>>",this.game.device.desktop)

        this.game.state.start("Preload");
    }
}

export default Boot;
