const express = require("express");
const router = express.Router();
const data = require("../data/index");
const recipeData = data.recipes;
const commentsData = data.comments;

/*let post = {
  Title: "My Story",
  story: "Test Story 1"
};*/

function isEmptyComments(obj) {
  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length && obj.length > 0)    return false;
  if (obj.length === 0)  return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and toValue enumeration bugs in IE < 9
  /*for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
  }*/
  if(Object.keys(obj).length<2)return true;

  for (let j=0; j<Object.keys(obj).length; j++){
    if(['poster','comment'].includes(Object.keys(obj)[j])){
      return false;
    }
    else{
      return true;
    }
  }

}

//Returns a list of all comments in the specified recipe
router.get("/recipe/:recipeId", async (req, res) => {
  let rec={};
  try {
    console.log(req.params.recipeId);
    rec = await recipeData.getRecipeById(req.params.recipeId);
    //res.json(rec);
  } catch (e) {
    res.status(404).json({ error: "Recipe not found" });
  }

  if(rec){
    try {
      const comList = await commentsData.getCommentsByRecId(rec._id);
      res.json(comList);
    } catch(e){
      res.status(500).json({ error: e });
    }
  }
  else{
    return;
  }
});

//router.get("/tag/:tag", async (req, res) => {
//  const postList = await postData.getPostsByTag(req.params.tag);
//  res.json(postList);
//});

//Returns the comment specified by that commentId
router.get("/:commentId", async (req, res) => {
  try {
    const commObj = await commentsData.getCommentById(req.params.commentId);
    res.json(commObj);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

//Creates a new comment with the supplied data in the request body for the stated recipe, and returns the new comment
router.post("/:recipeId", async (req, res) => {
  try {
    await recipeData.getRecipeById(req.params.recipeId);
  } catch (e) {
    res.status(404).json({ error: "Recipe not found" });
    return;
  }
  const commData = req.body;
  if(isEmptyComments(commData)){
    res.status(400).json({ error: "Incorrect information provided for creating a new comment" });
    return;
  }

  if((!commData.poster)||(typeof(commData.poster)!="string")||commData.poster.length===0){
    res.status(400).json({ error: "You must provide a poster name for the comment"});
    return;
  }

  if((!commData.comment)||(typeof(commData.comment)!="string")||commData.comment.length===0){
    res.status(400).json({ error: "You must provide a comment text for the comment"});
    return;
  }
  
  try {
    const newComment = await commentsData.addComment(req.params.recipeId,commData.poster,commData.comment);
    res.json(newComment);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

//Updates the specified comment for the stated recipe with only the supplied changes, and returns the updated comment
router.put("/:recipeId/:commentId", async (req, res) => {
  try {
    await recipeData.getRecipeById(req.params.recipeId);
  } catch (e) {
    res.status(404).json({ error: "Recipe not found" });
    return;
  }

  try {
    await commentsData.getCommentById(req.params.commentId);
  } catch (e) {
    res.status(404).json({ error: "Comment not found" });
    return;
  }

  const updatedData = req.body;

  if(Object.keys(updatedData).length === 0){
    res.status(400).json({ error: "No information provided for comment update"});
    return;
  }

  for (let j=0; j<Object.keys(updatedData).length; j++){
    if(['poster','comment'].includes(Object.keys(updatedData)[j])){}
    else{
      res.status(400).json({ error: "Incorrect information provided for comment update"});
      return;
    }
  }

  if(updatedData.poster){
    if((!updatedData.poster)||(typeof(updatedData.poster)!="string")||updatedData.poster.length===0){
      res.status(400).json({ error: "Empty or incorrectly formatted poster provided for comment update"});
      return;
    }
  }
  if(updatedData.comment){
    if((!updatedData.comment)||(typeof(updatedData.comment)!="string")||updatedData.comment.length===0){
      res.status(400).json({ error: "Empty or incorrectly formatted comment provided for update"});
      return;
    }
  }

  try {
    const updatedComment = await commentsData.updateComment(req.params.recipeId, req.params.commentId, updatedData);
    res.json(updatedComment);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

//Deletes the comment specified
router.delete("/:id", async (req, res) => {
  try {
    await commentsData.getCommentById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Comment not found" });
    return;
  }
  try {
    await commentsData.removeComment(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
