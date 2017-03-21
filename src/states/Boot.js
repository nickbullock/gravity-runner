class Boot extends Phaser.State {

    create() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        this.scale.pageAlignHorizontally = true;

        Phaser.Plugin.StateTransition.Out.SlideLeft.duration = 1000;
        Phaser.Plugin.StateTransition.In.SlideLeft.duration = 1000;
        
        this.game.state.start("Preload");
    }

}

export default Boot;
