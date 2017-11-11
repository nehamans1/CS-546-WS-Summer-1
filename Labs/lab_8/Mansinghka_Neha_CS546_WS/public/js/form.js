(function() {
  const palindromeCheckerMethod = {
    checkPalindrome(inputstring) {
      //Error checking of HTML form input provided by user
      if (!(inputstring) || typeof inputstring !== "string") throw "Must provide text";
      if (inputstring.length===0) throw "Must provide text";

      //Converting input text to lower case and stripping of all non-alphanumeric
      //characters including whitespaces
      let simplifiedtext = inputstring.toLowerCase();
      simplifiedtext = simplifiedtext.trim();
      simplifiedtext = simplifiedtext.replace(/[^A-Za-z0-9]/g, '');
      simplifiedtext = simplifiedtext.replace(/\s\s+/g, ' ');

      //Reversing the input text by splitting it into array of individual characters, then reversing 
      //the array and putting it back together as a string.
      let reverseStr = simplifiedtext.split('').reverse().join('');

      //Checking if reversed version of input text same as input text, if yes then it is a 
      //palindrome
      if(reverseStr===simplifiedtext){
        return "is-palindrome";
      }
      return "not-palindrome";
    }
  };

  /*function operationStringToFunction(operation) {
    if (!operation) throw "No operation provided";

    const returnFunction = calculatorMethods[operation];

    if (returnFunction === undefined) throw "No such operation";

    return returnFunction;
  }*/

  const staticForm = document.getElementById("static-form");

  if (staticForm) {
    // We can store references to our elements; it's better to
    // store them once rather than re-query the DOM traversal each time
    // that the event runs.
    const textElement = document.getElementById("text1");

    const errorContainer = document.getElementById("error-container");
    const errorTextElement = errorContainer.getElementsByClassName(
      "text-goes-here"
    )[0];
    const palindromeList = document.getElementById("palindromelist");
    const notpalindromeList = document.getElementById("notpalindromelist");

    // We can take advantage of functional scoping; our event listener has access to its outer functional scope
    // This means that these variables are accessible in our callback
    staticForm.addEventListener("submit", event => {
      event.preventDefault();

      try {
        // hide containers by default
        errorContainer.classList.add("hidden");
        errorTextElement.textContent = "";

        // Getting value of the form text input element
        const textValue = textElement.value;

        //Getting the palindrome checker method
        const operation = palindromeCheckerMethod["checkPalindrome"];

        //Calling the palindrome checker method on the input text
        const result = operation(textValue);

        //If palindrome checker method returns is-palindrome for the input text
        //then add the input text to palindrome list creating a li and span element and
        //setting the text for the span element to the input text value. Li and span elements
        //are added to unordered list with class 'is-palindrome' so they get displayed in
        //in the specified colour in the assignment.
        if(result==="is-palindrome"){
          var listItem = document.createElement('li');
          var listText = document.createElement('span');

          listItem.appendChild(listText);
          listText.textContent = textValue;
          palindromeList.appendChild(listItem);
        }
        //If palindrome checker method returns not-palindrome for the input text
        //then add the input text to notpalindrome list creating a li and span element and
        //setting the text for the span element to the input text value. Li and span elements
        //are added to unordered list with class 'not-palindrome' so they get displayed in
        //in the specified colour in the assignment.
        else{
          var listItem = document.createElement('li');
          var listText = document.createElement('span');

          listItem.appendChild(listText);
          listText.textContent = textValue;
          notpalindromeList.appendChild(listItem);
        }
      } catch (e) {
        const message = typeof e === "string" ? e : e.message;
        errorTextElement.textContent = e;
        errorContainer.classList.remove("hidden");
      }
    });
  }
})();
