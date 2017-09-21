//Name: Neha Mansinghka
//CWID: 10420458
//Subject: CS546 Web Programming W1 Lab3

const filePath = "/Users/nehamansinghka/Documents/CS546_Web_Programming/CS-546-WS-Summer-1/Labs/lab_3/cs-546-lab-3/";
const JSONObj = [{
        "name": "Philip Barese",
        "codename": "The Spy",
        "role": "inconspicuously making your coffee while overhearing all your secret plans."
    }];

const fs1 = require("fs");

//const filePath = "/Users/nehamansinghka/Documents/CS546_Web_Programming/CS-546-WS-Summer-1/Old/lecture_03_old/callbacks/the-c-team.json";

/*const bluebird = require("bluebird");
const Promise = bluebird.Promise;
const readFileAsString = bluebird.promisifyAll(require("./fileData"));*/

const readFileAsString = require("./fileData");
const textMetricsCreate = require("./textMetrics");

async function fileMetrics(fileName){
            /*try{
                const fileContentString = await readFileAsString.getFileAsString(filePath);
                console.log(fileContentString);
                return fileContentString;
            }
            catch(err){
                console.log("In catch of main in app.js");
                console.log(err);
                return err;
            }

            try{
                let fileContentJSON = await readFileAsString.getFileAsJSON(filePath);
                console.log(fileContentJSON);
                return fileContentJSON;
            }
            catch(err){
                console.log("In catch of main in app.js");
                console.log(err);
                return err;
            }

            try{
                let writeResult = await readFileAsString.saveStringToFile(filePath, "TEST TEXT");
                console.log("Result of saveStringToFile: " + writeResult);
                return writeResult;
            }
            catch(err){
                console.log("In catch of main in app.js");
                console.log(err);
                return err;
            }

           try{
                let writeResult = await readFileAsString.saveJSONToFile(filePath, JSONObj);
                console.log("Result of saveJSONToFile: " + writeResult);
                return writeResult;
            }
            catch(err){
                console.log("In catch of main in app.js");
                console.log(err);
                return err;
            }

           try{
            console.log(textMetricsCreate.createMetrics("Hello, my -! This is a great day to say hello.\n\n\tHello! 2 3 4 23"));
           }
           catch(e){
               console.log(e);
           } */

    let fileNameArr = fileName.split(".");
    let resultFileName = filePath+fileNameArr[0]+".result.json";    
    //console.log(resultFileName); 

    if(fs1.existsSync(resultFileName)){
        try{
            const fileContentString = await readFileAsString.getFileAsString(resultFileName);
            console.log(fileContentString);
        }
        catch(e){
            console.log(e);
        }
    }
    else{
        try {
            let fileContent = await readFileAsString.getFileAsString(fileName);
            fileContent = textMetricsCreate.simplify(fileContent);
            let debugFileCreate = await readFileAsString.saveStringToFile(filePath+fileNameArr[0]+".debug.txt", fileContent);
            if (debugFileCreate) {
                let txtMetrics = textMetricsCreate.createMetrics(fileContent);
                let resultFileCreate = await readFileAsString.saveJSONToFile(resultFileName,txtMetrics);

            }
            else{
                console.log("Error writing the ${fileNameArr[0]}.debug.txt file");
            }
        }
        catch(e){
            console.log(e);
        }
    }
}

fileMetrics("chapter2.txt");