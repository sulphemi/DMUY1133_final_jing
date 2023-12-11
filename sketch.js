class HeaderBar {
    constructor(content) {
        this.width = content.width;
        this.height = 20;
        this.pos = createVector(20, 20);
    }

    mouseHovered() {
        return (mouseX > this.pos.x) && (mouseX < this.pos.x + this.width) && (mouseY > this.pos.y) && (mouseY < this.pos.y + this.height);
    }

    display() {
        fill(headerColor);
        rect(this.pos.x, this.pos.y, this.width, this.height);
    }
}

class FileExplorer {
    constructor() {
        this.width;
        this.height;
    }
}

class Folder {
    constructor(name) {
        this.name = name;
        this.cont = [];
    }
}

let dragging = null;
let headerColor;
let img;
let h;

let fileTree = new Folder("root");

function preload() {
    createFileTree();
    img = loadImage("mimi.png");
}

function setup() {
    createCanvas(800, 800);
    h = new HeaderBar(img);
    headerColor = color(0, 0, 255);
    noStroke();
}

function draw() {
    background(240);
    h.display();
    image(img, h.pos.x, h.pos.y + h.height, img.width, img.height);
}

function _getLoremImage(imgWidth, imgHeight, imgSubject) {
    imgWidth = imgWidth ?? Math.floor(random() * 500) + 300;
    imgHeight = imgHeight ?? Math.floor(random() * 500) + 300;
    
    if (typeof imgSubject !== undefined) {
        let loadURL = `https://picsum.photos/${imgWidth}/${imgHeight}`;
        console.log(loadURL);
        return loadImage(loadURL);
    } else {
        return loadImage(`https://loremflickr.com/${imgWidth}/${imgHeight}/${imgSubject}`);
    }
}

function getLoremImage() {
    return {_:"im an image i promise"};
}

function mousePressed() {
    //for (const h of headers) {
        if (h.mouseHovered()) {
            dragging = h;
        } else {

        }
    //}
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

function createFileTree() {
    const imageWeight = random();
    const folderWeight = random();
    
    let ct = 10;
    while (ct --> 0) {
        populateFiles(fileTree.cont, imageWeight, folderWeight);
    }
}

function populateFiles(folder, iw, fw) {
    if (random() < iw) {
        folder.push(getLoremImage());
    }

    if (random() < fw) {
        const newFolder = new Folder();
        folder.push(newFolder);
        populateFiles(newFolder.cont, iw, fw);
    }
}