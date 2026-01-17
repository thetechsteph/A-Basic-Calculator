console.log('Calculator script loaded')

const currentOperand = document.querySelector('.current-operand');
const previousOperand = document.querySelector('.previous-operand');
const resultDisplay = document.querySelector('.result-display');
const currentOperator = document.querySelector('.current-operator');
const buttons = document.querySelectorAll('.btn');
const controlBtns = document.querySelectorAll('.control');
const operatorBtns = document.querySelectorAll('.operator');
const numberBtns = document.querySelectorAll('.number');
const equalsBtn = document.querySelector('.equals');

let expression =[];
let currentValue = '';




const precedence ={
  '+': 1,
  '-': 1,
  '×': 2,
  '÷': 2,
  '%': 2,
};


function toPostFix(expr) {
  let output = [];
  let stack = [];
  
  for(let token of  expr){
    if (!isNaN(token)){
      output.push(token);
    } else{
      
      while(stack.length && precedence[stack[stack.length - 1]] >= precedence[token]) {
        output.push(stack.pop())
      }
      stack.push(token);
    }
  }
  while(stack.length){
    output.push(stack.pop());
  }
  return output;
}
 
function evaluatePostfix(postfix) {
  let stack = [];

  for (let token of postfix) {
    if (!isNaN(token)) {
      stack.push(Number(token));
    } else {
      let b = stack.pop();
      let a = stack.pop();

      if (token === '+') stack.push(a + b);
      if (token === '-') stack.push(a - b);
      if (token === '×') stack.push(a * b);
      if (token === '÷') stack.push(a / b);
      if (token === '%') stack.push(a % b);
    }
  }

  return stack[0];
}


const updateLivePreview = () => {
  if (expression.length === 0 || expression.length===1) {
    resultDisplay.innerText = '';
    return;
  }

  const lastItem = expression[expression.length - 1];


  if (isNaN(lastItem)) {
    resultDisplay.innerText = '';
    return;
  }

  const postfix = toPostFix(expression);
  const result = evaluatePostfix(postfix);

  resultDisplay.innerText = result;
}
numberBtns.forEach(button => {
  button.addEventListener('click', ()=> {
    const buttonValue = button.innerText;
    const lastItem = expression[expression.length -1];
    
    if (buttonValue === '.' && (!lastItem || isNaN(lastItem))) {
      expression.push('0.');
      currentValue= '0.'
      updateLivePreview()
      
      previousOperand.innerText = expression.join(' ');
      return;
    }
    
    if (buttonValue === '.' && lastItem && lastItem.includes('.')) {
      return;
    }
    
    if (lastItem && !isNaN(lastItem)) {
      expression[expression.length - 1] = lastItem + buttonValue
    }else {
      expression.push(buttonValue);
    }
    
    currentValue = expression[expression.length - 1];
    updateLivePreview()
    
    previousOperand.innerText = expression.join(' ');
  })
})

operatorBtns.forEach(button => {
  button.addEventListener('click', () => {
    const operator = button.innerText;
    const lastItem = expression[expression.length -1]
    if(!expression.length) return;
    
    if(lastItem && isNaN(lastItem)){
      expression [expression.length -1] = operator;
    } else{
      expression.push(operator);
    }
    currentValue = '';
    updateLivePreview()
  previousOperand.innerText = expression.join(' ');
  })
})


equalsBtn.addEventListener('click', () => {
  if (expression.length === 0) return;

  const lastItem = expression[expression.length - 1];
  if (isNaN(lastItem)) return;

  const postfix = toPostFix(expression);
  const result = evaluatePostfix(postfix);

  previousOperand.innerText = result;
  currentOperand.innerText = '';
  resultDisplay.innerText = '';
  expression = [String(result)];
});




controlBtns.forEach(button => {
  button.addEventListener('click', () => {
    let action = button.dataset.action;
    if(action ==='clear'){
      expression = []
currentValue = ''
previousOperand.innerText = ''
currentOperand.innerText = ''
resultDisplay.innerText = ''
    } 
    if (action === 'delete') {

  if (currentValue !== '') {
    currentValue = currentValue.slice(0, -1);
    currentOperand.innerText = currentValue;

  
    expression[expression.length - 1] = currentValue;


    if (currentValue === '') {
      expression.pop();
    }
  } 
  else if (expression.length > 0) {
    expression.pop();
  }

  previousOperand.innerText = expression.join(' ');
updateLivePreview()
}
  })
})