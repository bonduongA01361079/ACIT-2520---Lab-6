/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: October 11th, 2023
 * Author: Bon Duong
 *
 */

const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");
  
const zipFilePath = path.join(__dirname, "myfile.zip");
const { create } = require("domain");
const { pipeline } = require("stream");
  

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(pathIn) 
      .pipe(unzipper.Extract({ path: pathOut}))
      .on("error", (err) => {
        console.error(err);
        reject(err);
      })
      .on("end", () => {
        resolve("Extraction operation complete");
        });
    });
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
      } else {
        const pngPath = files.filter((file) => file.endsWith(".png"));
        const filePath = pngPath.map((file) => path.join(dir, file));
        resolve(filePath);
      };
    });
  });
};

/* Example
["C:\\Users\\in.png",
 "C:\\Users\\in.png",
 "C:\\Users\\in.png"]
/*

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
    fs.createReadStream(pathIn)
        .pipe(
            new PNG({
            filterType: 4,
            })
        )
        .on("parsed", function () {
            for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var idx = (this.width * y + x) << 2;
                var avg = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3;

                // invert color
                this.data[idx] = avg;
                this.data[idx + 1] = avg;
                this.data[idx + 2] = avg;
            }
            }
            this.pack().pipe(fs.createWriteStream(pathOut));
        });
}

module.exports = {
  unzip,
  readDir,
  grayScale,
};
