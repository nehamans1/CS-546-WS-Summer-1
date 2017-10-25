const mongoCollections = require("../config/mongoCollections");
const recipes = mongoCollections.recipes;
//const comments = mongoCollections.comments;
const uuid = require("node-uuid");

const exportedMethods = {
  //Gets the specified comment in a special format
  async getCommentById(commId) {
    const recipeCollection = await recipes();
    const rec = await recipeCollection.findOne({'comments._id':commId},{title:1, comments:1});

    if(!rec) {
      throw "Comment not found";
      return;
    }
    else{
      for(ind=0;ind<rec.comments.length;ind++){
        if(rec.comments[ind]._id===commId){
          let commentsObj = {};
          commentsObj._id = rec.comments[ind]._id;
          commentsObj.recipeId = rec._id;
          commentsObj.recipeTitle = rec.title;
          commentsObj.poster = rec.comments[ind].poster;
          commentsObj.comment = rec.comments[ind].comment;
          return commentsObj;
        }
    }
  }
},
  /*async getPostsByTag(tag) {
    if (!tag) throw "No tag provided";

    const postCollection = await posts();
    return await postCollection.find({ tags: tag }).toArray();
  },*/

  //Gets all comments for a specified recipe in a special format
  async getCommentsByRecId(id) {
    let commentsList = [];

    const recipeCollection = await recipes();
    const rec = await recipeCollection.findOne({ _id: id },{title:1, comments:1});

    if(!rec.comments || rec.comments.length===0){
      throw "No comments found for this recipe";
      return;
    }
    else{
      for(ind=0;ind<rec.comments.length;ind++){
        let commentsObj = {};
        commentsObj._id = rec.comments[ind]._id;
        commentsObj.recipeId = id;
        commentsObj.recipeTitle = rec.title;
        commentsObj.poster = rec.comments[ind].poster;
        commentsObj.comment = rec.comments[ind].comment;
        commentsList.push(commentsObj);
      }
    }
    return commentsList;
  },
  
  //Adds a new comment to a specified recipe.
  async addComment(recId, poster, comment) {
    //if (typeof title !== "string") throw "No title provided";
    //if (typeof body !== "string") throw "I aint got nobody!";

    /*if (!Array.isArray(tags)) {
      tags = [];
    }*/

    const recipeCollection = await recipes();

    //const userThatPosted = await users.getUserById(posterId);

    const newComment = {
      _id: uuid.v4(),
      poster: poster,
      comment: comment
    };

    let updateCommand = {
      $push: {comments: newComment}
    };
    const query = {
      _id: recId
    };
    await recipeCollection.updateOne(query, updateCommand);

    return await this.getCommentById(newComment._id);
  },
  
  async removeComment(id) {
    const recipeCollection = await recipes();
    return await recipeCollection.update({"comments._id": id },{$pull:  { comments: { _id: id} } });
  },

  //Updates a specified comment for a specified recipe. Only the fields provided in the update
  //request or put request are updated and the remaining fields keep the same values.
  async updateComment(recId, commId, updatedComment) {
    const recipeCollection = await recipes();
  
    const updatedCommentData = {};

    if (updatedComment.poster) {
      let posterkeyname = "comments.$.poster";
      updatedCommentData[posterkeyname] = updatedComment.poster;
    }
    if (updatedComment.comment) {
      let commentkeyname = "comments.$.comment";
      updatedCommentData[commentkeyname] = updatedComment.comment;
    }

    let updateCommand = {
      $set: updatedCommentData
    };
    const query = {
      _id: recId,
      "comments._id": commId
    };
    await recipeCollection.updateOne(query, updateCommand);

    return await this.getCommentById(commId);
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
