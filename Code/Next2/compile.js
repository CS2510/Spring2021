import fs from "fs"
import fse from "fs-extra"
import path from "path"
import replace from 'replace-in-file';



fs.rmdirSync("./examples", {recursive:true})
//Create the folder where we will put the compiled games
var dir = './examples';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

let rootFiles = fs.readdirSync("./");
let engineFiles = fs.readdirSync("./engine")
let gamesFiles = fs.readdirSync("./games")
let commonFiles = fs.readdirSync("./games/common")

gamesFiles.forEach(async file=>{
  var fullPath = path.join("./games/", file);
  let f = fs.statSync(fullPath)
  if(f.isDirectory && !file.includes("common")){
    
    //Copy the engine
    fs.mkdirSync("./examples/" + file)
    fs.mkdirSync("./examples/" + file + "/engine")
    let engine = "./examples/" + file + "/engine/"
    console.log(engine)
    fse.copySync("./engine/", engine)

    //Copy the game-specific directories
    fs.mkdirSync("./examples/" + file + "/game")
    let game = "./examples/" + file + "/game/"
    console.log(game)
    fse.copySync("./games/" + file, game)

    //Copy the dynamic files
    for(let i = 0; i < commonFiles.length; i++){
      let f = commonFiles[i];
    
     fse.copySync("./games/common/" + f, "./examples/" + file + "/game/" + f)
     console.log( "./examples/" + file + "/game/" + f)
     //console.log(fs.statSync("./examples/" + file + "/game/" + f))
    }

    let indexPath = './examples/' + file + '/game/index.html';
    let bootPath = './examples/' + file + '/game/boot.js';
    console.log(indexPath)
    console.log(bootPath)
    //console.log(fs.readdirSync(indexPath, 'utf-8'));
    //Update the paths
    const options = {
      files: indexPath,
      from: "../common/boot.js",
      to: './boot.js',
      countMatches:true,
    };

    let results = replace.sync(options);
    console.log(results)
    results = replace.sync({
      files: bootPath,
      from: /\.\.\/\.\.\/engine/g,
      to: "../engine"
    });
    console.log(results);
    results = replace.sync({
      files: bootPath,
      from: /\.\.\/\$\{location\}/g,
      to: "."
    });
    console.log(results);
    results = replace.sync({
      files: bootPath,
      from: /\.\.\/common/g,
      to: "."
    });
    console.log(results);

  }
})

//Walk the engine dir
//https://stackoverflow.com/a/26828357/10047920
// function walk(directoryName) {
//   let toReturn = [];
//   let files = fs.readdirSync(directoryName)

//   files.forEach(file=> {
//     var fullPath = path.join(directoryName, file);
//     let f = fs.statSync(fullPath)
//     if (f.isDirectory()) {
//       toReturn.push(...walk(fullPath));
//     } else {
//       toReturn.push(fullPath);
//     }
//   });
//   return toReturn;
// };

//let engineReferences = walk("./engine")
//console.log(engineReferences);

// engineReferences.forEach(file=>{
//   fs.copyFileSync("./" + file, "./examples/" + file)
// })

//fse.copy("./engine/", "./examples/")



console.log("Done")