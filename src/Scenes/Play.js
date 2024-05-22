class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // players/enemies
        this.load.image("snowman", "./assets/snowman.png");
        this.load.image("yeti1", "./assets/yeti1.png");
        this.load.image("yeti2", "./assets/yeti2.png");
        this.load.image("yeti3", "./assets/yeti3.png");

        // balls
        this.load.image("blue_ball", "./assets/blue_ball.png");
        this.load.image("red_ball", "./assets/red_ball.png");

        // background
        this.load.image("snowForest", "./assets/snowForest.png");
    }

    create() {
        gameover = false;
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
        this.add.text(game.config.width/2 + 100, game.config.height/2, 'Play', menuConfig).setOrigin(1.25);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // create the tile backgrounds
        this.snowForest = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'snowForest').setOrigin(0, 0);

        // add snowman player
        this.snowman = this.physics.add.sprite(game.config.width / 8, game.config.height / 2, 'snowman').setScale(4);
        this.snowman.setCollideWorldBounds(true);

        // add yeti enemy in a random position
        /*this.yeti = this.physics.add.group();
        this.yeti.enableBody = true;
        this.yeti.physicsBodyType = Phaser.Physics.ARCADE;

        for (let i = 0; i <= 2; i++) {
            this.randomRowPosition = Math.floor(Phaser.Math.Between(1, 7));
            this.randomColumnPosition = Math.floor(Phaser.Math.Between(5, 7));
            this.randomYeti = Phaser.Math.Between(1, 3);

            // random yeti pose
            if (this.randomYeti == 1) {
                this.randomYeti = 'yeti1';
            } else if (this.randomYeti == 2) {
                this.randomYeti = 'yeti2';
            } else {
                this.randomYeti = 'yeti3';
            }

            this.yeti.create((game.config.width * this.randomColumnPosition) / 8, (game.config.height * this.randomRowPosition) / 8, this.randomYeti).setScale(4);
        }*/

        this.randomRowPosition1 = Math.floor(Phaser.Math.Between(1, 7));
        this.randomRowPosition2 = Math.floor(Phaser.Math.Between(1, 7));
        this.randomRowPosition3 = Math.floor(Phaser.Math.Between(1, 7));
        this.randomColumnPosition1 = Math.floor(Phaser.Math.Between(5, 7));
        this.randomColumnPosition2 = Math.floor(Phaser.Math.Between(5, 7));
        this.randomColumnPosition3 = Math.floor(Phaser.Math.Between(5, 7));
        this.randomYeti1 = Phaser.Math.Between(1, 3);
        this.randomYeti2 = Phaser.Math.Between(1, 3);
        this.randomYeti3 = Phaser.Math.Between(1, 3);

        // random yeti pose
        if (this.randomYeti1 == 1) {
            this.randomYeti1 = 'yeti1';
        } else if (this.randomYeti1 == 2) {
            this.randomYeti1 = 'yeti2';
        } else {
            this.randomYeti1 = 'yeti3';
        }

        if (this.randomYeti2 == 1) {
            this.randomYeti2 = 'yeti1';
        } else if (this.randomYeti2 == 2) {
            this.randomYeti2 = 'yeti2';
        } else {
            this.randomYeti2 = 'yeti3';
        }

        if (this.randomYeti3 == 1) {
            this.randomYeti3 = 'yeti1';
        } else if (this.randomYeti3 == 2) {
            this.randomYeti3 = 'yeti2';
        } else {
            this.randomYeti3 = 'yeti3';
        }

        if (wave >= 1) {
            this.yeti1 = this.physics.add.sprite((game.config.width * this.randomColumnPosition1) / 8, (game.config.height * this.randomRowPosition1) / 8, this.randomYeti1).setScale(4);
        }
        if (wave >= 2) {
            this.yeti2 = this.physics.add.sprite((game.config.width * this.randomColumnPosition2) / 8, (game.config.height * this.randomRowPosition2) / 8, this.randomYeti2).setScale(4);
        }   
        if (wave >= 3) {
            this.yeti3 = this.physics.add.sprite((game.config.width * this.randomColumnPosition3) / 8, (game.config.height * this.randomRowPosition3) / 8, this.randomYeti3).setScale(4);
        }

        this.moveDirection1 = 1;
        this.moveDirection2 = 1;
        this.moveDirection3 = 1;

        // add balls
        /*this.blueBall = this.physics.add.group();
        this.blueBall.enableBody = true;
        this.blueBall.physicsBodyType = Phaser.Physics.ARCADE;*/

        this.blueBall = this.physics.add.sprite(this.snowman.x, this.snowman.y, 'blue_ball').setScale(0.25);
        this.blueBall.visible = false;

        this.firstShot = false;

        this.redBall = this.physics.add.group();
        this.redBall.enableBody = true;
        this.redBall.physicsBodyType = Phaser.Physics.ARCADE;

        this.time.addEvent({
            delay: 2000, // in milliseconds
            callback: this.enemyShoot,
            callbackScope: this,
            loop: true
          });

        // Add collision detection between snowman and red ball
        this.physics.add.collider(this.snowman, this.redBall, () => {
            this.snowman.destroy();
            gameover = true;
        });
    }

    update() {
        if (score == 1) {
            this.scene.start('nextwaveScene');
        } else if (score == 4) {
            this.scene.start('nextwaveScene');
        } else if (score == 8) {
            this.scene.start('menuScene');
        }
        // yeti enemies moving up and down the screen
        if (wave >= 1) {
            if (this.yeti1.y < game.config.height - 30) { // yeti1
                this.yeti1.y += (moveSpeed / 4) * this.moveDirection1;
                if (this.yeti1.y < 0 + 30) {
                    this.moveDirection1 *= -1;
                    this.yeti1.y += (moveSpeed / 4) * this.moveDirection1;
                }
            } else {
                this.moveDirection1 *= -1;
                this.yeti1.y -= (moveSpeed / 4);
            }

            // add collision detection between yeti and blue balls
            if (this.collides(this.yeti1, this.blueBall)) {
                this.yeti1.y += 10000; // remove from scene
                this.blueBall.visible = false;
                this.blueBall.x = this.snowman.x;
                score++;
            }
        }
        if (wave >= 2) {
            if (this.yeti2.y < game.config.height - 30) { // yeti2
                this.yeti2.y += (moveSpeed / 4) * this.moveDirection2;
                if (this.yeti2.y < 0 + 30) {
                    this.moveDirection2 *= -1;
                    this.yeti2.y += (moveSpeed / 4) * this.moveDirection2;
                }
            } else {
                this.moveDirection2 *= -1;
                this.yeti2.y -= (moveSpeed / 4);
            }

            if (this.collides(this.yeti2, this.blueBall)) {
                this.yeti2.y += 10000;
                this.blueBall.visible = false;
                this.blueBall.x = this.snowman.x;
                score++;
            }
        }
        if (wave >= 3) {
            if (this.yeti3.y < game.config.height - 30) { // yeti3
                this.yeti3.y += (moveSpeed / 4) * this.moveDirection3;
                if (this.yeti3.y < 0 + 30) {
                    this.moveDirection3 *= -1;
                    this.yeti3.y += (moveSpeed / 4) * this.moveDirection3;
                }
            } else {
                this.moveDirection3 *= -1;
                this.yeti3.y -= (moveSpeed / 4);
            }

            if (this.collides(this.yeti3, this.blueBall)) {
                this.yeti3.y += 10000;
                this.blueBall.visible = false;
                this.blueBall.x = this.snowman.x;
                score++;
            }
        }

        if (this.firstShot == true) {
            this.blueBall.x += moveSpeed;
        }

        if (this.blueBall.x > game.config.width - 20) {
            this.blueBall.visible = false;
            this.blueBall.x = this.snowman.x;
        }

        if (keyW.isDown) {
            if (this.snowman.y < game.config.height) {
                this.snowman.y -= moveSpeed;
            }
        }
        if (keyS.isDown) {
            if (this.snowman.y > 0) {
                this.snowman.y += moveSpeed;
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            /*this.blueBall.create(this.snowman.x, this.snowman.y, 'blue_ball').setScale(0.25);
            this.blueBall.setVelocityX(ballSpeed);*/
            this.blueBall.x = this.snowman.x;
            this.blueBall.y = this.snowman.y;
            this.blueBall.visible = true;
            this.firstShot = true;
        }
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
   
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start("gameoverScene");
        }

        // update the tile background
        this.snowForest.tilePositionX += 4;

        // game over logic
        if (gameover) {
            this.scene.start("gameoverScene");
        }
    }

    // A center-radius AABB collision check
    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

    enemyShoot() {
        if (wave >= 1) {
            this.redBall.create(this.yeti1.x, this.yeti1.y, 'red_ball').setScale(0.25);
        }
        if (wave >= 2) {
            this.redBall.create(this.yeti2.x, this.yeti2.y, 'red_ball').setScale(0.25);
        }
        if (wave >= 3) {
            this.redBall.create(this.yeti3.x, this.yeti3.y, 'red_ball').setScale(0.25);
        }
        this.redBall.setVelocityX(-ballSpeed); // shoot left direction
    }
}