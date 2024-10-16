// look at each given path, resolve it, find if its a directory or a file
// if file, search in file for regexp
// else if dir, search in every file in dir and its subdirs for regexp, create a list of all filenames

import {sep} from "node:path";
import {statSync, readdirSync, readFileSync} from "node:fs";
 
let regexp = new RegExp(process.argv[2]);

for (let p of process.argv.slice(3)) {
    search(p);
}

function search(path) {
    let stats = statSync(path);
    if (stats.isDirectory()) {
        for (let p of readdirSync(path)) {
            search(path + sep + p);
        }
    } else if (regexp.test(readFileSync(path, 'utf8'))) {
        console.log(path);
    }
}