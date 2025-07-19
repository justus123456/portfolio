const display = document.querySelector(".screen");
const dele = document.querySelector('#on');
const equal = document.querySelector('#opp');
const clr = document.querySelector('#oned');
const but = document.querySelectorAll('.ones');

// code  for button fuctions and screen display 
but.forEach((ones)=>{
    ones.addEventListener('click',()=>{
        if(display.innerText.length > 11){
            display.innerText = display.innerText;
        }
        else if(ones.innerText == '.'){
            display.innerText += ones.innerText
        }
        else if(display.innerText == "0"){
            display.innerText = ones.innerText;
        }
        else{
            display.innerText += ones.innerText;
        }
    });
});

// code to clear text on the screen
clr.addEventListener('click',()=>{
    display.innerText = "0";
})

// code to delete number Sequentially on the Screen
dele.addEventListener('click',()=>{
    if(display.innerText.length <= '1'){
        display.innerText = '0';
    }else{
        display.innerText = display.innerText.slice(0,-1)
    }
})

// code to find the solution to the equations
equal.addEventListener('click',()=>{
    try {
        const result = eval(display.innerText);
        display.innerText = result;
        
    } catch  {
        display.innerText = "Syntax Error";
        
    }
    
})

