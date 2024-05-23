class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {
        // arrows 
        this.load.image("right_arrow", "./assets/right_arrow.png");

        // background
        this.load.image("snowForest", "./assets/backgrounds/snowForest.png");
    }

    create() {
        // create the tile backgrounds
        this.snowForest = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'snowForest').setOrigin(0, 0);

        // arrows
        this.rightArrow = this.add.image((game.config.width * 15) / 16, (game.config.height * 7) / 8, 'right_arrow').setScale(2);

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
        this.add.text((game.config.width * 12) / 16, ((game.config.height * 7) / 8) - (game.config.height / 32), 'Menu', menuConfig);

        // define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT) || Phaser.Input.Keyboard.JustDown(keyD)) {
            this.scene.start("menuScene");
        }

        // update the tile background
        this.snowForest.tilePositionX += 4;
      }
}