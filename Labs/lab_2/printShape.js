//Name: Neha Mansinghka
//CWID: 10420458
//Subject: CS546 Web Programming W1 Lab2

//Function for catching throw exceptions
function UserException(message) {
    this.message = message;
    this.name = 'UserException';
 }

 let hordash = "-";
 let verdash = "|";
 let slant1 = '\\';
 let slant2 = '/';
 let space = " ";

//Function for printing triangles
function triangle(lines) {

//Error checking for arguments validity
    if ((arguments.length != 1) || (typeof(lines)!="number") || lines<=0){
        throw new UserException('Please pass only one parameter that is an integer greater than zero to the function');
    }

    //Using a loop to go through the number of lines and print the triangle
    for(i=0;i<=lines-1;i++){

        //Counting appropriate number of spaces for placement of vertical edges of the triangle
        numdashes=(lines-1)-i;

        //Counting appropriate number of spaces in between the vertical edges of the triangle
        numdashesbetween=i*2;

        str1="";
        str2="";

        if(numdashesbetween===0){
            str1="";
        }
        else if(numdashesbetween===(lines-1)*2){
            for(j=1;j<=numdashesbetween;j++){
                str1=str1+hordash;
            }
        }
        else{
            for(j=1;j<=numdashesbetween;j++){
                str1=str1+space;
            }     
        }

        if(numdashes===0){
            str2="";
        }
        else{
            for(j=1;j<=numdashes;j++){
                str2=str2+space;
            }
        }
        console.log(str2+slant2+str1+slant1+str2);
    } 
    //console.log("Print finished for lines: "+lines);
}


//Function for printing squares
function square(lines) {

    //Error checking for arguments validity
    if ((arguments.length != 1) || (typeof(lines)!="number") || lines<=1){
        throw new UserException('Please pass only one parameter that is an integer greater than one to the function');
    }

    //Using a loop to go through the number of lines and print the square
    for(i=1;i<=lines;i++){
        str="";
        if((i===1) || (i===lines)){
            for(count1=1;count1<=lines;count1++){
                str=str+hordash;
            }
        }

        else{
            for(count2=1;count2<=lines;count2++){
                str=str+space;
            }
        }

        console.log(verdash+str+verdash);
    
    }  
}


//Function for printing rhombus
function rhombus(lines) {
    
        //Error checking for arguments validity
        if ((arguments.length != 1) || (typeof(lines)!="number") || lines<=1 || (lines%2!=0)){
            throw new UserException('Please pass only one parameter that is an even integer greater than one to the function');
        }
    
        //Dividing lines by 2 to get number of iterations for the two 'for' loops
        let midpoint = lines/2;

        //Using a loop to go through the number of lines and print the upper part of rhombus
        for(upper=1;upper<=midpoint;upper++){

            //Counting appropriate number of spaces for placement of vertical edges of the rhombus
            unumdashes=midpoint-upper;
        
            //Counting appropriate number of spaces in between the vertical edges of the rhombus
            unumdashesbetween=(upper*2)-1;
    
            str1="";
            str2="";

            for(ucount1=0;ucount1<unumdashes;ucount1++){
                str1=str1+space;
            }

            for(ucount=1;ucount<=unumdashesbetween;ucount++){
                if(upper===1){
                    str2=str2+hordash;
                }
                else{
                    str2=str2+space;
                }
            }

            console.log(str1+slant2+str2+slant1+str1);
        }

        //Using a loop to go through the number of lines and print the lower part of rhombus
        for(lower=midpoint;lower>=1;lower--){

            //Counting appropriate number of spaces for placement of vertical edges of the rhombus
            lnumdashes=midpoint-lower;

            //Counting appropriate number of spaces in between the vertical edges of the rhombus
            lnumdashesbetween=(lower*2)-1;

            str3="";
            str4="";

            for(lcount1=0;lcount1<lnumdashes;lcount1++){
                str3=str3+space;
            }

            for(lcount=1;lcount<=lnumdashesbetween;lcount++){
                if(lower===1){
                    str4=str4+hordash;
                }
                else{
                    str4=str4+space;
                }
            }

            console.log(str3+slant1+str4+slant2+str3);

        }
}

//Testing the function
let testArray = [1,2,3,4,5,6,7,8,9,10,0,-1];

function testprintShape(funcName){
    for(counter=0;counter<testArray.length;counter++){
        try{
            funcName(testArray[counter]);
            console.log("\n");
        }
        catch(e){
            console.log(e.message, e.name);
        }
    }
}

testprintShape(triangle);
testprintShape(square);
testprintShape(rhombus);