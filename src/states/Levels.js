/* global Phaser */

import levelsConfig from "../config/level-selection.json"
import currentPlayerStars from "../fixture/current-player-level-progress.json"
import Levels from "../objects/map/levels"

'use strict';

const NAME_LEVELS = "levels";
const NAME_LEVEL_ARROW = "level_arrows";

/**
 *
 */
class LevelsState extends Phaser.State {
    constructor () {
        super();

        this.thumbWidth = levelsConfig["thumbWidth"];
        this.thumbHeight = levelsConfig["thumbHeight"];
        this.thumbColumns = levelsConfig["thumbColumns"];
        this.thumbRows = levelsConfig["thumbRows"];
        this.thumbSpacing = levelsConfig["thumbSpacing"];

        //  todo: add calculate
        this.numberPages = 1;
        this.countLevels = levelsConfig.levels.length;

        this.levelWidth = this.thumbWidth * this.thumbColumns + this.thumbSpacing * (this.thumbColumns - 1);
        this.levelHeight = this.thumbHeight * this.thumbRows + this.thumbSpacing * (this.thumbRows - 1);
    }

    preload () {
        const game = this.game;

        game.load.spritesheet(NAME_LEVELS, "/assets/imgs/level-selection/levels.png", 64, 64);
        game.load.spritesheet(NAME_LEVEL_ARROW, "/assets/imgs/level-selection/level_arrows.png", 48, 48);
    }

    create() {
        const game = this.game;
        const screenHeight = this.game.height;
        const screenWidth = this.game.width;

        // horizontal offset to have level thumbnails horizontally centered in the page
        const offsetX = (screenWidth - this.levelWidth) / 2;
        // const offsetY = (screenHeight - levelHeight) / 2;
        const offsetY = 100;

        this.levelThumbsGroup = this.levelsInit(offsetX, offsetY, screenWidth);

        this.arrowsInit(offsetX, offsetY + this.levelHeight + 20, this.levelWidth);
    }

    // placing left and right arrow buttons, will call arrowClicked function when clicked
    arrowsInit (xStartPosition, yStartPosition, levelsWidth) {
        const game = this.game;
        const handlerArrowClicked = this.handlerArrowClicked.bind(this);

        const leftArrow = this.leftArrow = game.add.button(xStartPosition, yStartPosition, NAME_LEVEL_ARROW, handlerArrowClicked);

        leftArrow.anchor.setTo(0, 0);
        leftArrow.frame = 0;
        leftArrow.alpha = 0.3;

        const rightArrow = this.rightArrow = game.add.button(xStartPosition + levelsWidth, yStartPosition, NAME_LEVEL_ARROW, handlerArrowClicked);

        rightArrow.anchor.setTo(1, 0);
        rightArrow.frame = 1;
    }

    levelsInit (xStartPosition, yStartPosition, screenWidth) {
        const game = this.game;
        const levelThumbsGroup = game.add.group();

        const listPoint = LevelsState.calculatePositionButtonLevels(
            xStartPosition, yStartPosition,
            this.countLevels,
            this.thumbColumns, this.thumbRows,
            this.thumbWidth, this.thumbHeight,
            this.thumbSpacing,
            screenWidth);

        listPoint.reduce(this.drawButtonLevel.bind(this), levelThumbsGroup);

        return levelThumbsGroup;
    }

    drawButtonLevel (levelThumbsGroup, point, index) {
        const game = this.game;
        const countStars = currentPlayerStars[index] || Levels.state.CLOSE;
        const levelThumb = game.add.button(point.x, point.y, NAME_LEVELS, this.handlerSelectLevel, this);

        // shwoing proper frame
        levelThumb.frame = countStars;
        // custom attribute
        levelThumb.levelNumber = index + 1;

        // adding the level thumb to the group
        levelThumbsGroup.add(levelThumb);

        // if the level is playable, also write level number
        if(countStars < Levels.state.CLOSE){
            const style = {
                font: "18px Arial",
                fill: "#ffffff"
            };
            const levelText = game.add.text(levelThumb.x + 5,levelThumb.y + 5, index + 1, style);

            levelText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 1);

            levelThumbsGroup.add(levelText);
        }

        return levelThumbsGroup;
    }

    addNumberLevel () {

    }

    handlerSelectLevel () {
        // the level is playable, then play the level!!
        if(button.frame < 4){
            alert("playing level " + button.levelNumber);
        }
        // else, let's shake the locked levels
        else{
            var buttonTween = game.add.tween(button)
            buttonTween.to({
                x: button.x+thumbWidth/15
            }, 20, Phaser.Easing.Cubic.None);
            buttonTween.to({
                x: button.x-thumbWidth/15
            }, 20, Phaser.Easing.Cubic.None);
            buttonTween.to({
                x: button.x+thumbWidth/15
            }, 20, Phaser.Easing.Cubic.None);
            buttonTween.to({
                x: button.x-thumbWidth/15
            }, 20, Phaser.Easing.Cubic.None);
            buttonTween.to({
                x: button.x
            }, 20, Phaser.Easing.Cubic.None);
            buttonTween.start();
        }
        // this.game.state.start("Main", null, null, true, false, idMap);
    }

    handlerArrowClicked () {

    }

    static calculatePositionButtonLevels (
        xStartPosition, yStartPosition,
        countLevels,
        thumbColumns, thumbRows,
        thumbWidth, thumbHeight,
        thumbSpacing,
        screenWidth
    ) {
        const listPoint = [];

        const countLevelsPerPage = thumbRows * thumbColumns;
        const numberPages = Math.ceil(countLevels / countLevelsPerPage);

        const listPage = [...Array(numberPages)];

        listPage.forEach((page, indexPage) => {
            const xStartPositionPerPage = xStartPosition + screenWidth * indexPage;

            const countLevelStart = indexPage * countLevelsPerPage;
            const thumbRowsByPage = countLevelsPerPage + countLevelStart < countLevels
                ? thumbRows
                : Math.ceil((countLevels - countLevelStart) / thumbColumns);

            const listRow = [...Array(thumbRowsByPage)];

            let countShowLevels = countLevelStart;

            listRow.forEach((row, indexRow) => {

                const thumbColumnByRow = countShowLevels + thumbColumns < countLevels
                    ? thumbColumns
                    : countLevels - countShowLevels;

                const listColumn = [...Array(thumbColumnByRow)];

                listColumn.forEach((column, indexColumn) => {

                    listPoint.push({
                        x: xStartPositionPerPage + indexColumn * (thumbWidth + thumbSpacing),
                        y: yStartPosition + indexRow * (thumbHeight + thumbSpacing)
                    });
                });

                countShowLevels += thumbColumns;
            });
        });

        return listPoint;
    }
}

export default LevelsState;
