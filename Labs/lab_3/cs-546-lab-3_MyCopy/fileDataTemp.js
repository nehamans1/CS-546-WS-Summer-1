//Name: Neha Mansinghka
//CWID: 10420458
//Subject: CS546 Web Programming W1 Lab3

//const bluebird = require("bluebird");
//const Promise = bluebird.Promise;

//const fs = bluebird.promisifyAll(require("fs"));
const fs = require("fs");

module.exports = {

    getFileAsString: async function (path, callback) {

        fs.readFile(path, "utf-8", (error, data) => {
            callback(error, data);
          });

       /* if ((!path)||(typeof(path)!=="string")){
            throw "No filename provided";
        }*/
        /*
        try{
            const fileAsString = await fs.readFileAsync(path, "utf-8");
        }
        catch(err){
            console.log("Promise rejected");
            console.log(err);
        }       
        callback(err, fileAsString);*/
    },

    getFileAsJSON: async function (path, callback){

        fs.readFile(path, "utf-8", (error, data) => {
            if(!error){
                try{ 
                    JSON.parse(data);
                    callback(error, JSON.parse(data));
                }
                catch(parseErr) {
                    console.log("Not a valid JSON format file");
                    callback(parseErr, null);
                }
            }
           callback(error);
          });

    },

    saveStringToFile: async function (path, text, callback){
            /*if(typeof(path)=="undefined" || typeof(text)=="undefined"){
                    //throw "Either the filename or the text is not provided.";
                    let argerr = "Either the filename or the text is not provided.";
                    callback(argerr);
            }*/
            //else{
                fs.writeFile(path, text, "utf-8", (error, data) => {
                    if(error){
                        callback(error, false);
                    }
                    else {
                        callback(null, true);
                    }   
            });
        //}
    },

    saveJSONToFile: async function (path, obj, callback){
        fs.writeFile(path, JSON.stringify(obj), "utf-8", (error, data) => {
            /*if(typeof(path)=="undefined" || typeof(text)=="undefined"){
                //throw "Either the filename or the text is not provided.";
                callback(error, false);
            }*/
            if(error){
                callback(error, false);
            }
            else {
                callback(null, true);
            }
        });
    }
}


    

