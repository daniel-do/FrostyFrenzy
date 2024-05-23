class Controls extends Phaser.Scene {
    constructor() {
        super("controlsScene");
    }

    preload() {
        // arrows
        this.load.image("left_arrow", "./assets/left_arrow.png");

        // background
        this.load.image("snowForest", "./assets/backgrounds/snowForest.png");
    }

    create() {
        // create the tile backgrounds
        this.snowForest = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'snowForest').setOrigin(0, 0);

        // arrows
        this.leftArrow = this.add.image(game.config.width / 16, (game.config.height * 7) / 8, 'left_arrow').setScale(2);

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
        this.add.text((game.config.width * 2) / 16, ((game.config.height * 7) / 8) - (game.config.height / 32), 'Menu', menuConfig);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT) || Phaser.Input.Keyboard.JustDown(keyA)) {
            this.scene.start("menuScene");
        }

        // update the tile background
        this.snowForest.tilePositionX += 4;
      }
}