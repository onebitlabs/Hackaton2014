var loadState = {
    preload: function () {
        var loadingLabel = game.add.text(game.world.centerX, 150, 'loading...', {
            font: '30px Arial',
            fill: '#ffffff'
        });
        loadingLabel.anchor.setTo(0.5, 0.5);
        var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);
        game.load.spritesheet('player', 'assets/sprite-pedritos-horizontal.png', 40, 46);
        game.load.image('enemy', 'assets/enemy.png');
        game.load.image('coin', 'assets/coin.png');
        game.load.image('pixel', 'assets/pixel.png');
        game.load.image('background', 'assets/background.jpg');
        game.load.image('backgroundStart', 'assets/backgroundStart.jpg');
        game.load.image('illimani', 'assets/illimani.jpg');
        game.load.spritesheet('mute', 'assets/muteButton.png', 28, 22);
        game.load.image('jumpButton', 'assets/jumpButton.png');
        game.load.image('rightButton', 'assets/rightButton.png');
        game.load.image('leftButton', 'assets/leftButton.png');
        game.load.audio('jump', ['assets/jump.ogg', 'assets/jump.mp3']);
        game.load.audio('burn', ['assets/burn.wav']);
        game.load.audio('backMusic', 'assets/cholaBandida.mp3');
        game.load.audio('dead', ['assets/dead.ogg', 'assets/dead.mp3']);
        game.load.image('tileset', 'assets/tileset.png');
        game.load.tilemap('map3', 'assets/map3.json', null,Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map', 'assets/map.json', null,Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map01', 'assets/map01.json', null,Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map02', 'assets/map02.json', null,Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map03', 'assets/map02.json', null,Phaser.Tilemap.TILED_JSON);
    },
    create: function () {
        game.state.start('menu');
    }
};
