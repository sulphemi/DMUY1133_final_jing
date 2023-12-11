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

let dragging = null;
let headerColor;
let img;
let h;

function preload() {
    img = getLoremImage();
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

function getLoremImage(imgWidth, imgHeight, imgSubject) {
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