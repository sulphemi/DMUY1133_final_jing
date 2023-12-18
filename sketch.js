// random number generator
class LCG {
    constructor(seed) {
      // setting constants for the LCG algorithm
      this.a = 1664525;
      this.c = 1013904223;
      this.m = Math.pow(2, 32);
      this.seed = seed % this.m;
      this.current = this.seed;

      this.advance();
    }

    advance() {
        this.current = (this.a * this.current + this.c) % this.m;
        this.current = Math.abs(this.current);
    }
  
    // give random float
    next() {
      this.advance();
      //console.log(this.current / this.m);
      return this.current / this.m;
    }
  
    // give random int between constraints, [min, max)
    nextInt(min, max) {
      return Math.floor(this.next() * (max - min)) + min;
    }
}

class Folder {
    constructor(name) {
        this.type = "folder";
        this.name = name;
        this.cont = [];
    }
}

class ImageFile {
    constructor(name) {
        this.type = "image";
        this.name = name;
        this.cont = null;
        this.de_x = RNG.nextInt(0, 400);
        this.de_y = RNG.nextInt(0, 400);
    }

    populate() {
        this.cont = getLoremImage();
    }
}

class TextFile {
    constructor(name) {
        this.type = "text";
        this.name = name;
        this.cont = null;
        this.de_x = RNG.nextInt(0, 400);
        this.de_y = RNG.nextInt(0, 400);
    }
}

function randomHexString(length) {
    const characters = "0123456789abcdef";
    const resultArray = new Array(length);
  
    for (let i = 0; i < length; i++) {
        const randomIndex = RNG.nextInt(0, characters.length);
        resultArray[i] = characters.charAt(randomIndex);
    }
  
    return resultArray.join('');
}

class BinaryFile {
    constructor(name) {
        this.type = "binary";
        this.name = name;
        this.cont = null;
        this.length = RNG.nextInt(16, 256);
        this.de_x = RNG.nextInt(0, 400);
        this.de_y = RNG.nextInt(0, 400);

        this.populate();
    }

    populate() {
        this.cont = randomHexString(this.length);
    }
}

let imageWeight;
let folderWeight;
let imgWeight;
let fldWeight;

let imageLimit = 6;

let fileTree = new Folder("root");

//only call this function after setting up RiTa seed and LCG seed
function createFileTree() {
    txtWeight = RNG.next() / 3 + 0.3;
    binWeight = RNG.next() / 3 + 0.3;
    imgWeight = RNG.next() / 3 + 0.3;
    fldWeight = RNG.next() + 0.5; //might be over 1 but decreases based on how many nested folders

    let ct = RNG.nextInt(3, 10);
    while (ct --> 0) {
        populateFiles(fileTree.cont, 1);
    }
}

//populates the given array
function populateFiles(folder, folderDepth) {
    if (RNG.next() < txtWeight) {
        folder.push(new TextFile(randomName()));
    }

    if (RNG.next() < binWeight) {
        folder.push(new BinaryFile(randomName()));
    }

    if (RNG.next() < imageWeight) {
        if (imageLimit --> 0) {
            folder.push(new ImageFile(randomName()));
        }
    }

    if (RNG.next() < fldWeight / folderDepth) {
        const newFolder = new Folder(randomName());
        folder.push(newFolder);
        
        let ct = RNG.nextInt(0, 8);
        while (ct --> 0) {
            populateFiles(newFolder.cont, folderDepth + 1);
        }
    }
}

let myInput;
let myButton;
//let loadingScreen;
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
        RNG = new LCG(ipToDecimal(addr));
        RiTa.randomSeed(ipToDecimal(addr));
        removeElements();

        //start
        createFileTree();
        alert(`ip accepted. now connecting to ${addr}...`);

        startDE();
        //makeLoadingScreen();
    } else {
        alert("not a valid ip!\nas a reminder, valid ip addresses follow the format x.x.x.x\nwhere x denotes a number in 0..255");
    }
}

function ipToDecimal(addr) {
    const octets = addr.split(".");
    return (+octets[0] << 24) | (+octets[1] << 16) | (+octets[2] << 8) | +octets[3];
}

function randomName() {
    return RiTa.randomWord({pos: "nns"});
}

function makeLoadingScreen() {
    let loadScreenCode = p => {
        p.setup = () => {
            let pcanvas = p.createCanvas(400, 400);
            pcanvas.position(0, 0);
        };
        p.draw = () => {
            p.background(255);
        };
    }
    loadingScreen = new p5(loadScreenCode, "meow");
}



