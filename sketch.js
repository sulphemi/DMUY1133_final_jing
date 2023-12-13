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

class Folder {
    constructor(name) {
        this.type = "folder";
        this.name = name;
        this.cont = [];
    }
}

let loadLimit = 6;

let dragging = null;
let headerColor;
let img;
let headers = [];

let fileTree = new Folder("root");

function preload() {
    createFileTree();
    //img = loadImage("mimi.png");
}

function setup() {
    createCanvas(800, 800);
    openAllImages(fileTree);
    //headers.push(new HeaderBar(img));
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

function openAllImages(folder) {
    for (const f of folder.cont) {
        if (f.type ?? "none" === "folder") openAllImages(f);
        if (typeof f.pixels !== "undefined") {
            headers.push(new HeaderBar(f));
        }
    }
}