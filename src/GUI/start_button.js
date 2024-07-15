export class StartButton{
    #scene;
    #button;
    #text;
    #string = 'Start';
    #left = 512;
    #top = 440;

    constructor(scene){
        this.#scene = scene;
        this.#button = this.#scene.add.image(this.#left,this.#top,'downButton').setOrigin(.5).setScale(.9,.5);
        this.#button.setInteractive({ useHandCursor: true });
        this.#button.on('pointerover', () => {
            this.#button.setTexture('upButton');
        });

        this.#button.on('pointerout', () => {
            this.#button.setTexture('downButton');
        }); 
   
        this.#button.on('pointerdown', () =>{
            this.#scene.begin();
        });
        
        this.#text = this.#scene.add.text(
            this.#left,
            this.#top,
            this.#string,
            {
                color: '#ffffff',
                fontSize: '28px'
            }
            ).setOrigin(0.5,0.5);
    }

    setVisible(visible){
        this.#button.setVisible(visible);
        this.#text.setVisible(visible);
    }

}