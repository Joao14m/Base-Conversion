/* Get the 8 values from the user, they must be 0 or 1
   If it's not 0 or 1, notify the user
   User view the result in the id=result
   For example: 
   00100101 = [(1) x 2^7] + [(1) x 2^6] + [(1) x 2^5] + 
              [(0) x 2^4] + [(0) x 2^3] + [(0) x 2^2] + 
              [(1) x 2^1] + [(1) x 2^0] 
            = [1 x 32] + [0 x 16] + [0 x 8] + [1 x 4] + [0 x 2] + [1 x 1]
            = 37 

    So the equation is:
    result = (input 128) x 2^7 + (input 64) x 2^6 + (input 32) x 2^5 + 
             (input 16) x 2^1 + (input 8) x 2^3 + (input 4) x 2^2 + 
             (input 2) x 2^1 + (input 1) x 2^0  
*/

function navigate(page){
    window.location.href = page;
}

function convertBinary(){
    // Get the main information from input
    var inputs = document.querySelectorAll('.box');
    var numbers = Array.from(document.querySelectorAll('.val')).map(el => parseInt(el.textContent));
    var arrInputs = [];
    var finalValue = 0;
    var back = inputs.length-1;

    // Push into the array
    for(var i = 0; i < inputs.length; i++){
        arrInputs.push(inputs[i].value);
    }

    // Make the above calculation to get the result
    for(var i = 0; i < inputs.length; i++){
        finalValue += arrInputs[i] * Math.pow(2, back);
        back--; 
    }

    // Display result
    var dis = document.getElementById("res");
    dis.value = finalValue;
}

function convertDecimal(){
    // Get the information from the inputs
    var inp = document.getElementById("binaryBox");
    var inpInt = parseInt(inp.value, 10);

    var newBase = document.getElementById("newBase");
    var newBaseInt = parseInt(newBase.value, 10);
    
    // Create array and number to keep track when 
    // calculating with the new base
    var arrRemainder = [];
    var number = inpInt;
    
    while(number > 0){
        var remainder = number % newBaseInt;
        arrRemainder.push(remainder);
        number = Math.floor(number / newBaseInt);
    }
    
    // Reverse the array
    arrRemainder.reverse();

    // If it's hexadecimal
    for(var i = 0; i < arrRemainder.length; i++){
        if(arrRemainder[i] > 9){
            if(arrRemainder[i] === 10)
                arrRemainder[i] = 'A';
            else if(arrRemainder[i] === 11)
                arrRemainder[i] = 'B';
            else if(arrRemainder[i] === 12)
                arrRemainder[i] = 'c';
            else if(arrRemainder[i] === 13)
                arrRemainder[i] = 'D';
            else if(arrRemainder[i] === 14)
                arrRemainder[i] = 'E';
            else if(arrRemainder[i] === 15)
                arrRemainder[i] = 'F';
        }
    }

    // Put in one element and display value
    var value = arrRemainder.join('');
    var dis = document.getElementById("res");
    dis.value = value;
}

function convertBases(){
    // Get the elements in the text
    var valueToConvert = document.getElementById("valueOfBase");
    var valueCurBase = document.getElementById("curBase");
    var valueNewBase = document.getElementById("newBase");

    // Convert them to integers
    // Needs to check Hexadecimal
    var valToConvInt; 

    if(isHex(valueToConvert.value)){
        valToConvInt = parseInt(parseInt(valueToConvert.value, 16),10);
        
    } else {
        valToConvInt = parseInt(valueToConvert.value, 10);
    }
    
    var valCurBaseInt = parseInt(valueCurBase.value, 10);
    var valNewBaseInt = parseInt(valueNewBase.value, 10);

    // Convert them values to an array and get their length 
    // for the recursion
    var arrNum = valToConvInt.toString().split('').map(Number);
    var arrLenght = arrNum.length - 1;

    // First Step: Convert to Base 10
    var base10Value = base10(arrNum, valCurBaseInt, arrLenght, 0);

    // Second Step: Conver to desire base
    var divNumber = base10Value;
    var result = [];
    while(divNumber > 0){
        var rem = divNumber % valNewBaseInt;
        result.push(rem);
        divNumber = Math.floor(divNumber / valNewBaseInt);
    } 

    for(var i = 0; i < result.length; i++){
        if(result[i] === 10)
            result[i] = 'A';
        else if(result[i] === 11)
            result[i] = 'B';
        else if(result[i] === 12)
            result[i] = 'c';
        else if(result[i] === 13)
            result[i] = 'D';
        else if(result[i] === 14)
            result[i] = 'E';
        else if(result[i] === 15)
            result[i] = 'F';
    }

    // Reverse the array and change to a single element
    result.reverse();
    var value = result.join('');
    
    // Result
    var dis = document.getElementById("res");
    dis.value = value;
}

// Recursion to get the base 10 conversion
function base10(num, base, idx, i){
    if(idx === 0){
        return num[i];
    }
    return num[i] * Math.pow(base, idx) + base10(num, base, idx - 1, i + 1);
}

function isHex(hex) {
    return /^[0-9A-Fa-f]+$/.test(hex);
}