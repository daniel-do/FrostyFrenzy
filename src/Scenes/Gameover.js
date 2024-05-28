class Gameover extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }

    preload() {
        // background
        this.load.image("castles", "./assets/backgrounds/castles.png");
    }

    create() {
        // create the tile backgrounds
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'castles').setOrigin(0, 0);

        this.keyboardSpace = this.add.image(game.config.width / 2, (game.config.height * 7) / 8, 'keyboard_space').setScale(2);

        // menu text configuration
        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '64px',
            color: 'red',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width / 2, game.config.height / 4, 'GAME OVER', menuConfig).setOrigin(0.5);
        menuConfig.color = 'black';
        menuConfig.fontSize = '32px';
        this.add.text(game.config.width / 2, game.config.height / 2, 'Score: ' + score, menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, ((game.config.height * 6) / 8) - (game.config.height / 32), 'Main Menu', menuConfig).setOrigin(0.5);

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            score = 0;
            wave = 1;
            shootDelay = 3000;
            lives = 3;
            this.scene.start("menuScene")
        }
      }
}