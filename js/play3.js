var playState3 = {

    create: function () {
        //illimani
        //game.add.image(0, 0, 'illimani');
        this.tileHits1 = [];
        this.tileHits2 = [];
        this.tileHits3 = [];
        this.tileHits4 = [];
        this.tileHits5 = [];
        this.tileHits6 = [];
        this.tileHits7 = [];
        this.tileHits8 = [];
        this.tileHitsG = [];
        this.Gcounter = 0;

        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursor = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);
        this.wasd = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D)
        };
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(this.checkLives, this); //this.burnSound.play();
        game.global.movesLeft = [4];
        this.winLvl = [59];
        this.line1 = new Phaser.Line();
        this.line2 = new Phaser.Line();
        this.line3 = new Phaser.Line();
        this.line4 = new Phaser.Line();
        this.line5 = new Phaser.Line();
        this.line6 = new Phaser.Line();
        this.line7 = new Phaser.Line();
        this.line8 = new Phaser.Line();

        this.createWorld('map');
        if (!game.device.desktop) {
            this.addMobileInputs();
        }
        this.player = game.add.sprite(game.world.centerX, game.world.centerY,
            'player');
        //this.initWallDebug();
        game.physics.arcade.enable(this.player);
        this.player.anchor.setTo(0.5, 0.5);
        this.player.body.gravity.y = 0;
        this.player.animations.add('right', [0, 1], 8);
        this.player.animations.add('up', [6, 7], 8);
        this.player.animations.add('down', [4, 5], 8);
        this.player.animations.add('left', [2, 3], 8);
        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        this.enemies.createMultiple(10, 'enemy');
        //        this.coin = game.add.sprite(60, 140, 'coin');
        //        game.physics.arcade.enable(this.coin);
        //        this.coin.anchor.setTo(0.5, 0.5);
        this.movesLabel = game.add.text(40, 20, 'Movimientos Disponibles: ' + game.global.movesLeft[0], {
            font: '18px Arial',
            fill: '#ffffff'
        });
        this.emitter = game.add.emitter(0, 0, 15);
        this.emitter.makeParticles('pixel');
        this.emitter.setYSpeed(-150, 150);
        this.emitter.setXSpeed(-150, 150);
        this.emitter.gravity = 0;
        this.jumpSound = game.add.audio('jump');
        this.burnSound = game.add.audio('burn');
        this.deadSound = game.add.audio('dead');
        this.backMusic = game.add.audio('backMusic');
        this.backMusic.loop = true;
        this.backMusic.play();
        this.nextEnemy = 0;
        //game.stage.backgroundColor = '#ecf0f1';
    },
    update: function () {
        game.physics.arcade.overlap(this.player, this.enemies, this.playerDie,
            null, this);
        game.physics.arcade.overlap(this.player, this.coin, this.takeCoin,
            null, this);
        game.physics.arcade.collide(this.player, this.layer);
        //game.physics.arcade.collide(this.enemies, this.layer);
        if (!this.player.inWorld) {
            this.playerDie();
        }
        this.movePlayer();
    },

    movePlayer: function () {
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

        var speed = 230;

        if ((this.cursor.left.isDown || this.wasd.left.isDown) && (!this.blockedleft)) {
            if (this.tween) this.player.body.velocity.x = -50;
            else {
                this.player.body.velocity.x = -speed;
                this.player.animations.play('left');
            }

        } else if ((this.cursor.right.isDown || this.wasd.right.isDown) && (!this.blockedright)) {
            if (this.tween) this.player.body.velocity.x = 50;
            else {
                this.player.body.velocity.x = speed;
                this.player.animations.play('right');
            }
        } else if ((this.cursor.up.isDown || this.wasd.up.isDown) && (!this.blockedup)) {
            if (this.tween) this.player.body.velocity.y = -50;
            else {
                this.player.body.velocity.y = -speed;
                this.player.animations.play('up');
            }
        } else if ((this.cursor.down.isDown || this.wasd.down.isDown) && (!this.blockeddown)) {
            if (this.tween) this.player.body.velocity.y = 50;
            else {
                this.player.body.velocity.y = speed;
                this.player.animations.play('down');
            }
        } else {
            this.player.body.velocity.x = 0;
            this.player.animations.stop();
            this.player.frame = 0;
            isMoving = false;

        }
        if (this.spaceKey.isDown) {
            game.add.tween(this.player.scale).to({
                x: 1.3,
                y: 1.3
            }, 50)
                .to({
                    x: 1,
                    y: 1
                }, 150).start();
            this.line1.start.set(this.player.x, this.player.y);
            this.line1.end.set(this.player.x - 40, this.player.y);
            this.tileHits1 = this.layer.getRayCastTiles(this.line1, 4, true, false);
            if (this.tileHits1.length > 0) {
                //  Just so we can visually see the tiles
                this.map.fill(2, this.layer.getTileX(this.player.x - 40), this.layer.getTileY(this.player.y), 1, 1);
                this.fillLoop(-40, 0);
                for (var i = 0; i < this.tileHits1.length; i++) {
                    //this.tileHits1[i].debug = true;
                }
                //this.layer.dirty = true;
            }
            ////
            this.line2.start.set(this.player.x, this.player.y);
            this.line2.end.set(this.player.x + 40, this.player.y);
            this.tileHits2 = this.layer.getRayCastTiles(this.line2, 4, true, false);
            if (this.tileHits2.length > 0) {
                //  Just so we can visually see the tiles
                this.map.fill(2, this.layer.getTileX(this.player.x + 40), this.layer.getTileY(this.player.y), 1, 1);
                this.fillLoop(40, 0)
                for (var i = 0; i < this.tileHits2.length; i++) {
                    //this.tileHits2[i].debug = true;
                }

                //this.layer.dirty = true;
            }
            ///
            this.line3.start.set(this.player.x, this.player.y);
            this.line3.end.set(this.player.x, this.player.y - 46);
            this.tileHits3 = this.layer.getRayCastTiles(this.line3, 4, true, false);
            if (this.tileHits3.length > 0) {
                //  Just so we can visually see the tiles
                this.map.fill(2, this.layer.getTileX(this.player.x), this.layer.getTileY(this.player.y - 46), 1, 1);
                this.fillLoop(0, -46)
                for (var i = 0; i < this.tileHits3.length; i++) {
                    //this.tileHits3[i].debug = true;
                }

                //this.layer.dirty = true;
            }
            ///
            this.line4.start.set(this.player.x, this.player.y);
            this.line4.end.set(this.player.x, this.player.y + 46);
            this.tileHits4 = this.layer.getRayCastTiles(this.line4, 4, true, false);
            if (this.tileHits4.length > 0) {
                //  Just so we can visually see the tiles
                this.map.fill(2, this.layer.getTileX(this.player.x), this.layer.getTileY(this.player.y + 46), 1, 1);
                this.fillLoop(0, +46)
                for (var i = 0; i < this.tileHits4.length; i++) {
                    //this.tileHits4[i].debug = true;
                }

                //this.layer.dirty = true;
            }
            ///
            this.line5.start.set(this.player.x, this.player.y);
            this.line5.end.set(this.player.x + 40, this.player.y + 46);
            this.tileHits5 = this.layer.getRayCastTiles(this.line5, 4, true, false);
            if (this.tileHits5.length > 0) {
                //  Just so we can visually see the tiles
                this.map.fill(2, this.layer.getTileX(this.player.x + 40), this.layer.getTileY(this.player.y + 46), 1, 1);
                this.fillLoop(40, 0, 0, 46);
                this.fillLoop(0, 46, 40, -46);
                for (var i = 0; i < this.tileHits5.length; i++) {
                    //this.tileHits5[i].debug = true;
                }

                //this.layer.dirty = true;
            }
            ///
            this.line6.start.set(this.player.x, this.player.y);
            this.line6.end.set(this.player.x + 40, this.player.y - 46);
            this.tileHits6 = this.layer.getRayCastTiles(this.line6, 4, true, false);
            if (this.tileHits6.length > 0) {
                //  Just so we can visually see the tiles
                this.map.fill(2, this.layer.getTileX(this.player.x + 40), this.layer.getTileY(this.player.y - 46), 1, 1);
                this.fillLoop(40, 0, 0, -46);
                this.fillLoop(0, -46, 40, 0);

                for (var i = 0; i < this.tileHits6.length; i++) {
                    //this.tileHits6[i].debug = true;
                }

                //this.layer.dirty = true;
            }
            ///
            this.line7.start.set(this.player.x, this.player.y);
            this.line7.end.set(this.player.x - 40, this.player.y - 46);
            this.tileHits7 = this.layer.getRayCastTiles(this.line7, 4, true, false);
            if (this.tileHits7.length > 0) {
                //  Just so we can visually see the tiles
                this.map.fill(2, this.layer.getTileX(this.player.x - 40), this.layer.getTileY(this.player.y - 46), 1, 1);
                this.fillLoop(-40, 0, 0, -46);
                this.fillLoop(0, -46, -40, 0);
                for (var i = 0; i < this.tileHits7.length; i++) {
                    //this.tileHits7[i].debug = true;
                }

                //this.layer.dirty = true;
            }
            ///
            ///
            this.line8.start.set(this.player.x, this.player.y);
            this.line8.end.set(this.player.x - 40, this.player.y + 46);
            this.tileHits8 = this.layer.getRayCastTiles(this.line8, 4, true, false);
            if (this.tileHits8.length > 0) {
                //  Just so we can visually see the tiles
                this.map.fill(2, this.layer.getTileX(this.player.x - 40), this.layer.getTileY(this.player.y + 46), 1, 1);
                this.fillLoop(-40, 0, 0, 46);
                this.fillLoop(0, 46, -40, 0);
                for (var i = 0; i < this.tileHits8.length; i++) {
                    //this.tileHits8[i].debug = true;
                }

                //this.layer.dirty = true;
            }

        }

    },
    checkLives: function () {
        game.global.movesLeft[0]--;
        this.burnSound.play();
        this.movesLabel.text = 'Movimientos Disponibles: ' + game.global.movesLeft[0];
        if (!game.global.movesLeft[0]) {
            this.checkDebugTiles(0);
        }
    },
    initWallDebug: function () {
        this.player.x = 20;
        this.player.y = 23;
        console.warn(this.map);
        console.warn(this.tilemap);
        var a = this.map.getTile(20, 23);
        a.debug = true;
        this.fillLoop(40, 0);
        this.fillLoop(0, 46);
        this.player.x = game.world.centerX;
        this.player.x = game.world.centerY;
    },
    checkDebugTiles: function (lvl) {
        //console.warn(this.Gcounter);
        if (this.Gcounter > this.winLvl[lvl]) {
            this.createWorld('map02');
        } else {
            this.playerDie();
        }
    },
    fillLoop: function (x1, y1, xsuma, ysuma) {
        var valor = true,
            io = 2;
        var lineN = new Phaser.Line();
        if (!xsuma) xsuma = 0;
        if (!ysuma) ysuma = 0;
        while (valor) {
            var tileHitsN = [];
            if (tileHitsN.length > 0) {
                for (var i = 0; i < tileHitsN.length; i++) {
                    //tileHitsN[i].debug = false;
                }
                //this.layer.dirty = true;
            }
            lineN.start.set(xsuma + this.player.x + (x1 * (io - 1)), ysuma + this.player.y + (y1 * (io - 1)));
            lineN.end.set(xsuma + this.player.x + (x1 * io), ysuma + this.player.y + (y1 * io));
            tileHitsN = this.layer.getRayCastTiles(lineN, 4, true, false);
            if (tileHitsN.length > 1) {

                for (var i = 0; i < tileHitsN.length; i++) {
                    if (!tileHitsN[i].debug) {
                        //tileHitsN[i].debug = true;
                        this.Gcounter++;
                        this.map.fill(2, this.layer.getTileX(xsuma + this.player.x + (x1 * io)),
                            this.layer.getTileY(ysuma + this.player.y + (y1 * io)), 1, 1);

                    }

                }

                this.layer.dirty = true;
                io++;
            } else {
                valor = false;
            }
        }


    },
    checkTiles: function () {
        console.warn(this.player.body.blocked);
        if (this.player.body.blocked.down) {
            console.warn('true');
            this.blockeddown = true;
        }
        if (!this.player.body.blocked.down) {
            this.blockeddown = false;
        }
        if (this.player.body.blocked.up) {
            this.blockedup = true;
        }
        if (this.player.body.blocked.left) {
            this.blockedleft = true;
        }
        if (this.player.body.blocked.right) {
            this.blockedright = true;
        }
        if (!this.blockeddown) {
            //console.warn('noBlockedDown');
            //this.blockeddown=false;
        }
    },
    addEnemy: function () {
        var enemy = this.enemies.getFirstDead();
        if (!enemy) {
            return;
        }
        enemy.anchor.setTo(0.5, 1);
        enemy.reset(game.world.centerX, 0);
        enemy.body.gravity.y = 500;
        enemy.body.bounce.x = 1;
        enemy.body.velocity.x = 100 * Phaser.Math.randomSign();
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
    },
    playerDie: function () {
        if (!this.player.alive) {
            return;
        }
        this.player.kill();
        this.deadSound.play();
        this.backMusic.stop();
        this.emitter.x = this.player.x;
        this.emitter.y = this.player.y;
        this.emitter.start(true, 600, null, 15);
        game.state.start('dead');
    },

    createWorld: function (theMap) {
        this.map = game.add.tilemap(theMap);
        this.map.addTilesetImage('tileset');
        this.layer = this.map.createLayer('Tile Layer 1');
        this.layer.resizeWorld();
        this.map.setCollision(1);
    }
};
