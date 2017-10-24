const MongoClient = require("mongodb").MongoClient,
  settings = require("./intermediate_api/config/settings"),
  uuidV4 = require('uuid/v4');
//const connection = require("./intermediate_api/config/mongoConnection");

const fullMongoUrl =
  settings.mongoConfig.serverUrl + settings.mongoConfig.database;

async function runSetup() {
  const db = await MongoClient.connect(fullMongoUrl);
  try {
    // We can recover from this; if it can't drop the collection, it's because
    await db.collection("recipes").drop();
  } catch (e) {
    // the collection does not exist yet!
  }

  const recipesCollection = await db.createCollection("recipes");
  //let docId = 0;

  const makeDoc = function(title, steps) {
    let recipId = uuidV4();
    return {
      _id: recipId,
      title: title,
      ingredients: [],
      steps: steps,
      comments: []
    };
  };

  const addComments = function(recipe, poster, comment) {
    let commentid = uuidV4();
    const newComment = {
      //_id: Guid.create().toString(),
      _id: commentid,
      poster: poster,
      comment: comment
    };

    recipe.comments.push(newComment);
  };

  const listOfRecipes = [];

  const friedEggsSteps = ["First, heat a non-stick pan on medium-high until hot",
  "Add the oil to the pan and allow oil to warm; it is ready the oil immediately sizzles upon contact with a drop of water.",
  "Crack the egg and place the egg and yolk in a small prep bowl; do not crack the yolk!",
  "Gently pour the egg from the bowl onto the oil",
  "Wait for egg white to turn bubbly and completely opaque (approx 2 min)",
  "Using a spatula, flip the egg onto its uncooked side until it is completely cooked (approx 2 min)",
  "Remove from oil and plate",
  "Repeat for second egg"];

  const chickenriceSoupSteps = ["Assemble the soup and bring to a simmer",
  "Simmer for about 25 minutes",
  "Shred the chicken and make garlic paste",
  "Season and serve"];

  const friedegg = makeDoc("Fried Eggs", friedEggsSteps);
  friedegg.ingredients.push(
    {name: "Egg", amount: "2 eggs"},
    {name: "Olive Oil", amount: "2 tbsp"}
  );

  addComments(
    friedegg,
    "Gordon Ramsay",
    "These eggs are delicious!"
  );

  addComments(friedegg, "Test Poster 2", "Okay recipe");

  const chickenriceSoup = makeDoc("Chicken Rice Soup", chickenriceSoupSteps);
  chickenriceSoup.ingredients.push(
    {name: "Chicken Breasts", amount: "2"},
    {name:"Long grain basmati rice", amount: "2 cups"},
    {name: "celery ribs", amount: "2"}
  );

  addComments(chickenriceSoup, "Test Poster 3", "Yummm recipe");
  addComments(chickenriceSoup, "Test Poster 4", "Very easy recipe");

  listOfRecipes.push(friedegg, chickenriceSoup);

  await recipesCollection.insertMany(listOfRecipes);

  //return await recipesCollection.find().toArray();
  const recipesList = await recipesCollection.find().toArray();

  //const db = await connection();
  await db.close();
  return recipesList;
}

// By exporting a function, we can run
//exports = module.exports = runSetup;
module.exports = runSetup;
