const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date: October 11th, 2023
 * Author:  Bon Duong
 *
 */

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzippedStuff");
const pathProcessed = path.join(__dirname, "grayscaled");
const unzipper = require("unzipper")
const fs = require("fs");
const { pipeline } = require("stream");


const AdmZip = require("adm-zip");
const zip = new AdmZip(zipFilePath);
zip.extractAllTo(pathUnzipped, true);

