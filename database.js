"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserFile = exports.getUserFile = exports.setUserData = exports.getUserData = void 0;
const fs = require("fs");
const path = require("path");
function readJSON(jsonPath, encoding = 'utf8', reviver = null) {
    return JSON.parse(fs.readFileSync(jsonPath).toString(encoding), reviver);
}
function writeJSON(jsonPath, obj, encoding = 'utf8', replacer = null, space = '\t') {
    fs.writeFileSync(jsonPath, JSON.stringify(obj, replacer, space), { encoding });
}
function traverse(obj, pth) {
    if (pth.length === 0) {
        return obj;
    }
    return traverse(obj === null || obj === void 0 ? void 0 : obj[pth[0]], pth.slice(1));
}
function createDirectory(pth) {
    fs.mkdirSync(path.join(__dirname, ...pth), { recursive: true });
}
function createFile(pth, name) {
    try {
        fs.readFileSync(path.join(__dirname, ...pth, name));
    }
    catch (e) {
        fs.writeFileSync(path.join(__dirname, ...pth, name), '');
    }
}
function getUserData(id, data) {
    createDirectory(data.location.slice(0, -1));
    createFile(data.location.slice(0, -1), data.location[data.location.length - 1] + '.json');
    return traverse(readJSON(path.join(__dirname, 'db', ...data.location, id.toString()) + '.json'), data.objPath);
}
exports.getUserData = getUserData;
function setUserData(id, dataPath, data) {
    createDirectory(dataPath.location.slice(0, -1));
    createFile(dataPath.location.slice(0, -1), dataPath.location[dataPath.location.length - 1] + '.json');
    let newData = readJSON(path.join(__dirname, 'db', ...data.location, id.toString()) + '.json');
    traverse(newData, dataPath.objPath.slice(0, -1))[dataPath.objPath[dataPath.objPath.length - 1]] = data;
    writeJSON(path.join(__dirname, 'db', ...data.location, id.toString()) + '.json', newData);
}
exports.setUserData = setUserData;
function getUserFile(id, pth) {
    createDirectory(pth.slice(0, -1));
    createFile(pth.slice(0, -1), pth[pth.length - 1] + '.json');
    return readJSON(path.join(__dirname, 'db', ...pth, id.toString()) + '.json');
}
exports.getUserFile = getUserFile;
function setUserFile(id, pth, data) {
    createDirectory(pth.slice(0, -1));
    createFile(pth.slice(0, -1), pth[pth.length - 1] + '.json');
    writeJSON(path.join(__dirname, 'db', ...pth, id.toString()) + '.json', data);
}
exports.setUserFile = setUserFile;
// console.log(getUserData(0, {location: ["a", "b", "c"], objPath: ["d", "e", "f", "0"]}));
//# sourceMappingURL=database.js.map