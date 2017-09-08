//Name: Neha Mansinghka
//CWID: 10420458
//Subject: CS546 Web Programming W1 Lab1

//Function for catching throw exceptions
function UserException(message) {
    this.message = message;
    this.name = 'UserException';
 }

//First function 
function sumOfSquares(x, y, z) {

//Error checking for arguments validity
    if (arguments.length != 3){
        throw new UserException('Please pass exactly three numbers');
    }

//Error checking for arguments validity
    if (typeof(x)!="number" || typeof(y)!="number" || typeof(z)!="number"){
        throw new UserException('Please pass three numbers to the function');
    }

//Returning the sum of squares of three arguments
  return(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
}

//Testing the function
try{
    console.log(sumOfSquares(5,3,10));
    console.log(sumOfSquares(1,2,3));
    console.log(sumOfSquares(0,0,0));
    console.log(sumOfSquares(100,200,300));
    console.log(sumOfSquares(12,13,100));
}
catch(e){
    console.log(e.message, e.name);
}

//Second function
function sayHelloTo(firstName, lastName, title){

    //Error checking for arguments validity
    if (typeof(firstName) === "undefined" && typeof(lastName)==="undefined" && typeof(title)==="undefined"){
        throw new UserException('Please pass atleast one parameter to the function');
    }

    //Error checking for arguments validity
    if (arguments.length > 3){
        throw new UserException('Please do not pass more than three parameters');
    }

    if (arguments.length === 3){
    
        //Error checking for arguments validity
        if (typeof(firstName)!="string" || typeof(lastName)!="string" || typeof(title)!="string"){
            throw new UserException('Please pass only strings to the function');
        }
        //Printing the greeting
        console.log("Hello, " + title + " " + firstName + " " + lastName + "! Have a good evening!");
    }

    if (arguments.length === 2){

        //Error checking for arguments validity
        if ((typeof(arguments[0])!="string" || typeof(arguments[1])!="string")){
            throw new UserException('Please pass only strings to the function');
        }  
        //Printing the greeting
        console.log("Hello, " + arguments[0] + " " + arguments[1] + ". I hope you are having a good day!");
    }

    if (arguments.length === 1){
        //Error checking for arguments validity
        if (typeof(arguments[0])!="string"){
            throw new UserException('Please pass only strings to the function');
        } 
        //Printing the greeting
        console.log("Hello, " + arguments[0] + "!");
    }
    
}
//Testing the function
try{
    sayHelloTo("Phil");
}
catch(e){
    console.log(e.message, e.name);
}

try{
    sayHelloTo("Phil","Baressi");
}
catch(e){
    console.log(e.message, e.name);
}

try{
    sayHelloTo("Phil", "Baressi","Mr.");
}
catch(e){
    console.log(e.message, e.name);
}

try{
    sayHelloTo();
}
catch(e){
    console.log(e.message, e.name);
}

//Third function
function cupsOfCoffee(howManyCups){

    //Initialising strings for forming the song
    song = "";
    songline1 = " cups of coffee on the desk! "; 
    songline2 = " cups of coffee!\n";
    songline3 = "Pick one up, drink the cup, ";
    songline4 = " cups of coffee on the desk!\n\n";
    songline5 = " 1 cup of coffee on the desk!\n\n";
    songlastline1 = "1 cup of coffee on the desk! ";
    songlastline2 = "1 cup of coffee!\n";
    songlastline3 = "Pick it up, drink the cup, no more coffee left on the desk!";

    //Error checking for arguments validity
    if (typeof(howManyCups) === "undefined"){
        throw new UserException('Please pass number of cups parameter to the function');
    }

    //Error checking for arguments validity
    if (arguments.length > 1){
        throw new UserException('Please do not pass more than one parameter');
    }

    //Error checking for arguments validity
    if(typeof(howManyCups)!="number"){
        throw new UserException('Please pass a number as a parameter');
    }

    //Error checking for arguments validity
    if(howManyCups<1){
        throw new UserException("Please pass an integer greater than or equal to 1");
    }

    //Forming the song by checking the number of cups and reducing it by one in each iteration
    while(howManyCups>1){
        if(howManyCups-1 === 1){
            song = song + howManyCups + songline1 + howManyCups + songline2 + songline3 + songline5;
        }
        else{
        song = song + howManyCups + songline1 + howManyCups + songline2 + songline3 + (howManyCups-1) + songline4;
        }

        howManyCups = howManyCups-1;
    }
    song = song + songlastline1 + songlastline2 + songlastline3;

    return(song);
}
//Testing the function
try{
    console.log(cupsOfCoffee(6));
}
catch(e){
    console.log(e.message, e.name);
}

try{
    console.log(cupsOfCoffee(-1));
}
catch(e){
    console.log(e.message, e.name);
}

try{
    console.log(cupsOfCoffee());
}
catch(e){
    console.log(e.message, e.name);
}

//Fourth function
function occurrencesOfSubstring(fullString, substring){

    let count = 0;
    let index = 0;

    //Error checking for arguments validity
    if (typeof(fullString) != "string" || typeof(substring) != "string"){
        throw new UserException('Please pass 2 string parameters to the function');
    }

    //Error checking for arguments validity
    if (arguments.length > 2){
        throw new UserException('Please do not pass more than two parameters');
    }

    //Checking for substring occurrences and allowing for overlaps of the substring
    while (index>=0 && index<=(fullString.length - 1)){

        index = fullString.indexOf(substring,index);
        if (index>=0){
            ++count;
            index = index + 1;
        }
    }
    return count;
}
//Testing the function
try {
    console.log(occurrencesOfSubstring("Helllllllo, class!","ll"));
}
catch(e){
    console.log(e.message, e.name);
}

try {
    console.log(occurrencesOfSubstring("Hello world", "o"));
}
catch(e){
    console.log(e.message, e.name);
}

try {
    console.log(occurrencesOfSubstring("Hello world"));
}
catch(e){
    console.log(e.message, e.name);
}

try {
    console.log(occurrencesOfSubstring("Hello world", 1));
}
catch(e){
    console.log(e.message, e.name);
}

//Fifth function
function randomizeSentences(paragraph){

    //Error checking for arguments validity
    if (typeof(paragraph) != "string"){
        throw new UserException("Please pass in atleast one sentence as a parameter");
    }

    //Error checking for arguments validity
    if (arguments.length > 1){
        throw new UserException('Please do not pass more than one parameter');
    }

    //Error checking for arguments validity
    if (paragraph.length === 0){
        throw new UserException("Please pass in atleast one sentence as a parameter");
    }
 
    //Using regex to split the paragraph into sentences and storing these in an array
    let sentences = (paragraph.match(/\(?[^\.\?\!]+[\.!\?]+\)?/g));
    let maxsentences = sentences.length;

//Generate random numbers between 1 and total number of sentences in the paragraph.
//Use these random numbers to shuffle the sentences in the paragraph. 
//Shuffle code adapted from this site "https://bost.ocks.org/mike/shuffle/"
for(i=1;i<=maxsentences;i++){
    index = Math.floor(Math.random() * ((maxsentences-1)+1));
    let temp = sentences[maxsentences-1];
    sentences[maxsentences-1] = sentences[index];
    sentences[index] = temp;
}
    return sentences.join(' ');
}

//Testing the function
try {
    console.log(randomizeSentences("Hello, world! I am a paragraph. You can tell that I am a paragraph because there are multiple sentences that are split up by punctuation marks. Grammar can be funny, so I will only put in paragraphs with periods, exclamation marks, and question marks -- no quotations."));
}
catch(e){
    console.log(e.message, e.name);
}

try {
    console.log(randomizeSentences());
}
catch(e){
    console.log(e.message, e.name);
}