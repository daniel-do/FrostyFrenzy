class NextWave extends Phaser.Scene {
    constructor() {
        super("nextwaveScene");
    }

    preload() {
        // background
        this.load.image("empty", "./assets/backgrounds/empty.png");
    }

    create() {
        wave++;
        score++;
        shootDelay -= 250;

        // create the tile backgrounds
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'empty').setOrigin(0, 0);

        this.keyboardSpace = this.add.image(game.config.width / 2, (game.config.height * 7) / 8, 'keyboard_space').setScale(2);

        // menu text configuration
        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: 'black',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        if (wave < 10) {
            // arrows
            this.leftArrow = this.add.image(game.config.width / 16, (game.config.height * 7) / 8, 'left_arrow').setScale(2);

            this.add.text((game.config.width * 2) / 16, ((game.config.height * 7) / 8) - (game.config.height / 32), 'Menu', menuConfig);
            this.add.text((game.config.width * 3)/ 8, (game.config.height / 2) - (game.config.height / 32), 'Cleared Wave ' + (wave - 1) + '!', menuConfig);
            this.add.text((game.config.width * 3.25)/ 8, ((game.config.height * 5.75) / 8) - (game.config.height / 32), 'Next Wave', menuConfig);
        } else if (wave == 10) {
            this.leftArrow = this.add.image(game.config.width / 16, (game.config.height * 7) / 8, 'left_arrow').setScale(2);

            this.add.text((game.config.width * 3)/ 8, (game.config.height / 2) - (game.config.height / 32), 'Cleared Wave ' + (wave - 1) + '!', menuConfig);
            this.add.text((game.config.width * 3.25)/ 8, ((game.config.height * 5.75) / 8) - (game.config.height / 32), 'Final Wave', menuConfig);
        }
        if (wave > 10) {
            this.add.text((game.config.width * 2)/ 8, (game.config.height / 2) - (game.config.height / 32), 'You have cleared all waves, congrats!', menuConfig);
            this.add.text((game.config.width * 3.25)/ 8, ((game.config.height * 5.75) / 8) - (game.config.height / 32), 'Main Menu', menuConfig);
        }

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (wave <= 10) {
            if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                this.scene.start("menuScene");
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            if (wave < 11) {
                this.scene.start("playScene");
            } else {
                score = 0;
                wave = 1;
                shootDelay = 3000;
                this.scene.start("menuScene")
            }
        }
      }
}