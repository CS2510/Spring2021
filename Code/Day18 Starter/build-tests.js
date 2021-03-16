import fs from "fs";

let preamble = 
`import chai from "chai";
const expect = chai.expect;
`;


let files = fs.readdirSync("./engine/");
files.filter(i => i.endsWith(".js") && i != "engine.js").forEach(async i => {
  console.log(i);
  let fileName = './engine/' + i;
  let result = await import(fileName);
  if (!result) return console.error("Error with " + i);
  console.log(result.default.name);
  let properties = Object.getOwnPropertyNames(result.default)
  let newFileName = "./test/" + i.replace(".", ".test.");
  if(fs.existsSync(newFileName)){
    return console.log("Not generating a test for " + i + " because the file already exists")
  }
  console.log("Creating " + newFileName)

  let tests = [];
  for(let property of properties){
    tests.push({name: property, type:typeof result.default[property]});
  }
  console.log(tests);

  let string = "";
  string += preamble;
  string += `import ${result.default.name} from "${"." + fileName}"\n`;
  string += "\n";
  string += `describe("${result.default.name}", function(){\n`


  for(let test of tests){
    if(test.name == "name" ) continue;
    if(test.name == "prototype")
      test.name = "constructor"
    string += `\tdescribe("${test.name}", function(){\n`;
    string += `\t\tit("Works properly", function(){\n`;
    string += `\t\t\texpect(false).to.be.true;\n`
    string += `\t\t});\n`
    string += `\t});\n`
  }

  string += `});`

  console.log(string);

  fs.writeFileSync(newFileName, string )


})


