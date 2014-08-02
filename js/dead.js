var deadState ={
    create: function(){
        game.add.image(0, 0, 'background');
        this.cursor = this.game.input.keyboard.createCursorKeys();
        var nameLabel = game.add.text(100, 100, 'Perdiste! Intenta otra vez!', {
            font: '70px Geo',
            fill: '#000000'
        });
        var nameLabel2 = game.add.text(250, 200, 'Apreta la flecha superior!', {
            font: '40px Geo',
            fill: '#000000'
        });
    },
    update: function(){
        if (this.cursor.up.isDown || game.input.activePointer.isDown)
			this.startMenu()
    },
    startMenu: function () {
        game.state.start('menu');
    },
}
