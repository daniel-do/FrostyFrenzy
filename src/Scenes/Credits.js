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
            fontSize: '64px',
            color: 'green',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.creditsTitle = this.add.text(game.config.width / 2, game.config.height / 8, 'CREDITS', menuConfig).setOrigin(0.5);
        menuConfig.color = 'black';
        menuConfig.fontSize = '32px';
        this.add.text(game.config.width / 2, (game.config.height * 3) / 8, 'Development, Design - Daniel Do', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, (game.config.height * 4) / 8, 'Art, Sound Effects - Kenney (https://kenney.nl/)', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, (game.config.height * 5) / 8, 'Music - "Snowball Fight" by Hyper Potions', menuConfig).setOrigin(0.5);
        this.add.text((game.config.width * 12) / 16, ((game.config.height * 7) / 8) - (game.config.height / 32), 'Menu', menuConfig);

        // define keys
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // sfx
        this.click = this.sound.add("click", {volume: 1});
    }

    update() {
        this.creditsTitle.y = game.config.height / 4 + (Math.sin(this.game.loop.frame * 0.04) * 20);
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT) || Phaser.Input.Keyboard.JustDown(keyD)) {
            this.scene.start("menuScene");
            this.click.play();
        }

        // update the tile background
        this.snowForest.tilePositionX += 4;
      }
}