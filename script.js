console.log('Calculator script loaded')

const currentOperand = document.querySelector('.current-operand');
const previousOperand = document.querySelector('.previous-operand');
const currentOperator = document.querySelector('.current-operator');
const buttons = document.querySelectorAll('.btn');
const controlBtns = document.querySelectorAll('.control');
const operatorBtns = document.querySelectorAll('.operator');
const numberBtns = document.querySelectorAll('.number');
const equalsBtn = document.querySelector('.equals')

let currentValue ='';
let previousValue = '';
let currentOperatorValue =null;



numberBtns.forEach((button)=>{
  button.addEventListener('click', () => {
    const btnValue =button.innerText;
    
  if (btnValue=== '.') {
    if(!currentOperand.innerText.includes('.')){
      currentOperand.innerText+='.';
    }
    return
  }
  
  if (currentOperand.innerText ==='0') {
    currentOperand.innerText = btnValue;
  } else{
    currentOperand.innerText += btnValue
  }
})
})

operatorBtns.forEach((button) => {
  button.addEventListener('click', () => {
  previousOperand.innerText = currentOperand.innerText
  previousValue = previousOperand.innerText
  
  currentOperator.innerText= button.innerText
  currentOperand.innerText =''
  currentOperatorValue = currentOperator.innerText
  
  })
})

equalsBtn.addEventListener('click', ()=> {
  if (!previousValue || !currentOperatorValue) return;
  
  currentValue = currentOperand.innerText
  let firstNumber = parseFloat(previousValue);
  let secondNumber = parseFloat(currentValue)
  let result;
  switch(currentOperatorValue){
    case '+':
      result = firstNumber + secondNumber;
      break;
    case '-':
      result = firstNumber - secondNumber;
      break;
    case '×':
      result = firstNumber * secondNumber;
      break;
    case '÷':
      result = firstNumber / secondNumber;
      break;
    case '%':
      result = firstNumber % secondNumber;
      break;
  }
  
  currentOperand.innerText = result;
  previousOperand.innerText = '';
  currentOperator.innerText = '';
  currentOperatorValue = null;
  previousValue = '';
})