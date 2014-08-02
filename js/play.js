
var playState = {
    
    create: function () {
        this.tileHits1 = [];
        this.tileHits2 = [];
        this.tileHits3 = [];
        this.tileHits4 = [];
        this.tileHits5 = [];
        this.tileHits6 = [];
        this.tileHits7 = [];
        this.tileHits8 = [];
        
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursor = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP,Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT,Phaser.Keyboard.RIGHT]);
        this.wasd = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D)
        };
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        game.global.score = 0;
        this.line1 = new Phaser.Line();
        this.line2 = new Phaser.Line();
        this.line3 = new Phaser.Line();
        this.line4 = new Phaser.Line();
        this.line5 = new Phaser.Line();
        this.line6 = new Phaser.Line();
        this.line7 = new Phaser.Line();
        this.line8 = new Phaser.Line();
        
        this.createWorld();
        if (!game.device.desktop) {
            this.addMobileInputs();
        }
        this.player = game.add.sprite(game.world.centerX, game.world.centerY,
            'player');
        game.physics.arcade.enable(this.player);
        this.player.anchor.setTo(0.5, 0.5);
        this.player.body.gravity.y = 0;
        this.player.animations.add('right', [0, 1], 8);
        this.player.animations.add('up', [6,7], 8);
        this.player.animations.add('down', [4,5], 8);
        this.player.animations.add('left', [2,3], 8);
        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        this.enemies.createMultiple(10, 'enemy');
        this.coin = game.add.sprite(60, 140, 'coin');
        game.physics.arcade.enable(this.coin);
        this.coin.anchor.setTo(0.5, 0.5);
        this.scoreLabel = game.add.text(30, 30, 'score: 0', {
            font: '18px Arial',
            fill: '#ffffff'
        });
        this.emitter = game.add.emitter(0, 0, 15);
        this.emitter.makeParticles('pixel');
        this.emitter.setYSpeed(-150, 150);
        this.emitter.setXSpeed(-150, 150);
        this.emitter.gravity = 0;
        this.jumpSound = game.add.audio('jump');
        this.coinSound = game.add.audio('coin');
        this.deadSound = game.add.audio('dead');
        this.nextEnemy = 0;
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
//        if (this.nextEnemy < game.time.now) {
//            var start = 4000,
//                end = 1000,
//                score = 100;
//            var delay = Math.max(start -
//                (start - end) * game.global.score / score, end);
//            this.addEnemy();
//            this.nextEnemy = game.time.now + delay;
//        }
    },
    
    movePlayer: function () {
        this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;
        
        var speed = 230;
        
        if ((this.cursor.left.isDown || this.wasd.left.isDown)&&(!this.blockedleft)) {
            if (this.tween) this.player.body.velocity.x = -50;
        	else {
                this.player.body.velocity.x = -speed;
                this.player.animations.play('left');
            }
            
        } else if ((this.cursor.right.isDown || this.wasd.right.isDown)&&(!this.blockedright)) {
            if (this.tween) this.player.body.velocity.x = 50;
        	else {
                this.player.body.velocity.x = speed;
                this.player.animations.play('right');
            }
        } else if ((this.cursor.up.isDown || this.wasd.up.isDown)&&(!this.blockedup)) {
            if (this.tween) this.player.body.velocity.y = -50;
        	else {
                this.player.body.velocity.y = -speed;
                this.player.animations.play('up');
            }
        } else if ((this.cursor.down.isDown || this.wasd.down.isDown)&&(!this.blockeddown)){
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
        if(this.spaceKey.isDown){
            game.add.tween(this.player.scale).to({
            x: 1.3,
            y: 1.3
        }, 50)
            .to({
                x: 1,
                y: 1
            }, 150).start();
            this.line1.start.set(this.player.x, this.player.y);
            this.line1.end.set(this.player.x-40, this.player.y);
            this.tileHits1 = this.layer.getRayCastTiles(this.line1, 4, true, false);
            if (this.tileHits1.length > 0)
            {
                //  Just so we can visually see the tiles
                this.fillLoop(-40,0)
                for (var i = 0; i < this.tileHits1.length; i++)
                {
                    this.tileHits1[i].debug = true;
                    console.warn(1);
                }

                this.layer.dirty = true;
            }
            ////
            this.line2.start.set(this.player.x, this.player.y);
            this.line2.end.set(this.player.x+40, this.player.y);
            this.tileHits2 = this.layer.getRayCastTiles(this.line2, 4, true, false);
            if (this.tileHits2.length > 0)
            {
                //  Just so we can visually see the tiles
                this.fillLoop(40,0)
                for (var i = 0; i < this.tileHits2.length; i++)
                {
                    this.tileHits2[i].debug = true;
                }

                this.layer.dirty = true;
            }
            ///
            this.line3.start.set(this.player.x, this.player.y);
            this.line3.end.set(this.player.x, this.player.y-46);
            this.tileHits3 = this.layer.getRayCastTiles(this.line3, 4, true, false);
            if (this.tileHits3.length > 0)
            {
                //  Just so we can visually see the tiles
                this.fillLoop(0,-46)
                for (var i = 0; i < this.tileHits3.length; i++)
                {
                    this.tileHits3[i].debug = true;
                }

                this.layer.dirty = true;
            }
            ///
            this.line4.start.set(this.player.x, this.player.y);
            this.line4.end.set(this.player.x, this.player.y+46);
            this.tileHits4 = this.layer.getRayCastTiles(this.line4, 4, true, false);
            if (this.tileHits4.length > 0)
            {
                //  Just so we can visually see the tiles
                this.fillLoop(0,+46)
                for (var i = 0; i < this.tileHits4.length; i++)
                {
                    this.tileHits4[i].debug = true;
                }

                this.layer.dirty = true;
            }
            ///
            this.line5.start.set(this.player.x, this.player.y);
            this.line5.end.set(this.player.x+40, this.player.y+46);
            this.tileHits5 = this.layer.getRayCastTiles(this.line5, 4, true, false);
            if (this.tileHits5.length > 0)
            {
                //  Just so we can visually see the tiles
                this.fillLoop(40,0,0,46);
                this.fillLoop(0,-46,0,-46);
                for (var i = 0; i < this.tileHits5.length; i++)
                {
                    this.tileHits5[i].debug = true;
                }

                this.layer.dirty = true;
            }
            ///
            this.line6.start.set(this.player.x, this.player.y);
            this.line6.end.set(this.player.x+40, this.player.y-46);
            this.tileHits6 = this.layer.getRayCastTiles(this.line6, 4, true, false);
            if (this.tileHits6.length > 0)
            {
                //  Just so we can visually see the tiles
                
                this.fillLoop(40,0,0,-46);
                this.fillLoop(0,-46,40,0);
                
                for (var i = 0; i < this.tileHits6.length; i++)
                {
                    this.tileHits6[i].debug = true;
                }

                this.layer.dirty = true;
            }
            ///
            this.line7.start.set(this.player.x, this.player.y);
            this.line7.end.set(this.player.x-40, this.player.y-46);
            this.tileHits7 = this.layer.getRayCastTiles(this.line7, 4, true, false);
            if (this.tileHits7.length > 0)
            {
                //  Just so we can visually see the tiles
                this.fillLoop(-40,0,0,-46);
                this.fillLoop(0,-46,-40,0);
                for (var i = 0; i < this.tileHits7.length; i++)
                {
                    this.tileHits7[i].debug = true;
                }

                this.layer.dirty = true;
            }
            ///
            ///
            this.line8.start.set(this.player.x, this.player.y);
            this.line8.end.set(this.player.x-40, this.player.y+46);
            this.tileHits8 = this.layer.getRayCastTiles(this.line8, 4, true, false);
            if (this.tileHits8.length > 0)
            {
                //  Just so we can visually see the tiles
                this.fillLoop(-40,0,0,46);
                this.fillLoop(0,46,-40,0);
                for (var i = 0; i < this.tileHits8.length; i++)
                {
                    this.tileHits8[i].debug = true;
                }

                this.layer.dirty = true;
            }

        }
        
    },
    fillLoop: function(x1,y1,xsuma,ysuma){
        var valor=true,io=2;
        var lineN = new Phaser.Line();
        if(!xsuma)xsuma=0;
        if(!ysuma)ysuma=0;
        while(valor){
            var tileHitsN = [];
            if (tileHitsN.length > 0)
                {
                    for (var i = 0; i < tileHitsN.length; i++)
                    {
                        tileHitsN[i].debug = false;
                    }
                    this.layer.dirty = true;
                }
                lineN.start.set(xsuma+this.player.x+(x1*(io-1)), ysuma+this.player.y+(y1*(io-1)));
                lineN.end.set(xsuma+this.player.x+(x1*io), ysuma+this.player.y+(y1*io));
                tileHitsN = this.layer.getRayCastTiles(lineN, 4, true, false);
                if (tileHitsN.length > 1)
                {   
                    for (var i = 0; i < tileHitsN.length; i++)
                    {
                        tileHitsN[i].debug = true;
                    }

                    this.layer.dirty = true;
                    io++;
                }
                else{
                    valor= false;
                }
        }
            
    
    },
    checkTiles: function(){
        console.warn(this.player.body.blocked);
        if(this.player.body.blocked.down){
            console.warn('true');
            this.blockeddown=true;
        } 
        if(!this.player.body.blocked.down){
            this.blockeddown=false;
        }    
        if(this.player.body.blocked.up){
            this.blockedup = true;
        }
        if(this.player.body.blocked.left){
            this.blockedleft= true;
        }
        if(this.player.body.blocked.right){
            this.blockedright = true;
        }
        if(!this.blockeddown){
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
    takeCoin: function (player, coin) {
        game.global.score += 5;
        this.scoreLabel.text = 'score: ' + game.global.score;
        this.updateCoinPosition();
        this.coinSound.play();
        game.add.tween(this.player.scale).to({
            x: 1.3,
            y: 1.3
        }, 50)
            .to({
                x: 1,
                y: 1
            }, 150).start();
        this.coin.scale.setTo(0, 0);
        game.add.tween(this.coin.scale).to({
            x: 1,
            y: 1
        }, 300).start();
    },
    updateCoinPosition: function () {
        var coinPosition = [
            {
                x: 140,
                y: 60
            }, {
                x: 360,
                y: 60
            },
            {
                x: 60,
                y: 140
            }, {
                x: 440,
                y: 140
            },
            {
                x: 130,
                y: 300
            }, {
                x: 370,
                y: 300
            }
];
        for (var i = 0; i < coinPosition.length; i++) {
            if (coinPosition[i].x === this.coin.x) {
                coinPosition.splice(i, 1);
            }
        }
        var newPosition = coinPosition[game.rnd.integerInRange(0,
            coinPosition.length - 1)];
        this.coin.reset(newPosition.x, newPosition.y);
    },
    playerDie: function () {
        if (!this.player.alive) {
            return;
        }
        this.player.kill();
        this.deadSound.play();
        this.emitter.x = this.player.x;
        this.emitter.y = this.player.y;
        this.emitter.start(true, 600, null, 15);
        game.time.events.add(1000, this.startMenu, this);
    },
    startMenu: function () {
        game.state.start('menu');
    },
    createWorld: function () {
        this.map = game.add.tilemap('map');
        this.map.addTilesetImage('tileset');
        this.layer = this.map.createLayer('Tile Layer 1');
        this.layer.resizeWorld();
        this.map.setCollision(1);
        this.layer.debug = true;
    }
};
