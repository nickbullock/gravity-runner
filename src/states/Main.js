"use strict";

import Player from '../objects/prefabs/player';
import StaticEnemy from '../objects/prefabs/static-enemy';
import MovableEnemy from '../objects/prefabs/movable-enemy';
import Coin from '../objects/prefabs/coin';
import Score from '../objects/other/score';
import Background from '../objects/other/background';
import GameOverPanel from '../objects/other/game-over-panel';
import PieProgress from '../objects/icon/ability';

/* global Phaser*/

/**
 * @class Main
 */
class Main extends Phaser.State {
    /**
     *
     * @param dataLevel - относительный путь от /assets/maps с / без расширения. Поддерживаем пока только
     * JSON config tiles map
     */
    init (dataLevel) {

        this.game.scale.setMaximum();
        this.game.scale.updateLayout(true);
        this.dataLevel = dataLevel;
        this.gameOver = false;

        this.dataClassPrefabs = {
            player: Player,
            saw: StaticEnemy,
            peak: StaticEnemy,
            halfsaw: MovableEnemy,
            background: Background,
            coin: Coin,
            score: Score,
            icon: PieProgress
        };

        // start physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 200;

        // create map and set tileset
        this.map = this.game.add.tilemap(this.dataLevel.key);
        //  Здесь должно быть соответствие между tileset указанным на карте и ресурсом загруженным в игру
        //  сейчас сделано так что имена их совпадают
        this.map.addTilesetImage(this.dataLevel.tileset);
    }

    create () {
        const game = this.game;

        game.time.advancedTiming = true;
        game.physics.arcade.TILE_BIAS = 50;

        // create map layers
        let nameGroup, layerObject, tilesCollision;

        this.layers = {};

        //  create background
        this.map.images.forEach(function (image) {
            const position = {x: 0, y: 0};

            new Background(this, position, image.properties);
        }, this);

        //  create layers object, collision
        this.map.layers.forEach(function (layer) {
            this.layers[layer.name] = this.map.createLayer(layer.name);

            if (layer.properties.collision) { // collision layer
                tilesCollision = [];
                layer.data.forEach(function (dataRow) { // find tiles used in the layer
                    dataRow.forEach(function (tile) {
                        // check if it's a valid tile index and isn't already in the list
                        if (tile.index > 0 && tilesCollision.indexOf(tile.index) === -1) {
                            tilesCollision.push(tile.index);
                        }
                    }, this);
                }, this);
                this.map.setCollision(tilesCollision, true, layer.name);
            }
        }, this);
        // resize the world to be the size of the current layer
        this.layers[this.map.layer.name].resizeWorld();

        // create groups
        this.groups = {};
        game.dataConfigGame.groups.forEach(function (nameGroup) {
            this.groups[nameGroup] = this.game.add.group();
        }, this);

        this.prefabs = {};

        for (layerObject in this.map.objects) {
            if (this.map.objects.hasOwnProperty(layerObject)) {
                // create layer objects
                this.map.objects[layerObject].forEach(this.createObject, this);
            }
        }

        const buttonRestart = game.input.keyboard
            .addKey(Phaser.Keyboard.ESC);

        buttonRestart.onDown.add(this.restartLevel, this);
    }

    update() {
        if (!this.prefabs.player.alive && !this.gameOver) {
            this.gameOver = true;
            this.gameOverPanel = new GameOverPanel(this.game, 'game_over_panel', this.prefabs.score, this.restartLevel.bind(this));
        }
    }

    render () {
        const game = this.game;

        game.debug.text(game.time.physicsElapsed, 32, 32);
        game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");

        const groupPlayers = this.groups["players"];

        groupPlayers.forEach(function (member) {
            game.debug.body(member);
            game.debug.bodyInfo(member, 16, 24);
        }, this);

        const groupStaticEnemy = this.groups["static_enemy"];

        groupStaticEnemy.forEach(function (member) {
            game.debug.body(member);
        }, this);

        const groupMovableEnemy = this.groups["movable_enemy"];

        groupMovableEnemy.forEach(function (member) {
            game.debug.body(member);
        }, this);
    }

    createObject (object) {
        // tiled coordinates starts in the bottom left corner
        const position = {
            "x": object.x + (this.map.tileHeight / 2),
            "y": object.y - (this.map.tileHeight / 2)
        };

        // create object according to its type
        const classPrefab = this.dataClassPrefabs[object.type];

        if (classPrefab) {
            this.prefabs[object.name] = new classPrefab(this, position, object.properties);

            return null;
        }

        console.warn(`[State.Main.createObject] Not implement type object [${object.type}].`);

        return null;
    }

    restartLevel () {
        if (!this.prefabs.player.alive) {
            this.game.state.restart(true, false, this.dataLevel);
            this.game.paused = false;
        }
    }
}

export default Main;
