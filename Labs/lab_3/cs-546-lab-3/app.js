//Name: Neha Mansinghka
//CWID: 10420458
//Subject: CS546 Web Programming W1 Lab3

const filePath = "/Users/nehamansinghka/Documents/CS546_Web_Programming/CS-546-WS-Summer-1/Labs/lab_3/cs-546-lab-3/";
const JSONObj = [{
        "name": "Philip Barese",
        "codename": "The Spy",
        "role": "inconspicuously making your coffee while overhearing all your secret plans."
    }];

//const filePath = "/Users/nehamansinghka/Documents/CS546_Web_Programming/CS-546-WS-Summer-1/Old/lecture_03_old/callbacks/the-c-team.json";

//Importing the required modules
const fs1 = require("fs");
const readFileAsString = require("./fileData");
const textMetricsCreate = require("./textMetrics");

//Function to check if result.json version of the given file exists. If it exists
//then read the file and print its contents. Otherwise, call function from fileData.js
//to read the file, then call function from textMetrics.js to simplify the file content, then
//call write function from fileData.js to write the simplified contents to a debug.txt file.
//Then call function from textMetrics.js to obtain metrics for the file content. Write these
//metrics to results.json file using the write function of fileData.js
async function fileMetrics(fileName){

    if((!fileName)||(typeof(fileName)!="string")){
        throw "Please provide a filename as a string to the function";
    }

    //Splitting the given filename to obtain the filename without the extension
    let fileNameArr = fileName.split(".");
    //Creating the result.json version of the filename
    let resultFileName = filePath+fileNameArr[0]+".result.json";    

//Checking if the result.json version of the given file exists. If it does then its contents
//are printed.
    if(fs1.existsSync(resultFileName)){
        try{
            const fileContentString = await readFileAsString.getFileAsJSON(resultFileName);
            console.log("Content of "+resultFileName);
            console.log(fileContentString);
            console.log("\n");
        }
        catch(e){
            console.log(e);
        }
    }
    //Case where results.json version of the given file does not exist.
    else{
        try {
            let fileContent = await readFileAsString.getFileAsString(fileName);
            fileContent = textMetricsCreate.simplify(fileContent);
            let debugFileCreate = await readFileAsString.saveStringToFile(filePath+fileNameArr[0]+".debug.txt", fileContent);
            let txtMetrics = textMetricsCreate.createMetrics(fileContent);
            let resultFileCreate = await readFileAsString.saveJSONToFile(resultFileName,txtMetrics);
            console.log("Printing metrics for content of " + fileNameArr[0]);
            console.log(txtMetrics);
            }
        catch(e){
            console.log(e);
        }
    }
    return;
}

//Calling the fileMetrics function with each of the test files.
async function mainFunc(){
    try{
        await fileMetrics("chapter1.txt");
    }
    catch(e){
        console.log(e);
    }
   
    try{
        await fileMetrics("chapter2.txt");
    }
    catch(e){
        console.log(e);
    }
    
    try{
        await fileMetrics("chapter3.txt");
    }
    catch(e){
        console.log(e);
    }
  
}

mainFunc();