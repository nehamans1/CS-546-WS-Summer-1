const mongoCollections = require("../config/mongoCollections");
const recipes = mongoCollections.recipes;
//const users = require("./users");
const uuid = require("node-uuid");

const exportedMethods = {
  async getAllRecipes() {
    const recipeCollection = await recipes();
    return await recipeCollection.find({},{title:1}).toArray();
  },
  /*async getPostsByTag(tag) {
    if (!tag) throw "No tag provided";

    const postCollection = await posts();
    return await postCollection.find({ tags: tag }).toArray();
  },*/
  async getRecipeById(id) {
    const recipeCollection = await recipes();
    const rec = await recipeCollection.findOne({ _id: id });

    if (!rec) throw "Recipe not found";
    return rec;
  },
  
  async addRecipe(title, ingred, stepslist) {
    //if (typeof title !== "string") throw "No title provided";
    //if (typeof body !== "string") throw "I aint got nobody!";

    /*if (!Array.isArray(tags)) {
      tags = [];
    }*/

    const recipeCollection = await recipes();

    //const userThatPosted = await users.getUserById(posterId);

    const newRecipe = {
      _id: uuid.v4(),
      title: title,
      ingredients: ingred,
      steps: stepslist,
      comments: []
    };

    //console.log(newRecipe);

    const newInsertInformation = await recipeCollection.insertOne(newRecipe);
    const newId = newInsertInformation.insertedId;
    const insertedRecipe = await this.getRecipeById(newId);
    return insertedRecipe;
  },
  
  async removeRecipe(id) {
    const recipeCollection = await recipes();
    const deletionInfo = await recipeCollection.removeOne({ _id: id });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete recipe with id of ${id}`;
    }
  },
  async updateRecipe(id, updatedPost) {
    const recipeCollection = await recipes();

    const updatedRecipeData = {};

    if (updatedPost.title) {
      updatedRecipeData.title = updatedPost.title;
    }

    if (updatedPost.ingredients) {
      updatedRecipeData.ingredients = updatedPost.ingredients;
    }

    if (updatedPost.steps) {
      updatedRecipeData.steps = updatedPost.steps;
    }

    let updateCommand = {
      $set: updatedRecipeData
    };
    const query = {
      _id: id
    };
    await recipeCollection.updateOne(query, updateCommand);

    return await this.getRecipeById(id);
  }
  /*async renameTag(oldTag, newTag) {
    let findDocuments = {
      tags: oldTag
    };

    let firstUpdate = {
      $pull: oldTag
    };

    let secondUpdate = {
      $addToSet: newTag
    };

    const postCollection = await posts();
    await postCollection.updateMany(findDocuments, firstUpdate);
    await postCollection.updateMany(findDocuments, secondUpdate);

    return await this.getPostsByTag(newTag);
  }*/
};

module.exports = exportedMethods;
