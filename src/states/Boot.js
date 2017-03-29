/* global Phaser*/

/**
 * @class Boot
 */
class Boot extends Phaser.State {
    constructor (pathConfigGame) {
        "use strict";
        super();

        this.pathConfigGame = pathConfigGame;
    }

    preload () {
        "use strict";
        this.load.json("configGame", this.pathConfigGame);
    }

    create() {
        "use strict";
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        this.scale.pageAlignHorizontally = true;

        Phaser.Plugin.StateTransition.Out.SlideLeft.duration = 1000;
        Phaser.Plugin.StateTransition.In.SlideLeft.duration = 1000;

        this.game.state.start("Preload", true, false, this.game.cache.getJSON("configGame"));
    }
}

export default Boot;
