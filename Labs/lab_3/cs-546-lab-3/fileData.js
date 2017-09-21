//Name: Neha Mansinghka
//CWID: 10420458
//Subject: CS546 Web Programming W1 Lab3


const bluebird = require("bluebird");

const fs = bluebird.promisifyAll(require("fs"));

module.exports = {

    getFileAsString: async function (path) {

       if ((!path)||(typeof(path)!=="string")){
            throw "No filename provided";
        }
        
        const fileAsString = await fs.readFileAsync(path, "utf-8");
        if(fileAsString === "null"){
            throw "Error in reading file";
        }
        return fileAsString;
        
    },

    getFileAsJSON: async function (path){
        
        if ((!path)||(typeof(path)!=="string")){
            throw "No filename provided";
        }
        
        let fileContent = await fs.readFileAsync(path, "utf-8");
        try{
            return(JSON.parse(fileContent));
        }
        catch(parseErr){
            console.log("Not a valid JSON format file");
            return(parseErr);
        }
              
    },
        
    saveStringToFile: async function (path, text){
        if(typeof(path)=="undefined" || typeof(text)=="undefined"){
            throw "Either the filename or the text is not provided.";
        }

        let fileObj = await fs.writeFileAsync(path, text, "utf-8");
        if(fileObj === "null"){
            throw "Error in writing file";
        }
        else{
            return true;
        }
    
    },
        
    saveJSONToFile: async function (path, obj){

        if(typeof(path)=="undefined" || typeof(obj)=="undefined"){
            throw "Either the filename or the object is not provided.";
        }

        let fileJSONObj = await fs.writeFileAsync(path, JSON.stringify(obj), "utf-8");
        if(fileJSONObj === "null"){
            throw "Error in writing JSON to file";
        }
        else{
            return true;
        }
    }
}




    

