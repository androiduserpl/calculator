const calculator = {
    displayValue: '0',
    firstOperand: null,
    waintingForSecondOperand: false,
    operator: null,
};

function inputDigit(digit) {
    const {
        displayValue, waintingForSecondOperand
    } = calculator;
    // Overwrite `displayValue` if the current value is '0' otherwise append to it

    if (waintingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waintingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    console.log(calculator);
}

function inputDecimal(dot) {

    if (calculator.waintingForSecondOperand === true) return;
    // If the `displayValue` does not contain a decimal point
    if (!calculator.displayValue.includes(dot)) {
        // Append the decimal point
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const {
        firstOperand,
        displayValue,
        operator
    } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waintingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }

    if (firstOperand === null) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const currentValue = firstOperand || 0;
        const result = performCalculation[operator](firstOperand, inputValue);

        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.waintingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}

const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand
};

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waintingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}


function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
};

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const {
        target
    } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('all-clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }

    inputDigit(target.value);
    updateDisplay();
    //console.log('digit', target.value);
});






/***** old version ******/

/*
var UIControler = function() {
    var DOMStrings = {
        button:  '.btn-num',
        display: '.view',
        equals: '.equals',
    }

    return {
        getDOMStrings: function () {
            return DOMStrings;
        }
    }
}

var valueOfButton =


var EventListener = function (UIControler) {
    var DOM = UIControler.getDOMStrings();

    document.querySelector(DOM.button).addEventListener('clck', )
}
*/
