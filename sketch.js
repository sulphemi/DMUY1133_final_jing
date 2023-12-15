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
    }
}

class TextFile {
    constructor(name) {
        this.type = "text";
        this.name = name;
        this.cont = null;
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