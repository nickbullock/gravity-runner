
class Preload extends Phaser.State {

    preload() {
        const game = this.game;

        //  load assets
        this.loadAssets(this.game.dataConfigGame["assets"]);
        this.game.stage.backgroundColor = '#000000';
        game.load.onLoadComplete.add(() => setTimeout(() => this.startGame(), game.deviceConfig.preload.startTimeout));
    }

    create() {
        const brusGameText = this.game.add.bitmapText(this.game.world.centerX,
            this.game.world.centerY, 'mecha', 'brus games', this.game.deviceConfig.preload.fontSize);
        const esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

        brusGameText.anchor.set(0.5, 0.5);

        esc.onDown.add(() =>  {
            // clearTimeout(timerStartMainState);
            this.game.state.start(
                "LevelsState",
                Phaser.Plugin.StateTransition.Out.SlideLeft,
                Phaser.Plugin.StateTransition.In.SlideLeft
            )
        }, this);
    }


    /**
     *
     * @param {object} dataAssets - key is config asset
     * @return {null} -
     */
    loadAssets (dataAssets) {
        if (!dataAssets) {
            console.error("[State.Preload.loadAssets] Not found assets config for load resource.");

            return null;
        }

        const that = this;

        Object.keys(dataAssets).forEach(function loadAssetByType (keyAsset) {
            const dataAsset = dataAssets[keyAsset];
            const typeAsset = dataAsset.type;

            switch (typeAsset) {
                case "image":
                    that.load.image(keyAsset, dataAsset.source);
                    break;
                case "spritesheet":
                    that.load.spritesheet(
                        keyAsset,
                        dataAsset.source, dataAsset.frame_width, dataAsset.frame_height,
                        dataAsset.frames, dataAsset.margin, dataAsset.spacing);
                    break;
                case "tilemap":
                    that.load.tilemap(keyAsset, dataAsset.source, null, Phaser.Tilemap.TILED_JSON);
                    break;
                case "bitmapFont":
                    that.load.bitmapFont(keyAsset, dataAsset.source, dataAsset.atlasURL);
                    break;
                case "audio":
                    that.load.audio(keyAsset, dataAsset.source);
                    break;
                default:
                    console.error(`[State.Preload.loadAssets] Not implement type assets [${typeAsset}], name [${keyAsset}].`);
                    break;
            }
        });

        return null;
    }

    startGame() {
        const game = this.game;

        game.load.onLoadComplete.dispose();

        game.state.start("Menu",
            Phaser.Plugin.StateTransition.Out.SlideLeft,
            Phaser.Plugin.StateTransition.In.SlideLeft
        );
    }

}

export default Preload;
