//Name: Neha Mansinghka
//CWID: 10420458
//Subject: CS546 Web Programming W1 Lab3

//var wordCounter = require("word-count");
const wordFreq = require("word-freq");

module.exports = {

    simplify: function (text) {

       if ((!text)||(typeof(text)!=="string")){
            throw "No text provided";
        }
        
        //Simplifying the text by converting all to lower case, trimming spaces from
        //start and end of the text, replacing non-alphanumeric
        //characters with space character, replacing whitespace characters like tab, newline
        //with space character. Finally combining multiple spaces into one space character and
        //returning the simplified text
        let simplifiedtext = text.toLowerCase();
        //simplifiedtext = JSON.stringify(simplifiedtext).replace(/\W/g, ' ');
        simplifiedtext = simplifiedtext.trim();
        simplifiedtext = simplifiedtext.replace(/[^A-Za-z0-9]/g, ' ');
        simplifiedtext = simplifiedtext.replace(/\s\s+/g, ' ');
        return simplifiedtext;
        
    },

    createMetrics: function(text){

        let myObj = {};

        if ((!text)||(typeof(text)!=="string")){
            throw "No text provided";
        }

        //Simplifying the text
        let textsimplified = this.simplify(text);

        //Counting total number of letters in the text including space characters
        //let letterCount = textsimplified.match(/[a-zA-Z0-9' ']/g).length;
        
        //Counting total number of letters in the text excluding space characters
        let letterCount = textsimplified.match(/[a-zA-Z0-9]/g).length;
        myObj["totalLetters"] = letterCount; 

        //Splitting the text on whitespace to get an array of all the words. 
        //Setting total number of words to be length of this array
        let words = textsimplified.split(" ");
        myObj["totalWords"] = words.length;

        //Using the word-freq package to get all the words and count of their occurrences
        //in an object i.e. getting the word frequencies for the given text
        let wordFrequencies = wordFreq.freq(textsimplified,false,false);
        
        //Using the word frequencies object to obtain count of unique words
        /*let count=0;
        for(var prop in wordFrequencies){
            if(wordFrequencies.hasOwnProperty(prop) && wordFrequencies[prop]==1){
                count=count+1;
            }
        }*/
        myObj["uniqueWords"]=(Object.keys(wordFrequencies)).length;

        //Using word array to iterate through and obtain long words
        //and also count the length of each word to obtain a total word length
        let longWordCount = 0;
        let totalWordLength = 0;
        words.forEach(function (elem) {
            if(elem.length >= 6) {
                longWordCount = longWordCount+1;
            }
            totalWordLength = totalWordLength+(elem.length);
        }); 
        myObj["longWords"]=longWordCount;

        //Calculating average word length using the total word length and number of words
        let avgWordLength = totalWordLength/(words.length);
        myObj["averageWordLength"]=avgWordLength;

        myObj["wordOccurrences"]=wordFrequencies;
        
        return (myObj);
    }
    
}




    

