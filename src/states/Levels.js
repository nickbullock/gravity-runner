/* global Phaser */

import levelsConfig from "../config/level-selection.json"
import currentPlayerStars from "../fixture/current-player-level-progress.json"
import Levels from "../objects/map/levels"

'use strict';

const NAME_LEVELS = "levels";
const NAME_LEVEL_ARROW = "level_arrows";

const levels = levelsConfig.levels;

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

        this.countLevels = levels.length;
        this.countLevelsPerPage = this.thumbRows * this.thumbColumns;
        this.countPages = Math.ceil(this.countLevels / this.countLevelsPerPage);
        this.currentPage = 0;

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
        levelThumb.idLevel = levels[index].file;

        // adding the level thumb to the group
        levelThumbsGroup.add(levelThumb);

        if(countStars < Levels.state.CLOSE) {
            levelThumbsGroup = this.addNumberLevel(levelThumbsGroup, levelThumb.x, levelThumb.y, index + 1);
        }

        return levelThumbsGroup;
    }

    addNumberLevel (levelThumbsGroup, x, y, numberLevel) {
        const game = this.game;
        const style = {
            font: "18px Arial",
            fill: "#ffffff"
        };
        const levelText = game.add.text(x + 5, y + 5, numberLevel, style);

        levelText.setShadow(2, 2, 'rgba(0,0,0,0.5)', 1);

        levelThumbsGroup.add(levelText);

        return levelThumbsGroup;
    }

    handlerSelectLevel (button) {
        const game = this.game;
        const thumbWidth = this.thumbWidth;
        const TIME_TWEEN = 100;

        // the level is playable, then play the level!!
        if(button.frame < Levels.state.CLOSE){
            this.startLevel(button.idLevel)
        }
        // else, let's shake the locked levels
        else{
            const buttonTween = game.add.tween(button);

            buttonTween.to({
                x: button.x + thumbWidth/15
            }, TIME_TWEEN, Phaser.Easing.Cubic.None);
            buttonTween.to({
                x: button.x - thumbWidth/15
            }, TIME_TWEEN, Phaser.Easing.Cubic.None);
            buttonTween.to({
                x: button.x + thumbWidth/15
            }, TIME_TWEEN, Phaser.Easing.Cubic.None);
            buttonTween.to({
                x: button.x - thumbWidth/15
            }, TIME_TWEEN, Phaser.Easing.Cubic.None);
            buttonTween.to({
                x: button.x
            }, TIME_TWEEN, Phaser.Easing.Cubic.None);
            buttonTween.start();
        }
        // this.game.state.start("Main", null, null, true, false, idMap);
    }

    startLevel (idLevel) {
        this.game.state.start("Main",
            null,
            null,
            true,
            false,
            idLevel
        );
    }

    handlerArrowClicked (button) {
        const game = this.game;
        const levelThumbsGroup = this.levelThumbsGroup;

        // touching right arrow and still not reached last page
        if(button.frame === 1 && this.currentPage < this.countPages - 1){
            this.leftArrow.alpha = 1;
            this.currentPage++;

            // fade out the button if we reached last page
            if(this.currentPage === this.countPages-1){
                button.alpha = 0.3;
            }
            // scrolling level pages
            const buttonsTween = game.add.tween(levelThumbsGroup);

            buttonsTween.to({
                x: this.currentPage * game.width * -1
            }, 500, Phaser.Easing.Cubic.None);
            buttonsTween.start();
        }
        // touching left arrow and still not reached first page
        if(button.frame === 0 && this.currentPage > 0){
            this.rightArrow.alpha = 1;
            this.currentPage--;

            // fade out the button if we reached first page
            if(this.currentPage === 0){
                button.alpha = 0.3;
            }
            // scrolling level pages
            const buttonsTween = game.add.tween(levelThumbsGroup);

            buttonsTween.to({
                x: this.currentPage * game.width * -1
            }, 400, Phaser.Easing.Cubic.None);
            buttonsTween.start();
        }
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
