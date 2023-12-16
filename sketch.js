class Folder {
    constructor(name, theme) {
        this.type = "folder";
        this.theme = theme;
        this.name = name;
        this.cont = [];
    }

    populate() {
        if (theme === null) {
            //no theme, populate with 
        } else {

        }
    }

    themedPopulate() {

    }
}

class ImageFile {
    constructor(name) {
        this.type = "image";
        this.name = name;
        this.cont = null;
    }
}

class TextFile {
    constructor(name) {
        this.type = "text";
        this.name = name;
        this.cont = null;
    }
}

function randomHexString(length) {
    const characters = "0123456789abcdef";
    const resultArray = new Array(length);
  
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        resultArray[i] = characters.charAt(randomIndex);
    }
  
    return resultArray.join('');
}

function randInt(min, max) {
    return Math.floor(min + (max - min) * Math.random());
}

class BinaryFile {
    constructor(name) {
        this.type = "binary";
        this.name = name;
        this.cont = null;
        this.length = randInt(16, 1024);
    }

    populate() {
        this.cont = randomHexString(this.length);
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