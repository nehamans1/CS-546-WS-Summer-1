//Name: Neha Mansinghka
//CWID: 10420458
//Subject: CS546 Web Programming W1 Lab3

//const filePath = "/Users/nehamansinghka/Documents/CS546_Web_Programming/CS-546-WS-Summer-1/Labs/lab_3/cs-546-lab-3/chapter.txt";
const filePath = "";

const bluebird = require("bluebird");
//const Promise = bluebird.Promise;
const readFileAsString = bluebird.promisifyAll(require("./fileData"));

//const readFileAsString = require("./fileData");

async function mainFunc(){
    
            try{
                let fileContentString = await readFileAsString.getFileAsStringAsync(filePath);
                console.log(fileContentString);
                return fileContentString;
            }
            catch(err){
                console.log("In catch of main in app.js");
                console.log(err);
                return err;
            }

            //console.log(fileContentString);
}

mainFunc();