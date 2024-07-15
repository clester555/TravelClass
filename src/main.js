import { GameScene } from "./scenes/gameScene/GameScene.js";




const app = new Phaser.Game({
    type: Phaser.CANVAS,
    pixelArt: false,
    scale: {
        parent: 'app-container',
        width: 1028,
        height: 576,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#000000'

});

app.scene.add('game-scene',GameScene);

app.scene.start('game-scene');