///////////

function startDE() {
    headerColor = color(0, 0, 255);

    draw = drawDE;
}


let windowSpawnX = 0;
let windowSpawnY = 0;

class HeaderBar {
    constructor(content) {
        this.content = content;
        this.width = content.width;
        this.height = 20;
        this.pos = createVector(windowSpawnX += 20, windowSpawnY += 30);
    }

    mouseHovered() {
        return (mouseX > this.pos.x) && (mouseX < this.pos.x + this.width) && (mouseY > this.pos.y) && (mouseY < this.pos.y + this.height);
    }

    closeHovered() {
        return (mouseX > this.pos.x) && (mouseX < this.pos.x + 20) && (mouseY > this.pos.y) && (mouseY < this.pos.y + 20);
    }

    mouseOnContent() {
        return (mouseX > this.pos.x) && (mouseX < this.pos.x + this.width) && (mouseY > this.pos.y) && (mouseY < this.pos.y + this.height + this.content.height);
    }

    display() {
        fill(headerColor);
        rect(this.pos.x, this.pos.y, this.width, this.height);
        this.drawContent();
        this.drawCloseButton();
    }

    drawCloseButton() {
        fill(this.closeHovered ? color(255, 0, 0) : color(255, 50, 50));
        square(this.pos.x, this.pos.y, 20);
    }

    drawContent() {
        image(this.content, h.pos.x, h.pos.y + h.height, this.content.width, this.content.height);
    }
}

class FileExplorer {
    constructor() {
        this.content = {};
        this.content.width = 720;
        this.content.height = 512;
        this.pos = createVector(20, 20);
    }

    mouseHovered() {
        return (mouseX > this.pos.x) && (mouseX < this.pos.x + this.width) && (mouseY > this.pos.y) && (mouseY < this.pos.y + this.height);
    }

    closeHovered() {
        return (mouseX > this.pos.x) && (mouseX < this.pos.x + 20) && (mouseY > this.pos.y) && (mouseY < this.pos.y + 20);
    }

    mouseOnContent() {
        return (mouseX > this.pos.x) && (mouseX < this.pos.x + this.width) && (mouseY > this.pos.y) && (mouseY < this.pos.y + this.height + this.content.height);
    }

    display() {
        fill(headerColor);
        rect(this.pos.x, this.pos.y, this.width, this.height);
        this.drawContent();
        this.drawCloseButton();
    }

    drawCloseButton() {
        fill(this.closeHovered ? color(255, 0, 0) : color(255, 50, 50));
        square(this.pos.x, this.pos.y, 20);
    }

    drawContent() {
        rect(this.pos.x, this.pos.y, this.content.width, this.content.height);
    }
}

let dragging = null;
let headerColor;
let headers = [];

function drawDE() {
    background(240);

    for (f of fileTree.cont) {
        rect(f.de_x, f.de_y, 30, 50);
        text(f.name, f.de_x, f.de_y);
    }

    for (h of headers) {
        h.display();
    }
}

function getLoremImage(imgWidth, imgHeight, imgSubject) {
    imgWidth = imgWidth ?? Math.floor(random() * 500) + 300;
    imgHeight = imgHeight ?? Math.floor(random() * 500) + 300;

    if (--loadLimit < 0) return {};
    
    if (typeof imgSubject === "undefined") {
        //let loadURL = `https://picsum.photos/${imgWidth}/${imgHeight}`;
        let loadURL = `https://source.unsplash.com/random/${imgWidth}x${imgHeight}`;
        console.log(loadURL);
        return loadImage(loadURL);
    } else {
        let loadURL = `https://loremflickr.com/${imgWidth}/${imgHeight}/${imgSubject}`;
        console.log(loadURL);
        return loadImage(loadURL);
    }
}

function mousePressed() {
    for (let i = headers.length - 1; i >= 0; i--) {
        const h = headers[i];

        if (h.closeHovered()) {
            headers.splice(i, 1);
            break;
        }

        if (h.mouseHovered()) {
            headers.splice(i, 1);
            headers.push(h);
            dragging = h;
            break;
        }

        if (h.mouseOnContent()) {
            headers.splice(i, 1);
            headers.push(h);
            break;
        }
    }
}

function mouseReleased() {
    dragging = null;
}

function mouseDragged(event) {
    if (dragging !== null) {
        e = event;
        dragging.pos.x += event.movementX;
        dragging.pos.y += event.movementY;
    }
}