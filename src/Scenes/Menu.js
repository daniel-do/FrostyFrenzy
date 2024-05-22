class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // background
        this.load.image("snowForest", "./assets/snowForest.png");
    }

    create() {
        // create the tile backgrounds
        this.snowForest = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'snowForest').setOrigin(0, 0);
        
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            backgroundColor: '#A020F0',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2, 'Frosty Frenzy', menuConfig).setOrigin(1.25);
        this.add.text(game.config.width/2 + 100, game.config.height/2, 'Menu', menuConfig).setOrigin(1.25);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
   
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start("controlsScene");
        }

        // update the tile background
        this.snowForest.tilePositionX += 4;
      }
}