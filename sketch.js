class HeaderBar {
    constructor(content) {
        this.content = content;
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
        this.drawContent();
    }

    drawContent() {
        image(this.content, h.pos.x, h.pos.y + h.height, img.width, img.height);
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

let loadLimit = 3;

let dragging = null;
let headerColor;
let img;
let headers = [];

let fileTree = new Folder("root");

function preload() {
    createFileTree();
    img = loadImage("mimi.png");
}

function setup() {
    createCanvas(800, 800);
    for (f of fileTree.cont) {
        if (typeof f.pixels !== "undefined") {
            headers.push(new HeaderBar(f));
        }
    }
    headers.push(new HeaderBar(img));
    headerColor = color(0, 0, 255);
    noStroke();
}

function draw() {
    background(240);
    for (h of headers) {
        h.display();
    }
}

function getLoremImage(imgWidth, imgHeight, imgSubject) {
    imgWidth = imgWidth ?? Math.floor(random() * 500) + 300;
    imgHeight = imgHeight ?? Math.floor(random() * 500) + 300;

    if (--loadLimit < 0) return {};
    
    if (typeof imgSubject === "undefined") {
        let loadURL = `https://picsum.photos/${imgWidth}/${imgHeight}`;
        console.log(loadURL);
        return loadImage(loadURL);
    } else {
        let loadURL = `https://loremflickr.com/${imgWidth}/${imgHeight}/${imgSubject}`;
        console.log(loadURL);
        return loadImage(loadURL);
    }
}

function mousePressed() {
    for (const h of headers) {
        if (h.mouseHovered()) {
            dragging = h;
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