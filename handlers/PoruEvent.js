const { readdirSync } = require("fs");
const ascii = require("ascii-table");


let table = new ascii("Poru Events");
table.setHeading("Events", "Load status");

module.exports = (client) => {

  const commands = readdirSync(__dirname.replace("\handlers", "\PlayerEvents")).filter(file => file.endsWith(".js"));

  for (let file of commands) {

    try {
    let pull = require(`${__dirname.replace("\handlers", "\PlayerEvents")}/${file}`);

    if (pull.event && typeof pull.event !== "string") {
      table.addRow(file, `❌ -> Property event should be string.`);
      continue;
    }

    pull.event = pull.event || file.replace(".js", "")

    client.poru.on(pull.event, pull.run.bind(null, client))

    table.addRow(file, '✅');

    } catch(err) {

  console.log("Error While loading")
  console.log(err)
  table.addRow(file, `❌ -> Error while loading event`);
    }
  }

   console.log(table.toString());
}