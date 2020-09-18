function Calculator(parentClass) {
    this.displayValue = "0";
    this.firstOperand = null;
    this.operator = null;
    this.waitingNextOperand = false;

    this.$parent = document.querySelector(parentClass);
    this.$display = document.querySelector(`${parentClass} > .calculator-display`);

    this.init = function() {
        this.attachEvents();
    }
    this.doCalculations = {
        "+": (first, second) => first + second,
        "-": (first, second) => first - second,
        "*": (first, second) => first * second,
        "/": (first, second) => first / second,
        "=": (first, second) => second,
        "^": (first, second) => Math.pow(first, second),
        "√": (first, second) => Math.sqrt(first),
        "%": (first, second) => ((first / 100) * second)
    }
    
    this.attachEvents = function() {
        const buttons = document.querySelectorAll(`${parentClass} > .calculator-buttons > button`);
        console.log(buttons);
    

    buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
            if(event.target.classList.contains("operator")) {
                this.onOperatorClick(event.target.value);
                this.display();
                return;
            }

            if(event.target.classList.contains("dot")) {
                this.inputDecimal(event.target.value);
                this.display();
                return; 
            }

            if (event.target.classList.contains("reset")) {
                this.resetCalculator();
                this.display();
                return;
              }

            this.inputDigit(event.target.value);
            this.display();
        })
    });
};

this.display = function() {
    this.$display.value = this.displayValue;
}

this.onOperatorClick = function(operator) {
    const value = parseFloat(this.displayValue);

    if(this.firstOperand === null) {
        this.firstOperand = value;
    } else if(this.operator) {
        const result = this.doCalculations[this.operator](this.firstOperand, value);

        this.displayValue = String(result);
        this.firstOperand = result;
    }

    this.waitingNextOperand = true;
    this.operator = operator;

}

this.resetCalculator = function() {
    this.displayValue = "0";
    this.firstOperand = null;
    this.operator = null;
    this.waitingNextOperand = false;
}

this.inputDecimal = function(dot) {
    if(!this.displayValue.includes(dot)) {
        this.displayValue = this.displayValue + dot
    }
}

this.inputDigit = function(digit) {
    if(this.waitingNextOperand) {
        this.displayValue = digit;
        this.waitingNextOperand = false;
    } else {
    this.displayValue = this.displayValue === "0" ? digit : this.displayValue + digit;
    console.log(this.displayValue);
    }
}
}

const calc = new Calculator(".calculator");
calc.init();