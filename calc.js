let runningTotal = 0; //clac working...keeping record of everything typed
let buffer = "0"; //user types a number 
let prevOperator;
const screen = document.querySelector(".screen");

document.querySelector('.calc-buttons').addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
})


function rerender() {
    screen.innerText = buffer;
}


function buttonClick(value) {
    //2 ways if its a number separate way...if its a word different way
    //parseInt takes string and returns a number
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    }
    else {
        handleNumber(value);

    }
    rerender();
}
function handleNumber(value) {
    if (buffer === '0') {
        buffer = value;
    }
    else {
        buffer += value;
    }


}



function handleSymbol(value) {
    switch (value) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            prevOperator = null;
            break;
        case "=":
            if (prevOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer)); //turn buffer string into number and return
            prevOperator = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;

        case "←":
            if (buffer.length === 1) {
                buffer = "0";
            }
            else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        default:
            handleMath(value);
            break;




    }

}

function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;

    } else {
        flushOperation(intBuffer);
    }

    prevOperator = value;
    buffer = "0";

}

function flushOperation(intBuffer) {
    if (prevOperator === "+") {
        runningTotal += intBuffer;

    }
    else if (prevOperator === "-") {
        runningTotal -= intBuffer;
    }
    else if (prevOperator === "x") {
        runningTotal = runningTotal * intBuffer;
    }
    else if (prevOperator === "÷") {
        runningTotal = runningTotal / intBuffer;
    }
}

