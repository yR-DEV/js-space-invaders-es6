// Image repo
let imageRepo = function() {
    // Defining images
    this.background = new Image();

    // Setting image source
    this.background.src = "./imgs/bg.png";
}

// Creating the drawable class that is the base class for all drawable objects in the game
class Drawable {
    constructor(x, y, speed, canvasHeight, canvasWidth) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
    }

    init(x, y) {
        this.x = x;
        this.y = y;
    }

    // Defining abtract function to be built out in later classes that inherited drawable.
    draw() {
    }
}

class Background extends Drawable {
    constructor(speed) {
        super();
        this.speed = 1;
    }

    draw() {
        // Panning the background with the speed passed in
        this.y += this.speed;
        this.context.drawImage(imageRepo.background, this.x, this.y);

        // Drawing another image on top of the first image
        this.context.drawImage(imageRepo.background, this.x, this.y - this.canvasHeight);
    
        // If the image has scrolled off the screen, reset and redraw
        if (this.y >= this.canvasHeight) {
            this.y = 0;
        }
    }
}


class Game {
    init() {
        this.bgCanvas = document.getElementById('background');
        
        // console.log('inside of if');
        // Testing to see if browser supports Canvas
        if (this.bgCanvas.getContext) {
            
            this.bgContext = this.bgCanvas.getContext('2d');
            
            // Initializing context and canvas information
            Background.prototype.context = this.bgContext;
            Background.prototype.canvasWidth = this.bgCanvas.width;
            Background.prototype.canvasHeight = this.bgCanvas.height;
            
            // Initializing the background object
            this.background = new Background();
            this.background.init(0, 0);
            return true;
        } else {
            return false;
        }
    }

    // Starting the animation loop
    start() {
        animate();
    }
}

function animate() {
	requestAnimFrame( animate );
	game.background.draw();
}

window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 60);
			};
})();

var game = new Game();
// console.log(game.init());


function init() {
    if (game.init()) {
        game.start();
    }
}