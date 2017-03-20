class Preload extends Phaser.State {

    preload() {
        this.game.stage.backgroundColor = '#ffffff';
        const text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Loading...');
        text.anchor.setTo(0.5, 0.5);

        //###### game-title #####
        this.game.load.bitmapFont('desyrel', 'assets/fonts/bitmap/desyrel/desyrel.png', 'assets/fonts/bitmap/desyrel/desyrel.xml');
        this.game.load.spritesheet('logo', 'assets/imgs/game-title/logo.png', 70, 90);
        this.game.load.spritesheet('shadow', 'assets/imgs/game-title/shadow.png', 138, 15);
        
        //####### menu ######
        this.game.load.image('bg', 'assets/imgs/level/BG.png');
        this.game.load.bitmapFont('future', 'assets/fonts/bitmap/future/future.png', 'assets/fonts/bitmap/future/future.fnt');
        this.game.load.audio('click', 'assets/audio/menu/click.ogg');

        this.game.load.spritesheet('green_button', 'assets/imgs/menu/green_button.png');
        this.game.load.spritesheet('blue_button', 'assets/imgs/menu/blue_button.png');
        this.game.load.spritesheet('red_button', 'assets/imgs/menu/red_button.png');
        
        //####### main #####
        this.game.load.tilemap('map', 'assets/maps/spring-level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('level-spring', 'assets/imgs/level/level-spring.png');
        this.game.load.atlas(
            'player',
            'assets/imgs/players/ninja-girl/spritesheet/ninja-girl.png',
            'assets/imgs/players/ninja-girl/spritesheet/ninja-girl.json'
        );

        //##### new_sprite #####
        this.game.load.tilemap('myLevel', 'assets/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('grass', 'assets/imgs/level/grass.png');
        this.game.load.spritesheet('dude', 'assets/imgs/players/business.png', 50, 50);

        this.game.load.onFileComplete.add(this.showProgress.bind(null, text), this);
        this.game.load.onLoadComplete.add(this.startGame, this);
    }

    showProgress(text, progress) {
        text.setText("Loading: " + progress + "%");
    }

    startGame() {
        this.game.state.start("GameTitle",
            Phaser.Plugin.StateTransition.Out.SlideLeft,
            Phaser.Plugin.StateTransition.In.SlideLeft
        )
    }

}

export default Preload;
