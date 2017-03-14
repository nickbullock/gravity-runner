class Menu extends Phaser.State {

    create() {

        this.buttons = [
            {
                name: "play",
                x: this.game.world.centerX,
                y: this.game.world.centerY - 100,
                sprite: "green_button",
                callback: () => {
                    this.game.sound.play('click');
                    this.game.state.start("Levels",   
                        Phaser.Plugin.StateTransition.Out.SlideLeft,
                        Phaser.Plugin.StateTransition.In.SlideLeft
                    );
                },
                label: "Играть"
            },
            {
                name: "settings",
                x: this.game.world.centerX,
                y: this.game.world.centerY,
                sprite: "blue_button",
                callback: () => {
                    this.game.sound.play('click');
                },
                label: "Настройки"
            },
            {
                name: "exit",
                x: this.game.world.centerX,
                y: this.game.world.centerY + 100,
                sprite: "red_button",
                callback: () => {
                    this.game.sound.play('click');
                },
                label: "Выход"
            }
        ];

        this.buttons.forEach((button) => {
            let newButton = this[button.name] =  this.game.add.button(button.x, button.y, button.sprite, button.callback, this);
            let newButtonLabel = this[button.name + "Label"] = this.game.add.bitmapText(button.x, button.y, "future", button.label);

            newButton.onInputOver.add(this.overCallback.bind(null, this.game, newButton, newButtonLabel));
            newButton.onInputOut.add(this.outCallback.bind(null, this.game, newButton, newButtonLabel));

            newButton.anchor.setTo(0.5, 0.5);
            newButton.scale.setTo(1.9);
            newButtonLabel.anchor.setTo(0.5, 0.5);
            newButtonLabel.fontSize = 40;
        });
    }


    update() {
        this.buttons.forEach((button) => {
            this[button.name + "Label"].x =  this[button.name].x;
            this[button.name + "Label"].y =  this[button.name].y - 10;
        });
    }

    overCallback(game, button, label) {
        game.add.tween(label).to({fontSize: 50}, 200, Phaser.Easing.Linear.None).start();
        game.add.tween(button.scale).to({x: 2.3, y: 2.3}, 200, Phaser.Easing.Linear.None).start();
    }

    outCallback(game, button, label) {
        game.add.tween(label).to({fontSize: 40}, 200, Phaser.Easing.Linear.None).start();
        game.add.tween(button.scale).to({x: 1.9, y: 1.9}, 200, Phaser.Easing.Linear.None).start();
    }

}

export default Menu;
