const express = require("express");
const router = express.Router();
const data = require("../data/index");
const recipeData = data.recipes;

/*let post = {
  Title: "My Story",
  story: "Test Story 1"
};*/
function isEmpty(obj) {
  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length && obj.length > 0)    return false;
  if (obj.length === 0)  return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and toValue enumeration bugs in IE < 9
  for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
  }

  return true;
}

router.get("/:id", async (req, res) => {
  try {
    const rec = await recipeData.getRecipeById(req.params.id);
    res.json(rec);
  } catch (e) {
    res.status(404).json({ error: "Recipe not found" });
  }
});

//router.get("/tag/:tag", async (req, res) => {
//  const postList = await postData.getPostsByTag(req.params.tag);
//  res.json(postList);
//});

router.get("/", async (req, res) => {
  try {
    const recList = await recipeData.getAllRecipes();
    res.json(recList);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/", async (req, res) => {
  const recipData = req.body;
  if(isEmpty(recipData)){
    res.status(400).json({ error: "Incorrect information provided for creating a new recipe" });
    return;
  }
  //const { title, ingredients, steps, comments } = recipData;

  if((!recipData.title)||(typeof(recipData.title)!="string")||recipData.title.length===0){
    res.status(400).json({ error: "You must provide a title for the recipe"});
    return;
  }
  if(!Array.isArray(recipData.ingredients) || recipData.ingredients.length===0){
    res.status(400).json({ error: "You must provide ingredients for the recipe"});
    return;
  }

  for (let i=0; i<recipData.ingredients.length; i++) {
    //copy.push(items[i]);
    if((!recipData.ingredients[i].name)||(typeof(recipData.ingredients[i].name)!="string")||recipData.ingredients[i].name.length===0){
      res.status(400).json({ error: "You must provide a name for the recipe ingredients"});
      return;
    }

    if((!recipData.ingredients[i].amount)||(typeof(recipData.ingredients[i].amount)!="string")||recipData.ingredients[i].amount.length===0){
      res.status(400).json({ error: "You must provide an amount for the recipe ingredients"});
      return;
    }
  }

  if(!Array.isArray(recipData.steps) || recipData.steps.length===0){
    res.status(400).json({ error: "You must provide steps for the recipe"});
    return;
  }
  
  try {
    const newRecipe = await recipeData.addRecipe(recipData.title, recipData.ingredients, recipData.steps);
    res.json(newRecipe);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.put("/:id", async (req, res) => {
  const updatedData = req.body;
  try {
    await recipeData.getRecipeById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Recipe not found" });
  }

  if(updatedData.title){
    if((!updatedData.title)||(typeof(updatedData.title)!="string")||updatedData.title.length===0){
      res.status(400).json({ error: "Empty or incorrectly formatted title provided for recipe update"});
      return;
    }
  }

  if(updatedData.ingredients){
    if(!Array.isArray(updatedData.ingredients) || updatedData.ingredients.length===0){
      res.status(400).json({ error: "Empty or incorrectly formatted ingredients provided for recipe update"});
      return;
    }
    for (let i=0; i<updatedData.ingredients.length; i++){
      if(!updatedData.ingredients[i].name||typeof(updatedData.ingredients[i].name)!="string"||updatedData.ingredients[i].name.length===0){
        res.status(400).json({ error: "Empty or incorrectly formatted ingredient name provided for recipe update"});
        return;
      }
      if(!updatedData.ingredients[i].amount||typeof(updatedData.ingredients[i].amount)!="string"||updatedData.ingredients[i].amount.length===0){
        res.status(400).json({ error: "Empty or incorrectly formatted ingredient amount provided for recipe update"});
        return;
      }
    }
  }

  if(updatedData.steps){
    if(!Array.isArray(updatedData.steps) || updatedData.steps.length===0){
      res.status(400).json({ error: "Empty or incorrectly formatted steps provided for recipe update"});
      return;
    }
  }

  try {
    const updatedRecipe = await recipeData.updateRecipe(req.params.id, updatedData);
    res.json(updatedRecipe);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await recipeData.getRecipeById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Recipe not found" });
  }
  try {
    await recipeData.removeRecipe(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
