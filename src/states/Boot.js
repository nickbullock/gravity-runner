/* global Phaser*/

import dataConfigGame from '../../static/assets/levels/levels.json';

/**
 * @class Boot
 */
class Boot extends Phaser.State {

    create() {
        "use strict";
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

        this.scale.pageAlignHorizontally = true;

        Phaser.Plugin.StateTransition.Out.SlideLeft.duration = 1000;
        Phaser.Plugin.StateTransition.In.SlideLeft.duration = 1000;
        
        this.game.dataConfigGame = dataConfigGame;

        this.game.state.start("Preload");
    }
}

export default Boot;
