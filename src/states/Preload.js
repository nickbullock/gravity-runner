class Preload extends Phaser.State {

    preload() {
        this.game.stage.backgroundColor = '#ffffff';
        const text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Loading...');
        text.anchor.setTo(0.5, 0.5);

        //###### game-title #####
        this.game.load.bitmapFont('desyrel', 'static/assets/fonts/bitmap/desyrel/desyrel.png', 'static/assets/fonts/bitmap/desyrel/desyrel.xml');
        this.game.load.spritesheet('logo', 'static/assets/imgs/game-title/logo.png', 70, 90);
        this.game.load.spritesheet('shadow', 'static/assets/imgs/game-title/shadow.png', 138, 15);
        
        //####### menu ######
        this.game.load.image('bg', 'static/assets/imgs/level/BG.png');
        this.game.load.bitmapFont('future', 'static/assets/fonts/bitmap/future/future.png', 'static/assets/fonts/bitmap/future/future.fnt');
        this.game.load.audio('click', 'static/assets/audio/menu/click.ogg');

        this.game.load.spritesheet('green_button', 'static/assets/imgs/menu/green_button.png');
        this.game.load.spritesheet('blue_button', 'static/assets/imgs/menu/blue_button.png');
        this.game.load.spritesheet('red_button', 'static/assets/imgs/menu/red_button.png');
        
        //####### main #####
        // this.game.load.tilemap('map', 'static/assets/maps/spring-level1.json', null, Phaser.Tilemap.TILED_JSON);
        // this.game.load.image('level-spring', 'static/assets/imgs/level/level-spring.png');
        // this.game.load.atlas(
        //     'player',
        //     'static/assets/imgs/players/ninja-girl/spritesheet/ninja-girl.png',
        //     'static/assets/imgs/players/ninja-girl/spritesheet/ninja-girl.json'
        // );

        //##### new_sprite #####
        // this.game.load.tilemap('myLevel', 'static/assets/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('grass', 'static/assets/imgs/level/grass.png');
        this.game.load.spritesheet('player', 'static/assets/imgs/players/player_v1.png', 64, 64);

        this.game.load.onFileComplete.add(this.showProgress.bind(null, text), this);
        this.game.load.onLoadComplete.add(this.startGame, this);
    }

    showProgress(text, progress) {
        text.setText("Loading: " + progress + "%");
    }

    startGame() {
        this.game.load.onFileComplete.dispose();
        this.game.load.onLoadComplete.dispose();

        this.game.state.start("GameTitle",
            Phaser.Plugin.StateTransition.Out.SlideLeft,
            Phaser.Plugin.StateTransition.In.SlideLeft
        );
    }

}

export default Preload;
