const fs = require('fs');
const path = require('path');

let numberOfFiles = 0;

// specify the folder path
const folderPath = 'C:\\Users\\1\\Documents\\pagination\\freePics';

//read the contents of the folder
fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.log("error reading directory", err);
        return;
    }

    // Filter only files (excluding directories)
    const filesCount = files.filter(file => fs.statSync(path.join(folderPath, file)).isFile()).length;
    console.log("number of files ", filesCount);
    numberOfFiles = filesCount;
})

document.writeln(`the total number of files in a folder is ${numberOfFiles}`);

