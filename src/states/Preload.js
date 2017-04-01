/* global Phaser*/

/**
 * @class Preload
 */
class Preload extends Phaser.State {
    preload() {
        const game = this.game;

        game.stage.backgroundColor = '#ffffff';

        const text = game.add.text(game.world.centerX, game.world.centerY, 'Loading...');

        text.anchor.setTo(0.5, 0.5);

        //  load assets
        this.loadAssets(this.game.dataConfigGame["assets"]);

        game.load.onFileComplete.add(this.showProgress.bind(null, text), this);
        game.load.onLoadComplete.add(this.startGame, this);
    }

    showProgress (text, progress) {
        text.setText("Loading: " + progress + "%");
    }

    startGame () {
        const game = this.game;

        game.load.onFileComplete.dispose();
        game.load.onLoadComplete.dispose();

        game.state.start("GameTitle",
            Phaser.Plugin.StateTransition.Out.SlideLeft,
            Phaser.Plugin.StateTransition.In.SlideLeft
        );
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
}

export default Preload;
