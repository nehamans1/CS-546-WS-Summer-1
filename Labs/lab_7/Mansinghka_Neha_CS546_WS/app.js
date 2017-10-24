const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const configRoutes = require("./intermediate_api/routes");
const runStartup = require("./advanced_startup_docs.js");
//const connection = require("./intermediate_api/config/mongoConnection");

app.use(bodyParser.json());
configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});

/*async function main() {
    const allRecipes = await runStartup();
    console.log(
      "After the advanced document setup has been complete, we have the following recipes:"
    );
    console.log(allRecipes);
}

main();*/