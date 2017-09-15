//Name: Neha Mansinghka
//CWID: 10420458
//Subject: CS546 Web Programming W1 Lab2

const printShape = require("./printShape");

//Printing the shapes from printShape.js.
//Printing 10 of each shape with different sizes

//Initialising arrays for the 10 sizes for each shape
let sizesTriangle = [1,2,3,4,5,6,7,8,9,10,0,-1];
let sizesSquare = [2,3,4,5,6,7,8,9,10,11,1,-1];
let sizesRhombi = [2,4,6,8,10,12,14,16,18,20,1,-1];

//Calling printShape.js' triangle function to print 10 triangles.
function testTriangle() {
    
    for(counter=0;counter<sizesTriangle.length;counter++){
            try{
                printShape.triangle(sizesTriangle[counter]);
                console.log("\n");
            }
            catch(e){
                console.log(e);
            }
        }
    }

//Calling printShape.js' square function to print 10 squares.
function testSquare() {
    for(counter=0;counter<sizesSquare.length;counter++){
        try{
            printShape.square(sizesSquare[counter]);
            console.log("\n");
        }
        catch(e){
            console.log(e);
        }
    }
}

//Calling printShape.js' rhombus function to print 10 rhombi.
function testRhombus() {
    for(counter=0;counter<sizesRhombi.length;counter++){
        try{
            //console.log(sizesRhombi[counter]+"\n");
            printShape.rhombus(sizesRhombi[counter]);
            console.log("\n");
        }
        catch(e){
            console.log(e);
        }
    }
}

console.log("Printing 10 triangles");
testTriangle();
console.log("\n");
console.log("Printing 10 squares");
testSquare();
console.log("\n");
console.log("Printing 10 rhombi");
testRhombus();


  
