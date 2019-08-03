var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        this.frameNo = 0;        
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
    stop : function() {
        clearInterval(this.interval);
        }
        }

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
    }

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
    }

var myGamePiece;
var myObstacles = [];
var mySound;
var gamemusic;



function startGame() {
  myGameArea.start();
  myGamePiece = new component(120, 100, "face.png", 400, 500, "image");
  mySound = new sound("woof.mp3");
  gamemusic = new sound("computer.mp3")
  myObstacle = new component(80, 70, "finch-drawing-3.png", 500, 50, "image"); 
}

function component(width, height, color, x, y, type) {
    this.type = type;
        if (type == "image") {
            this.image = new Image();
            this.image.src = color;
        }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y; 
  this.update = function(){
    ctx = myGameArea.context;
    if (type == "image") {
        ctx.drawImage(this.image, 
          this.x, 
          this.y,
          this.width, this.height);
      } else {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY; 
    } 
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright)) {
            crash = false;
        }
        return crash;
        }
     this.winGame = function() {
         var win = false
         var mytop = this.y;
         if (mytop == 0) {
             win = true
         }
         return win;
     }
    }

function updateGameArea() {
    var x, y;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
        mySound.play();
        myGameArea.stop();
        return;
        } 
        if ((myGamePiece.y > -5) & (myGamePiece.y < 5)) {
            console.log('good job!')
            gamemusic.play();
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        y = myGameArea.canvas.height - 200
        q = Math.random() * x
        myObstacles.push(new component(80, 70, "finch-drawing-3.png", q, 50, "image"));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].y += 1;
        myObstacles[i].update();
    }
    myGamePiece.newPos(); 
    myGamePiece.update();
}

  function moveup() {
    myGamePiece.speedY -= 1; 
  }
  
  function movedown() {
    myGamePiece.speedY += 1; 
  }
  
  function moveleft() {
    myGamePiece.speedX -= 1;
  }
  
  function moveright() {
    myGamePiece.speedX += 1;
  }