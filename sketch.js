let myInput;
let myButton;
let RNG;

function setup() {
    createCanvas(800, 600);
    background(50);

    myInput = createInput();
    myInput.position(300, 300);
    myInput.size(200, 20);
    myInput.style("font-family: monospace");
    myInput.attribute("placeholder", "enter ip here...");

    myButton = createButton("connect");
    myButton.position(325, 350);
    myButton.size(150, 20);
    myButton.style("font-family: monospace");
    myButton.style("background-color: #404040");
    myButton.style("color: #ffffff");
    myButton.style("border-radius: 5px");
    myButton.attribute("onmouseover", "this.style.backgroundColor='#303030'");
    myButton.attribute("onmouseout", "this.style.backgroundColor='#404040'");
    myButton.mousePressed(connectToIP);
}

function validateIP(ip) {
    let splitStr = ip.split(".");
    if (splitStr.length != 4) return false;
    
    for (let x of splitStr) {
        x = +x; //force type conversion into number
        if (+x === NaN) return false; //x wasn't a number
        if (x < 0 || x > 255) return false; //x not within acceptable bounds
    }

    return true; //passed all checks
}

function connectToIP() {
    const addr = myInput.value();
    if (validateIP(addr)) {
        removeElements();
        alert(`ip accepted. now connecting to ${addr}...`);
    } else {
        alert("not a valid ip!\nas a reminder, valid ip addresses follow the format x.x.x.x\nwhere x denotes a number in 0..255");
    }
}

// random number generator

class LCG {
    constructor(seed) {
      // setting constants for the LCG algorithm
      this.a = 1664525;
      this.c = 1013904223;
      this.m = Math.pow(2, 32);
      this.seed = seed % this.m;
      this.current = this.seed;
    }

    advance() {
        this.current = (this.a * this.current + this.c) % this.m;
    }
  
    // give random float
    next() {
      this.advance();
      return this.current / this.m;
    }
  
    // give random int between constraints, [min, max)
    nextInt(min, max) {
      return Math.floor(this.next() * (max - min)) + min;
    }
}

//so apparently i dont have to worry about silly things like integer overflow cuz JS is *cough cough* such a good language, so why not
//as long as the string is comprised of digits and periods this is guaranteed to be unique
//max sane output, 255025502550255, is less than Number.MAX_SAFE_INTEGER
function serializeString(string) {
    let n = 0;
    for (const x of string.split(".")) {
        n *= 10000;
        n += +x; 
    }

    return n;
}

function rngFromString(string) {
    return new LCG(serializeString(string));
}