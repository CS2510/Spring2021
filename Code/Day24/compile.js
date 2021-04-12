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

gamesFiles.forEach(async file=>{
  var fullPath = path.join("./games/", file);
  let f = fs.statSync(fullPath)
  if(f.isDirectory){
    
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

    let indexPath = './examples/' + file + '/game/index.html';
    console.log(indexPath)
    //Update the paths
    const options = {
      files: indexPath,
      from: "/engine/engine.js",
      to: '../engine/engine.js',
      countMatches:true,
    };

    let results = replace.sync(options);
    console.log(results)
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