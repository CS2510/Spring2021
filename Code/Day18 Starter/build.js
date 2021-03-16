const fs = require('fs')

let toBuild = [
  { dir: "./engine/components/", name: "engine-components.js" },
]

let files = fs.readdirSync("./games/");
for(let i = 0; i < files.length; i++){
  let file = files[i];
  if(file.includes("common")) continue;
  toBuild.push({dir:"./games/" + file + "/components/", name:"game-components.js"})
  toBuild.push({dir:"./games/" + file + "/prefabs/", name:"game-prefabs.js"})
  toBuild.push({dir:"./games/" + file + "/scenes/", name:"game-scenes.js"})
}



for (let i = 0; i < toBuild.length; i++) {

  let buildString = "";
  let dir = toBuild[i].dir;
  let buildName = toBuild[i].name;

  function convertCase(kebab) {
    return kebab.split("-").map(i => i[0].toUpperCase() + i.substr(1)).join("");
  }

  let files = fs.readdirSync(dir)

  files.forEach(file => {
    if (file == buildName) return;
    let filename = file.substr(0, file.length - 3);
    buildString += `export {default as ${convertCase(filename)}} from "${"./" + file}"\n`;
  })
  fs.writeFileSync(dir + buildName, buildString);
}