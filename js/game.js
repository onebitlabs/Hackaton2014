var game = new Phaser.Game(960, 552, Phaser.AUTO, 'gameDiv');
game.global = {
    score: 0
};
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('play2', playState2);
game.state.add('play3', playState3);
game.state.add('dead', deadState);

game.state.start('boot');
