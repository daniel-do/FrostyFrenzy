class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // letters
        this.load.image("letterE", "./assets/letters/letterE.png");
        this.load.image("letterF", "./assets/letters/letterF.png");
        this.load.image("letterN", "./assets/letters/letterN.png");
        this.load.image("letterO", "./assets/letters/letterO.png");
        this.load.image("letterR", "./assets/letters/letterR.png");
        this.load.image("letterS", "./assets/letters/letterS.png");
        this.load.image("letterT", "./assets/letters/letterT.png");
        this.load.image("letterY", "./assets/letters/letterY.png");
        this.load.image("letterZ", "./assets/letters/letterZ.png");

        // arrows 
        this.load.image("left_arrow", "./assets/left_arrow.png");
        this.load.image("right_arrow", "./assets/right_arrow.png");

        this.load.image("keyboard_space", "./assets/keyboard_space.png");

        // background
        this.load.image("snowForest", "./assets/backgrounds/snowForest.png");

        // sfx
        this.load.audio("click", "./assets/audio/switch_001.mp3");
    }

    create() {
        // create the tile backgrounds
        this.snowForest = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'snowForest').setOrigin(0, 0);

        // FROSTY
        this.letterF1 = this.add.image(game.config.width / 4 + (64 * 1), game.config.height / 4, 'letterF').setScale(5);
        this.letterR1 = this.add.image(game.config.width / 4 + (64 * 2), game.config.height / 4, 'letterR').setScale(5);
        this.letterO1 = this.add.image(game.config.width / 4 + (64 * 3), game.config.height / 4, 'letterO').setScale(5);
        this.letterS1 = this.add.image(game.config.width / 4 + (64 * 4), game.config.height / 4, 'letterS').setScale(5);
        this.letterT1 = this.add.image(game.config.width / 4 + (64 * 5), game.config.height / 4, 'letterT').setScale(5);
        this.letterY1 = this.add.image(game.config.width / 4 + (64 * 6), game.config.height / 4, 'letterY').setScale(5);

        // FRENZY
        this.letterF2 = this.add.image(game.config.width / 4 + (64 * 1), game.config.height / 4 + 80, 'letterF').setScale(5);
        this.letterR2 = this.add.image(game.config.width / 4 + (64 * 2), game.config.height / 4 + 80, 'letterR').setScale(5);
        this.letterE2 = this.add.image(game.config.width / 4 + (64 * 3), game.config.height / 4 + 80, 'letterE').setScale(5);
        this.letterN2 = this.add.image(game.config.width / 4 + (64 * 4), game.config.height / 4 + 80, 'letterN').setScale(5);
        this.letterZ2 = this.add.image(game.config.width / 4 + (64 * 5), game.config.height / 4 + 80, 'letterZ').setScale(5);
        this.letterY2 = this.add.image(game.config.width / 4 + (64 * 6), game.config.height / 4 + 80, 'letterY').setScale(5);

        // arrows
        this.leftArrow = this.add.image(game.config.width / 16, (game.config.height * 7) / 8, 'left_arrow').setScale(2);
        this.rightArrow = this.add.image((game.config.width * 15) / 16, (game.config.height * 7) / 8, 'right_arrow').setScale(2);

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
        this.add.text((game.config.width * 2) / 16, ((game.config.height * 7) / 8) - (game.config.height / 32), 'Credits', menuConfig);
        this.add.text((game.config.width * 12) / 16, ((game.config.height * 7) / 8) - (game.config.height / 32), 'Controls', menuConfig);
        this.add.text(game.config.width / 2, (game.config.height * 5) / 8, 'Shoot and dodge the monsters!', menuConfig).setOrigin(0.5);
        if (wave <= 1) {
            this.add.text(game.config.width / 2, ((game.config.height * 6) / 8) - (game.config.height / 32), 'Play', menuConfig).setOrigin(0.5);
        } else {
            this.add.text(game.config.width / 2, ((game.config.height * 6) / 8) - (game.config.height / 32), 'Resume (Wave ' + wave + ')', menuConfig).setOrigin(0.5);
        }

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // sfx
        this.click = this.sound.add("click", {volume: 1});
    }

    update() {
        this.letterF1.y = game.config.height / 4 + (Math.sin(this.game.loop.frame * 0.04) * 20);
        this.letterR1.y = game.config.height / 4 + (Math.sin(this.game.loop.frame * 0.04) * 20);
        this.letterO1.y = game.config.height / 4 + (Math.sin(this.game.loop.frame * 0.04) * 20);
        this.letterS1.y = game.config.height / 4 + (Math.sin(this.game.loop.frame * 0.04) * 20);
        this.letterT1.y = game.config.height / 4 + (Math.sin(this.game.loop.frame * 0.04) * 20);
        this.letterY1.y = game.config.height / 4 + (Math.sin(this.game.loop.frame * 0.04) * 20);

        this.letterF2.y = game.config.height / 4 + 80 + (Math.sin(this.game.loop.frame * 0.04) * 20);
        this.letterR2.y = game.config.height / 4 + 80 + (Math.sin(this.game.loop.frame * 0.04) * 20);
        this.letterE2.y = game.config.height / 4 + 80 + (Math.sin(this.game.loop.frame * 0.04) * 20);
        this.letterN2.y = game.config.height / 4 + 80 + (Math.sin(this.game.loop.frame * 0.04) * 20);
        this.letterZ2.y = game.config.height / 4 + 80 + (Math.sin(this.game.loop.frame * 0.04) * 20);
        this.letterY2.y = game.config.height / 4 + 80 + (Math.sin(this.game.loop.frame * 0.04) * 20);

        if (Phaser.Input.Keyboard.JustDown(keyLEFT) || Phaser.Input.Keyboard.JustDown(keyA)) {
            this.scene.start("creditsScene");
            this.click.play();
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT) || Phaser.Input.Keyboard.JustDown(keyD)) {
            this.scene.start("controlsScene");
            this.click.play();
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("playScene");
            this.click.play();
        }

        // update the tile background
        this.snowForest.tilePositionX += 4;
      }
}