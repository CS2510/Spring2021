import fs from "fs"
import { argv } from "process";
import ncp from "ncp";

//https://stackoverflow.com/a/60738940/10047920
const camelize = s => s[0].toUpperCase() + s.slice(1).replace(/-./g, x => x.toUpperCase()[1])


function run() {
  console.log(process.argv);

  if (argv.length > 5 || argv.length < 5)
    return console.error("Create expects three arguments, the name of the game, the type of file to create (game, scene, prefab, or component), and the name of the file.")

  let location = process.argv[2]
  let command = process.argv[3];
  let name = process.argv[4];
  let camelCase = camelize(name);
  //camelCase = camelCase[0].toUpperCase() + camelCase.slice(1);

  let validCommands = ["game", "scene", "prefab", "component"]
  if (!validCommands.includes(command))
    return console.error("Create expects a second argument of game, scene, prefab or component")

  console.log(`Creating a ${command} called ${name} in ${location}.`)

  if (command == "game") {
    let gameDir = "./games/" + location
    if(!fs.existsSync(gameDir))
    {
      fs.mkdirSync(gameDir);
     
      ncp("./boilerplate/game/", gameDir, function(err){
        if(err) return console.error(err);
        console.log("Done copying a new game")
      })


    }
    else{
      console.error("You can't create a new game with name " + name + " because it already exists")
    }
  }
  else {


    let template = fs.readFileSync(`./boilerplate/${command}.js`, 'utf-8')
    console.log(template);
    template = template.toString().replace("${name}", camelCase)
    console.log(template);

    fs.writeFileSync(`./games/${location}/${command}s/${name}.js`, template)

    //Now append to the game-command file
    let toAdd = `export {default as ${camelCase}} from './${name}.js'`
    //console.log(toAdd);

    let containerPath = `./games/${location}/${command}s/game-${command}s.js`;
    let file = fs.readFileSync(containerPath, 'utf-8')
    file += "\n" + toAdd;
    console.log(file);
    fs.writeFileSync(containerPath, file);
  }

}

run();