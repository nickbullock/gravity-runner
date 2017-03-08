import Boot from 'states/Boot';
import Preload from 'states/Preload';
import GameTitle from 'states/GameTitle';
import Main from 'states/Main';
import Menu from 'states/Menu';
import Levels from 'states/Levels';
import GameOver from 'states/GameOver';

class Game extends Phaser.Game {

    constructor() {

        super(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS);

        this.state.add('Boot', Boot, false);
        this.state.add('Preload', Preload, false);
        this.state.add('GameTitle', GameTitle, false);
        this.state.add('Menu', Menu, false);
        this.state.add('Levels', Levels, false);
        this.state.add('Main', Main, false);
        this.state.add('GameOver', GameOver, false);

        this.state.start('Boot');
    }

}

new Game();
