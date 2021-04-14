import fs from "fs"
import { argv } from "process";

//https://stackoverflow.com/a/60738940/10047920
const camelize = s => s[0].toUpperCase() + s.slice(1).replace(/-./g, x=>x.toUpperCase()[1])


function run() {
  console.log(process.argv);

  if (argv.length > 5 || argv.length < 5)
    return console.error("Create expects two arguments, a type of file to create followed by the name.")

  let location = process.argv[2]
  let command = process.argv[3];
  let name = process.argv[4];
  let camelCase = camelize(name);
  //camelCase = camelCase[0].toUpperCase() + camelCase.slice(1);

  let validCommands = ["scene", "prefab", "component"]
  if (!validCommands.includes(command))
    return console.error("Create expects a first argument of scene, prefab or component")

  console.log(`Creating a ${command} called ${name}.`)

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

run();