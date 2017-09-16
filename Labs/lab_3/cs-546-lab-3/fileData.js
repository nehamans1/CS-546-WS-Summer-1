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
    }
}




    

