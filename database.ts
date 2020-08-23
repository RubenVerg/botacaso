import * as fs from "fs";
import * as path from "path";
import { create } from "domain";

function readJSON(jsonPath: string, encoding: BufferEncoding = 'utf8', reviver: (this: any, key: string, value: any) => any = null): any {
	return JSON.parse(fs.readFileSync(jsonPath).toString(encoding), reviver);
}

function writeJSON(jsonPath: string, obj: any, encoding: BufferEncoding = 'utf8', replacer: (this: any, key: string, value: any) => any = null, space: string | number = '\t'): void {
	fs.writeFileSync(jsonPath, JSON.stringify(obj, replacer, space), { encoding });
}

export interface DataPathFormat {
	location: string[],
	objPath: string[],
}

function traverse(obj: any, pth: string[]): any {
	if (pth.length === 0) {
		return obj;
	}

	return traverse(obj?.[pth[0]], pth.slice(1));
}

function createDirectory(pth: string[]) {
	fs.mkdirSync(path.join(__dirname, ...pth), { recursive: true });
}

function createFile(pth: string[], name: string) {
	try {
		fs.readFileSync(path.join(__dirname, ...pth, name));
	} catch (e) {
		fs.writeFileSync(path.join(__dirname, ...pth, name), '');
	}
}

export function getUserData(id: number, data: DataPathFormat): any {
	createDirectory(data.location.slice(0, -1));
	createFile(data.location.slice(0, -1), data.location[data.location.length - 1] + '.json');
	return traverse(readJSON(path.join(__dirname, 'db', ...data.location, id.toString()) + '.json'), data.objPath);
}

export function setUserData(id: number, dataPath: DataPathFormat, data: any): void {
	createDirectory(dataPath.location.slice(0, -1));
	createFile(dataPath.location.slice(0, -1), dataPath.location[dataPath.location.length - 1] + '.json');
	let newData = readJSON(path.join(__dirname, 'db', ...data.location, id.toString()) + '.json');
	traverse(newData, dataPath.objPath.slice(0, -1))[dataPath.objPath[dataPath.objPath.length - 1]] = data;
	writeJSON(path.join(__dirname, 'db', ...data.location, id.toString()) + '.json', newData);
}

export function getUserFile(id: number, pth: string[]): any {
	createDirectory(pth.slice(0, -1));
	createFile(pth.slice(0, -1), pth[pth.length - 1] + '.json');
	return readJSON(path.join(__dirname, 'db', ...pth, id.toString()) + '.json');
}

export function setUserFile(id: number, pth: string[], data: any): void {
	createDirectory(pth.slice(0, -1));
	createFile(pth.slice(0, -1), pth[pth.length - 1] + '.json');
	writeJSON(path.join(__dirname, 'db', ...pth, id.toString()) + '.json', data);
}

// console.log(getUserData(0, {location: ["a", "b", "c"], objPath: ["d", "e", "f", "0"]}));