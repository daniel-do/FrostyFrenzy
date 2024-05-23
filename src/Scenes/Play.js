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
        this.load.image("bat", "./assets/bat.png");
        this.load.image("ghost", "./assets/ghost.png");
        this.load.image("wizard", "./assets/wizard.png");
        this.load.image("spider", "./assets/spider.png");

        // balls
        this.load.image("blue_ball", "./assets/blue_ball.png");
        this.load.image("red_ball", "./assets/red_ball.png");
        this.load.image("boss_ball", "./assets/boss_ball.png");

        // background
        this.load.image("snowForest", "./assets/backgrounds/snowForest.png");
        this.load.image("grass", "./assets/backgrounds/grass.png");
        this.load.image("fall", "./assets/backgrounds/fall.png");
        this.load.image("desert", "./assets/backgrounds/desert.png");

        // tiny ski spritesheet
        this.load.spritesheet('tinyski', './assets/tilemap_packed.png', { frameWidth: 16, frameHeight: 16, startFrame: 0, endFrame: 132});
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
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        if (wave <= 3) {
            this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'snowForest').setOrigin(0, 0);
        } else if (wave <= 6) {
            this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'grass').setOrigin(0, 0);
            this.enemyType = 'bat';
        } else if (wave <= 9) {
            this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'fall').setOrigin(0, 0);
            this.enemyType = 'ghost';
        } else if (wave <= 10) {
            this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'desert').setOrigin(0, 0);
            this.enemyType = 'spider';
        }

        // add snowman player
        this.snowman = this.physics.add.sprite(game.config.width / 8, game.config.height / 2, 'snowman').setScale(4);
        this.snowman.setCollideWorldBounds(true);

        // add yeti enemies in a random position
        this.randomRowPosition1 = Math.floor(Phaser.Math.Between(1, 15));
        this.randomRowPosition2 = Math.floor(Phaser.Math.Between(1, 15));
        this.randomRowPosition3 = Math.floor(Phaser.Math.Between(1, 15));
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

        // create the tile backgrounds and add enemies
        if ((wave >= 1) && (wave < 4)) {
            this.yeti1 = this.physics.add.sprite((game.config.width * this.randomColumnPosition1) / 8, (game.config.height * this.randomRowPosition1) / 16, this.randomYeti1).setScale(4);
        }
        if ((wave >= 2) && (wave < 4)) {
            this.yeti2 = this.physics.add.sprite((game.config.width * this.randomColumnPosition2) / 8, (game.config.height * this.randomRowPosition2) / 16, this.randomYeti2).setScale(4);
        }   
        if ((wave >= 3) && (wave < 4)) {
            this.yeti3 = this.physics.add.sprite((game.config.width * this.randomColumnPosition3) / 8, (game.config.height * this.randomRowPosition3) / 16, this.randomYeti3).setScale(4);
        }
        if ((wave > 3) && (wave < 10)) {
            this.monster1 = this.physics.add.sprite((game.config.width * this.randomColumnPosition1) / 8, (game.config.height * this.randomRowPosition1) / 16, this.enemyType).setScale(4);
            this.monster2 = this.physics.add.sprite((game.config.width * this.randomColumnPosition2) / 8, (game.config.height * this.randomRowPosition2) / 16, this.enemyType).setScale(4);
            this.monster3 = this.physics.add.sprite((game.config.width * this.randomColumnPosition3) / 8, (game.config.height * this.randomRowPosition3) / 16, this.enemyType).setScale(4);
        }
        if (wave >= 10) {
            this.randomColumnPosition1 = Math.floor(Phaser.Math.Between(5, 6));
            this.randomColumnPosition2 = Math.floor(Phaser.Math.Between(5, 6));
            this.randomColumnPosition3 = Math.floor(Phaser.Math.Between(5, 6));

            this.monster1 = this.physics.add.sprite((game.config.width * this.randomColumnPosition1) / 8, (game.config.height * this.randomRowPosition1) / 16, this.enemyType).setScale(4);
            this.monster2 = this.physics.add.sprite((game.config.width * this.randomColumnPosition2) / 8, (game.config.height * this.randomRowPosition2) / 16, this.enemyType).setScale(4);
            this.monster3 = this.physics.add.sprite((game.config.width * this.randomColumnPosition3) / 8, (game.config.height * this.randomRowPosition3) / 16, this.enemyType).setScale(4);

            this.enemyType = 'wizard';
            this.boss = this.physics.add.sprite((game.config.width * 7) / 8, (game.config.height * this.randomRowPosition1) / 16, this.enemyType).setScale(4);
        }

        this.moveDirection1 = 1;
        this.moveDirection2 = 1;
        this.moveDirection3 = 1;
        this.moveDirectionBoss = 1;

        // add balls
        this.blueBall = this.physics.add.sprite(this.snowman.x, this.snowman.y, 'blue_ball').setScale(0.25);
        this.blueBall.visible = false;

        this.firstShot = false;

        this.redBall = this.physics.add.group();
        this.redBall.enableBody = true;
        this.redBall.physicsBodyType = Phaser.Physics.ARCADE;

        this.bossBall = this.physics.add.group();
        this.bossBall.enableBody = true;
        this.bossBall.physicsBodyType = Phaser.Physics.ARCADE;

        this.time.addEvent({
            delay: shootDelay, // in milliseconds
            callback: this.enemyShoot,
            callbackScope: this,
            loop: true
          });

        // collision detection between snowman and red ball
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
            this.scene.start('nextwaveScene');
        } else if (score == 12) {
            this.scene.start('nextwaveScene');
        } else if (score == 16) {
            this.scene.start('nextwaveScene');
        } else if (score == 20) {
            this.scene.start('nextwaveScene');
        } else if (score == 24) {
            this.scene.start('nextwaveScene');
        } else if (score == 28) {
            this.scene.start('nextwaveScene');
        } else if (score == 32) {
            this.scene.start('nextwaveScene');
        } else if (score == 37) {
            this.scene.start('nextwaveScene');
        }
        // yeti enemies moving up and down the screen
        if ((wave >= 1) && (wave < 4)) {
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
        if ((wave >= 2) && (wave < 4)) {
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
        if ((wave >= 3) && (wave < 4)) {
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
        if (wave > 3) {
            if (this.monster1.y < game.config.height - 30) { // monster1
                this.monster1.y += (moveSpeed / 4) * this.moveDirection1;
                if (this.monster1.y < 0 + 30) {
                    this.moveDirection1 *= -1;
                    this.monster1.y += (moveSpeed / 4) * this.moveDirection1;
                }
            } else {
                this.moveDirection1 *= -1;
                this.monster1.y -= (moveSpeed / 4);
            }

            if (this.collides(this.monster1, this.blueBall)) {
                this.monster1.y += 10000; // remove from scene
                this.blueBall.visible = false;
                this.blueBall.x = this.snowman.x;
                score++;
            }

            if (this.monster2.y < game.config.height - 30) { // monster2
                this.monster2.y += (moveSpeed / 4) * this.moveDirection2;
                if (this.monster2.y < 0 + 30) {
                    this.moveDirection2 *= -1;
                    this.monster2.y += (moveSpeed / 4) * this.moveDirection2;
                }
            } else {
                this.moveDirection2 *= -1;
                this.monster2.y -= (moveSpeed / 4);
            }

            if (this.collides(this.monster2, this.blueBall)) {
                this.monster2.y += 10000;
                this.blueBall.visible = false;
                this.blueBall.x = this.snowman.x;
                score++;
            }

            if (this.monster3.y < game.config.height - 30) { // monster3
                this.monster3.y += (moveSpeed / 4) * this.moveDirection3;
                if (this.monster3.y < 0 + 30) {
                    this.moveDirection3 *= -1;
                    this.monster3.y += (moveSpeed / 4) * this.moveDirection3;
                }
            } else {
                this.moveDirection3 *= -1;
                this.monster3.y -= (moveSpeed / 4);
            }

            if (this.collides(this.monster3, this.blueBall)) {
                this.monster3.y += 10000;
                this.blueBall.visible = false;
                this.blueBall.x = this.snowman.x;
                score++;
            }
        }
        if (wave >= 10) {
            if (this.boss.y < game.config.height - 30) { // boss
                this.boss.y += (moveSpeed / 2) * this.moveDirectionBoss;
                if (this.boss.y < 0 + 30) {
                    this.moveDirectionBoss *= -1;
                    this.boss.y += (moveSpeed / 2) * this.moveDirectionBoss;
                }
            } else {
                this.moveDirectionBoss *= -1;
                this.boss.y -= (moveSpeed / 2);
            }

            if (this.collides(this.boss, this.blueBall)) {
                this.boss.y += 10000;
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

        if (keyW.isDown || keyUP.isDown) {
            if (this.snowman.y < game.config.height) {
                this.snowman.y -= moveSpeed;
            }
        }
        if (keyS.isDown || keyDOWN.isDown) {
            if (this.snowman.y > 0) {
                this.snowman.y += moveSpeed;
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.blueBall.x = this.snowman.x;
            this.blueBall.y = this.snowman.y;
            this.blueBall.visible = true;
            this.firstShot = true;
        }

        // update the tile background
        this.background.tilePositionX += 4;

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
        if ((wave >= 1) && (wave < 4)) {
            this.redBall.create(this.yeti1.x, this.yeti1.y, 'red_ball').setScale(0.25);
        }
        if ((wave >= 2) && (wave < 4)) {
            this.redBall.create(this.yeti2.x, this.yeti2.y, 'red_ball').setScale(0.25);
        }
        if ((wave >= 3) && (wave < 4)) {
            this.redBall.create(this.yeti3.x, this.yeti3.y, 'red_ball').setScale(0.25);
        }
        if (wave > 3) {
            this.redBall.create(this.monster1.x, this.monster1.y, 'red_ball').setScale(0.25);
            this.redBall.create(this.monster2.x, this.monster2.y, 'red_ball').setScale(0.25);
            this.redBall.create(this.monster3.x, this.monster3.y, 'red_ball').setScale(0.25);
        }
        if (wave >= 10) {
            this.bossBall.create(this.boss.x, this.boss.y, 'boss_ball').setScale(0.25);
        }
        this.redBall.setVelocityX(-ballSpeed); // shoot left direction
        this.bossBall.setVelocityX(-ballSpeed); // shoot left direction
    }
}