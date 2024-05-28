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
            fontSize: '64px',
            color: 'blue',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.controlsTitle = this.add.text(game.config.width / 2, game.config.height / 8, 'CONTROLS', menuConfig).setOrigin(0.5);
        menuConfig.color = 'black';
        menuConfig.fontSize = '32px';
        this.add.text(game.config.width / 2, (game.config.height * 3) / 8, 'Move up - W or ↑', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, (game.config.height * 4) / 8, 'Move down - D or ↓', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, (game.config.height * 5) / 8, 'Shoot - SPACE', menuConfig).setOrigin(0.5);
        this.add.text((game.config.width * 2) / 16, ((game.config.height * 7) / 8) - (game.config.height / 32), 'Menu', menuConfig);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        // sfx
        this.click = this.sound.add("click", {volume: 1});
    }

    update() {
        this.controlsTitle.y = game.config.height / 4 + (Math.sin(this.game.loop.frame * 0.04) * 20);
        if (Phaser.Input.Keyboard.JustDown(keyLEFT) || Phaser.Input.Keyboard.JustDown(keyA)) {
            this.scene.start("menuScene");
            this.click.play();
        }

        // update the tile background
        this.snowForest.tilePositionX += 4;
      }
}