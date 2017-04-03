/* global Phaser*/

import dataConfigGame from '../../static/assets/levels/levels.json';

/**
 * @class Boot
 */
class Boot extends Phaser.State {
    init (pathConfigGame) {
        "use strict";

        // this.pathConfigGame = pathConfigGame;
    }

    preload () {
        "use strict";
        // this.load.json("configGame", this.pathConfigGame);
    }

    create() {
        "use strict";
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        this.scale.pageAlignHorizontally = true;

        Phaser.Plugin.StateTransition.Out.SlideLeft.duration = 1000;
        Phaser.Plugin.StateTransition.In.SlideLeft.duration = 1000;

        // this.game.dataConfigGame = this.game.cache.getJSON("configGame");
        this.game.dataConfigGame = dataConfigGame;

        this.game.state.start("Preload");
    }
}

export default Boot;
