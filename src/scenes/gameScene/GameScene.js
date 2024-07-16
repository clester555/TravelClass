import { StartButton } from "../../GUI/start_button.js";

export class GameScene extends Phaser.Scene {
  
    #startButton;
    #timerRunning = false;
    #seconds = 30;
    #mSeconds = 0;
    #currentQuestion = 0;
    #currentAnswer = 0;
    #score = 0;

    #questionList = ['africaSound',
                        'antarticaSound',
                        'asiaSound',
                        'australiaSound',
                        'europeSound',
                        'northAmericaSound',
                        'southAmericaSound',
                        'america',
                        'argentina',
                        'theUK',
                        'egypt',
                        'kangaroos',
                        'indonesia',
                        'coldest',
                        'biggest',
                        'chocalate',
                        'giraffes'
                    ];


    constructor(){
        super({key:'game-scene'});
    }

    preload(){
        //this.load.image('BGimage','assets/images/login-gui-bg.png');
        this.load.image('upButton','assets/images/purple-rect-button-up.png');
        this.load.image('downButton','assets/images/purple-rect-button-down.png');
        this.load.image('worldMap','assets/images/world.jpg');
        this.load.image('gbl','assets/images/green_button_lit.png');
        this.load.image('greenButton','assets/images/green_button.png');
        this.load.image('africaMap','assets/images/africa.jpg');
        this.load.image('antarticaMap','assets/images/antartica.jpg');
        this.load.image('asiaMap','assets/images/asia.jpg');
        this.load.image('australiaMap','assets/images/australia.jpg');
        this.load.image('europeMap','assets/images/europe.jpg');
        this.load.image('northAmericaMap','assets/images/north_america.jpg');
        this.load.image('southAmericaMap','assets/images/south_america.jpg');
       
        this.load.audio('africaSound','assets/sounds/africa.mp3');
        this.load.audio('antarticaSound','assets/sounds/antartica.mp3'); 
        this.load.audio('asiaSound','assets/sounds/asia.mp3');
        this.load.audio('australiaSound','assets/sounds/australia.mp3'); 
        this.load.audio('europeSound','assets/sounds/europe.mp3');
        this.load.audio('northAmericaSound','assets/sounds/north_america.mp3'); 
        this.load.audio('southAmericaSound','assets/sounds/south_america.mp3');


        this.load.audio('america','assets/sounds/america.mp3');
        this.load.audio('theUK','assets/sounds/UK.mp3');
        this.load.audio('egypt','assets/sounds/egypt.mp3');
        this.load.audio('indonesia','assets/sounds/indonesia.mp3');
        this.load.audio('argentina','assets/sounds/argentina.mp3');

        this.load.audio('kangaroos','assets/sounds/kangaroos.mp3');
        this.load.audio('giraffes','assets/sounds/giraffes.mp3');
        this.load.audio('chocalate','assets/sounds/chocolate.mp3');
        this.load.audio('pyramids','assets/sounds/pyramids.mp3');
        this.load.audio('pumpkins','assets/sounds/pumpkins.mp3');
        this.load.audio('greatWall','assets/sounds/greatWall.mp3');
        this.load.audio('coldest','assets/sounds/coldest.mp3');
        this.load.audio('biggest','assets/sounds/biggest.mp3');


        this.load.audio('buzz','assets/sounds/buzz.wav');
        this.load.audio('ding','assets/sounds/ding.wav');
       
    }

    create(){
        this.map = this.add.image(512,280,'worldMap').setOrigin(0.5,0.5).setScale(.8,.8);
        this.makeButtons();
        this.showButtons(false);
        this.#startButton = new StartButton(this);

        this.timer = this.add.text(
            50,
            50,
            this.#seconds.toString(),
            {
                color: '#ffffff',
                fontSize: '64px'
            }
            ).setOrigin(0.5,0.5);

        this.score = this.add.text(
            990,
            50,
            this.#score.toString(),
            {
                color: '#22ff22',
                fontSize: '64px'
            }
            ).setOrigin(0.5,0.5);

    }

    update(t,dt){
        console.log(this.#score);
        if (this.#timerRunning == true){
            this.#mSeconds+=dt;
            if (this.#mSeconds>1000){
                this.#seconds-=1;
                this.#mSeconds-=1000;
                this.timer.setText(this.#seconds.toString());
            }
        
            if(this.#seconds <= 0){
                this.#seconds = 0;
                this.endGame();
            }
        }
    }

    begin(){
        this.#score = 0;
        this.score.setText(this.#score.toString());
        this.#seconds = 30;
        this.timer.setText(this.#seconds.toString());
        this.#startButton.setVisible(false);
        this.showButtons(true);
        this.#timerRunning = true;
        this.getNextQuestion();
    }

    getNextQuestion(){
        this.#currentQuestion +=1;
        this.score.setText(this.#score.toString());
        let z = Phaser.Math.RND.integerInRange(0,6);
        if (this.#score>9){
            z = Phaser.Math.RND.integerInRange(7,16);
        } 
      
        if (z == this.#currentAnswer){
            z +=1;
            if (z>16){
                z=0;
            }
        }
        this.#currentAnswer = z;
        this.readQuestion(); 
    }

    readQuestion(){
        
            this.zzz = this.sound.add(this.#questionList[this.#currentAnswer]);
            this.zzz.play(); 
        
    }

    endGame(){
        this.#timerRunning = false;
        this.#startButton.setVisible(true);
        this.showButtons(false);
    }

    showButtons(visible){
        this.antartica_button.setVisible(visible);
        this.australia_button.setVisible(visible);
        this.asia_button.setVisible(visible);
        this.europe_button.setVisible(visible);
        this.s_america_button.setVisible(visible);
        this.n_america_button.setVisible(visible);
        this.africa_button.setVisible(visible);
        
    }
    makeButtons(){
        //ANTARTICA
        this.antartica_button = this.add.image(530,530,'greenButton').setOrigin(0.5,0.5).setScale(.4,.4);
        this.antartica_button.setInteractive({ useHandCursor: true });
        this.antartica_button.on('pointerover', () => {
             this.antartica_button.setTexture('gbl');
             this.map.setTexture('antarticaMap');
         });
         this.antartica_button.on('pointerout', () => {
             this.antartica_button.setTexture('greenButton');
             this.map.setTexture('worldMap');
         }); 
         this.antartica_button.on('pointerdown', () =>{
            if (this.#currentAnswer == 1 || this.#currentAnswer == 13)
                {
                    this.ding = this.sound.add('ding',{volume: 0.2});
                    this.ding.play();
                    this.#score+=1;
                    this.getNextQuestion();

                } else {
                    this.buzz = this.sound.add('buzz',{volume: 0.2});
                    this.buzz.play();
                }
         });


        //AUSTRALIA
        this.australia_button = this.add.image(810,370,'greenButton').setOrigin(0.5,0.5).setScale(.4,.4);
        this.australia_button.setInteractive({ useHandCursor: true });
        this.australia_button.on('pointerover', () => {
             this.australia_button.setTexture('gbl');
             this.map.setTexture('australiaMap');
         });
         this.australia_button.on('pointerout', () => {
             this.australia_button.setTexture('greenButton');
             this.map.setTexture('worldMap');
         }); 
         this.australia_button.on('pointerdown', () =>{
            if (this.#currentAnswer == 3 || this.#currentAnswer == 11)
                {
                    this.ding = this.sound.add('ding',{volume: 0.2});
                    this.ding.play();
                    this.#score+=1;
                    this.getNextQuestion();

                } else {
                    this.buzz = this.sound.add('buzz',{volume: 0.2});
                    this.buzz.play();
                }
         });
        
        //AFRICA
        this.africa_button = this.add.image(560,290,'greenButton').setOrigin(0.5,0.5).setScale(.4,.4);
        this.africa_button.setInteractive({ useHandCursor: true });
        this.africa_button.on('pointerover', () => {
             this.africa_button.setTexture('gbl');
             this.map.setTexture('africaMap');
         });
         this.africa_button.on('pointerout', () => {
             this.africa_button.setTexture('greenButton');
             this.map.setTexture('worldMap');
         }); 
         this.africa_button.on('pointerdown', () =>{
            if ((this.#currentAnswer == 0 || this.#currentAnswer == 10)||(this.#currentAnswer == 16))
                {
                    this.ding = this.sound.add('ding',{volume: 0.2});
                    this.ding.play();
                    this.#score+=1;
                    this.getNextQuestion();

                } else {
                    this.buzz = this.sound.add('buzz',{volume: 0.2});
                    this.buzz.play();
                }
         });
        
        //ASIA
        this.asia_button = this.add.image(710,180,'greenButton').setOrigin(0.5,0.5).setScale(.4,.4);
        this.asia_button.setInteractive({ useHandCursor: true });
        this.asia_button.on('pointerover', () => {
             this.asia_button.setTexture('gbl');
             this.map.setTexture('asiaMap');
         });
         this.asia_button.on('pointerout', () => {
             this.asia_button.setTexture('greenButton');
             this.map.setTexture('worldMap');
         }); 
         this.asia_button.on('pointerdown', () =>{
            if ((this.#currentAnswer == 2 || this.#currentAnswer == 12)|| (this.#currentAnswer == 14))
                {
                    this.ding = this.sound.add('ding',{volume: 0.2});
                    this.ding.play();
                    this.#score+=1;
                    this.getNextQuestion();

                } else {
                    this.buzz = this.sound.add('buzz',{volume: 0.2});
                    this.buzz.play();
                }
         });

        //EUROPE
        this.europe_button = this.add.image(550,160,'greenButton').setOrigin(0.5,0.5).setScale(.4,.4);
        this.europe_button.setInteractive({ useHandCursor: true });
        this.europe_button.on('pointerover', () => {
            this.europe_button.setTexture('gbl');
            this.map.setTexture('europeMap');
        });
        this.europe_button.on('pointerout', () => {
            this.europe_button.setTexture('greenButton');
            this.map.setTexture('worldMap');
        }); 
        this.europe_button.on('pointerdown', () =>{
            if ( this.#currentAnswer == 4 || this.#currentAnswer == 9)
                {
                    this.ding = this.sound.add('ding',{volume: 0.2});
                    this.ding.play();
                    this.#score+=1;
                    this.getNextQuestion();

                } else {
                    this.buzz = this.sound.add('buzz',{volume: 0.2});
                    this.buzz.play();
                }
        });

        //SOUTH AMERICA
        this.s_america_button = this.add.image(370,340,'greenButton').setOrigin(0.5,0.5).setScale(.4,.4);
        this.s_america_button.setInteractive({ useHandCursor: true });
        this.s_america_button.on('pointerover', () => {
            this.n_america_button.setTexture('gbl');
            this.map.setTexture('southAmericaMap');
        });
        this.s_america_button.on('pointerout', () => {
            this.n_america_button.setTexture('greenButton');
            this.map.setTexture('worldMap');
        }); 
        this.s_america_button.on('pointerdown', () =>{
            if ((this.#currentAnswer == 6 || this.#currentAnswer == 8)||(this.#currentAnswer == 15))
                {
                    this.ding = this.sound.add('ding',{volume: 0.2});
                    this.ding.play();
                    this.#score+=1;
                    this.getNextQuestion();

                } else {
                    this.buzz = this.sound.add('buzz',{volume: 0.2});
                    this.buzz.play();
                }
        });
    
        //NORTH AMERICA
        this.n_america_button = this.add.image(280,200,'greenButton').setOrigin(0.5,0.5).setScale(.4,.4);
        this.n_america_button.setInteractive({ useHandCursor: true });
        this.n_america_button.on('pointerover', () => {
            this.n_america_button.setTexture('gbl');
            this.map.setTexture('northAmericaMap');
        });
        this.n_america_button.on('pointerout', () => {
            this.n_america_button.setTexture('greenButton');
            this.map.setTexture('worldMap');
        }); 
        this.n_america_button.on('pointerdown', () =>{
            if (this.#currentAnswer == 5 || this.#currentAnswer == 7)
                {
                    this.ding = this.sound.add('ding',{volume: 0.2});
                    this.ding.play();
                    this.#score +=1;
                    this.getNextQuestion();

                } else {
                    this.buzz = this.sound.add('buzz',{volume: 0.2});
                    this.buzz.play();
                }
        });
    
   }
} 