class NextWave extends Phaser.Scene {
    constructor() {
        super("nextwaveScene");
    }

    preload() {

    }

    create() {
        wave++;
        score++;
        console.log(wave);
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
        this.add.text(game.config.width/2 + 100, game.config.height/2, 'Next Wave', menuConfig).setOrigin(1.25);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
   
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start("playScene");
        }
      }
}