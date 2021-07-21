let game = new Phaser.Game(1920,768,Phaser.Canvas)

let GameState = {
    init: function(){ //When game first runs
        this.load.crossOrigin ='Anonimous'
    },
    preload: function(){ //Load images and sound
        //Images
        this.load.image('background','minion_assets/background.png')
        this.load.image('arrow','https://s3.us-east-2.amazonaws.com/www.kassetstore.com/assets/phaser/farm-animal/images/arrow.png')
        this.load.image('bull' ,'minion_assets/minion1.png')
        this.load.image('cat','minion_assets/minion2.png')            
        this.load.image('chicken', 'minion_assets/minion3.png')
        this.load.image('cow','minion_assets/minion4.png')
        this.load.image('dog','minion_assets/minion5.png')
        this.load.image('duck','minion_assets/minion6.png')
        this.load.image('goat','minion_assets/minion7.png')
        this.load.image('horse','minion_assets/minion8.png')
        this.load.image('mouse','minion_assets/minion9.png')
        this.load.image('pig','minion_assets/minion10.png')
        this.load.image('rabbit','minion_assets/minion11.png')
        this.load.image('sheep','minion_assets/minion12.png')
        this.load.image('turkey','minion_assets/minion13.png')
        //Sounds
        this.load.audio('background-sound','https://s3.us-east-2.amazonaws.com/www.kassetstore.com/assets/phaser/farm-animal/audio/background-music.mp3')
        this.load.audio('bull-sound','https://s3.us-east-2.amazonaws.com/www.kassetstore.com/assets/phaser/farm-animal/audio/bull.mp3')
        this.load.audio('cat-sound','https://s3.us-east-2.amazonaws.com/www.kassetstore.com/assets/phaser/farm-animal/audio/cat.mp3')
        this.load.audio('chicken-sound','https://s3.us-east-2.amazonaws.com/www.kassetstore.com/assets/phaser/farm-animal/audio/chicken.mp3')
        this.load.audio('cow-sound','https://s3.us-east-2.amazonaws.com/www.kassetstore.com/assets/phaser/farm-animal/audio/cow.mp3')
        this.load.audio('dog-sound','https://s3.us-east-2.amazonaws.com/www.kassetstore.com/assets/phaser/farm-animal/audio/dog.mp3')
        this.load.audio('duck-sound','https://s3.us-east-2.amazonaws.com/www.kassetstore.com/assets/phaser/farm-animal/audio/duck.mp3')
        this.load.audio('goat-sound','https://s3.us-east-2.amazonaws.com/www.kassetstore.com/assets/phaser/farm-animal/audio/goat.mp3')
        this.load.audio('horse-sound','https://s3.us-east-2.amazonaws.com/www.kassetstore.com/assets/phaser/farm-animal/audio/horse.mp3')
        this.load.audio('mouse-sound','https://s3.us-east-2.amazonaws.com/www.kassetstore.com/assets/phaser/farm-animal/audio/mouse.mp3')
        this.load.audio('pig-sound','https://s3.us-east-2.amazonaws.com/www.kassetstore.com/assets/phaser/farm-animal/audio/pig.mp3')
        this.load.audio('rabbit-sound','https://s3.us-east-2.amazonaws.com/www.kassetstore.com/assets/phaser/farm-animal/audio/rabbit.mp3')
        this.load.audio('sheep-sound','https://s3.us-east-2.amazonaws.com/www.kassetstore.com/assets/phaser/farm-animal/audio/sheep.mp3')
        this.load.audio('turkey-sound','https://s3.us-east-2.amazonaws.com/www.kassetstore.com/assets/phaser/farm-animal/audio/turkey.mp3')

    },
    create: function(){ //Game componants
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
         game.stage.backgroundColor = "#9eeaff"

         this.scale.pageAlignHorizantally = true
         this.scale.pageAlignVertically = true
         this.background = this.game.add.sprite(0,0,'background')
         
         let style = {
             font: 'bold 40pt',
             fill: 'purple'

             }
         this.nameText = this.game.add.text(
            this.game.width/2,
            this.game.height * 0.85,
            "Animal Farm", style)
         this.nameText.anchor.setTo(0.5 , 0.5)
         
        this.game.input.onDown.addOnce (() => {
            this.game.sound.context.resume()

        })
        this.backgroundSound = game.add.audio('background-sound')
        this.backgroundSound.play()
        this.backgroundSound.volume = 0.1
        this.backgroundSound.loop = true
        this.rightArrow = this.game.add.sprite(1780,this.game.world.centerY,'arrow')
        this.rightArrow.anchor.setTo(0.5, 0.5)
        this.rightArrow.customParams= {
            direction:1
        
        }
        this.rightArrow.inputEnabled=true
        this.rightArrow.events.onInputDown.add(this.switchAnimal,this)
        
        this.leftArrow = this.game.add.sprite(150,this.game.world.centerY,'arrow')
        this.leftArrow.anchor.setTo(0.5, 0.5)
        this.leftArrow.scale.setTo(-1,1)
        this.leftArrow.customParams= {               
        
            direction:-1,
        }
        
        this.leftArrow.inputEnabled=true
        this.leftArrow.events.onInputDown.add(this.switchAnimal,this)
        let animalData= [
            {key: 'cat' , text: 'Cat', audio:'cat-sound'},
            {key: 'bull' , text: 'Bull', audio:'bull-sound'},
            {key: 'sheep' , text: 'Sheep', audio:'sheep-sound'},
            {key: 'dog' , text: 'Dog', audio:'dog-sound'},
            {key: 'turkey' , text: 'Turkey', audio:'turkey-sound'},
            {key: 'mouse' , text: 'Rat', audio:'mouse-sound'},
            {key: 'horse' , text: 'Horse', audio:'horse-sound'},
            {key: 'rabbit' , text: 'Rabbit', audio:'rabbit-sound'},
            {key: 'cow' , text: 'Cow', audio:'cow-sound'},
            {key: 'duck' , text: 'Duck', audio:'duck-sound'},
            {key: 'goat' , text: 'Goat', audio:'goat-sound'},
            {key: 'chicken' , text: 'Chicken', audio:'chicken-sound'},
            {key: 'pig' , text: 'Pig', audio:'pig-sound'},
            
            ]
            this.animals = this.game.add.group ()
            let animal
            animalData.forEach((element) =>   {
                animal = this.animals.create (-1000,this.game.world.centerY,element.key,0) 
                animal.customParams = {
                    text: element.text,
                    sound: this.game.add.audio(element.audio)
                

                }
                animal.anchor.setTo(0.5,0.5)
                animal.scale.setTo(1.5,1.5)

            })  
        this.currentAnimal = this.animals.next () 
        this.currentAnimal.customParams.sound.play()
        this.currentAnimal.position.set(this.game.world.centerX,this.game.height/2) 

       
    },
     switchAnimal: function(sprite){
            if(this.isMoving){
                return false
            }
            this.isMoving=true
    
            this.nameText.visible=false
            let newAnimal , endX
            if(sprite.customParams.direction>0){
                newAnimal=this.animals.next()
                newAnimal.x=-newAnimal.width/2       
                endX=640+this.currentAnimal.witdh/2
                
            }
            else{
                newAnimal=this.animals.previous()
                newAnimal.x=640+newAnimal.width/2
                endX=-this.currentAnimal.width/2

            }
            let newAnimalMovement=this.game.add.tween(newAnimal) 
            newAnimalMovement.to({x:this.game.world.centerX},1000)
            newAnimalMovement.onComplete.add(function(){
                newAnimal.customParams.sound.play()
                this.isMoving=false
                this.showText(this.currentAnimal)
            },this)
            newAnimalMovement.start()

            let currentAnimalMovement=this.game.add.tween(this.currentAnimal)
            currentAnimalMovement.to({x:endX},1000)
            currentAnimalMovement.start()
            this.currentAnimal=newAnimal
        },
        showText: function(animal){
            this.nameText.setText(animal.customParams.text)
            this.nameText.visible = true
        }
        
} 

game.state.add ('GameState', GameState)
game.state.start ('GameState')
