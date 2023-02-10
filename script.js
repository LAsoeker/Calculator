class Calculator{
  constructor(){}

  clear(){
    this.previousOperand = '';
    this.currentOperand = '';
    this.currentOperation = undefined;
  }
}

const OPERATORS = ['+','-','*','/'];

const numberKeys = document.querySelectorAll('[data-value]');
const operationKeys = document.querySelectorAll('[data-operation]')
const displayInput = document.querySelector('#output-input');
const displayOutput = document.querySelector('[data-output-result]');
const operateKey = document.querySelector('#key-operate');
const clearKey = document.querySelector('#key-clear');

let previousOperand = '';
let currentOperand = '';
let currentOperation = undefined;
let result = undefined;

for (let i=0; i< numberKeys.length; i++){
  numberKeys[i].addEventListener('click', function(){
    appendNumber(this.dataset.value);
    updateDisplay();
  })
}

operationKeys.forEach(key => key.addEventListener('click', function(){
  setOperation(this.dataset.operation);
}))

clearKey.addEventListener('click', clear);
operateKey.addEventListener('click', calcResult);

function clear(){
  previousOperand = '';
  currentOperand = '';
  currentOperation = undefined;
  updateDisplay();
}

function appendNumber(number){
  if(number === '.' && currentOperand.includes('.')) return;
  if(result){
    result = undefined;
    currentOperand = '';
  }
  currentOperand += number.toString();
}

function setOperation(operator){
  if(currentOperation) {
    previousOperand = operate(currentOperation, parseFloat(previousOperand), parseFloat(currentOperand));
  }else{
    previousOperand = currentOperand;
  }
  currentOperand = '';
  currentOperation = operator; 
  updateDisplay();
}

function updateDisplay(){
  if (currentOperation === undefined){
    displayInput.textContent = `${currentOperand}`;
  }
  else{
    displayInput.textContent = `${previousOperand}${currentOperation}${currentOperand}`;
  }
  displayOutput.textContent = '';
}

function calcResult(){
  result = operate(currentOperation, parseFloat(previousOperand), parseFloat(currentOperand))
  if(currentOperand === '' || currentOperation === undefined) return;
  displayOutput.textContent = result;
  previousOperand = '';
  currentOperand = result; 
  currentOperation = undefined;
}

function add(a,b){
  return a+b;
}

function substract(a,b){
  return a-b;
}

function multiply(a,b){
  return a*b;
}

function divide(a,b){
  return a/b;
}

function operate(operator, num1, num2){
  console.log(num1)
  console.log(num2)
  if(!OPERATORS.some(ele => ele === operator)) return 'ERROR!';
  switch (operator){
    case '+':
      return add(num1, num2);
    case '-':
      return substract(num1, num2);
    case '*':
      return multiply(num1, num2);
    case '/':
      return divide(num1, num2);
  }
}