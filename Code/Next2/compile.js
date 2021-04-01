import fs from "fs"
import fse from "fs-extra"
import path from "path"


fs.rmdirSync("./examples", {recursive:true})
//Create the folder where we will put the compiled games
var dir = './examples';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

let rootFiles = fs.readdirSync("./");
let engineFiles = fs.readdirSync("./engine")
let gamesFiles = fs.readdirSync("./games")

gamesFiles.forEach(file=>{
  var fullPath = path.join("./games/", file);
  let f = fs.statSync(fullPath)
  if(f.isDirectory && !file.includes("common")){
    
    fs.mkdirSync("./examples/" + file)
    fs.mkdirSync("./examples/" + file + "/engine")
    let engine = "./examples/" + file + "/engine/"
    console.log(engine)
    fse.copy("./engine/", engine)

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