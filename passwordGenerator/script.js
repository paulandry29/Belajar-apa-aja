const resultEl = document.getElementById('result');
const clipboardEl = document.getElementById('clipboard');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numberEl = document.getElementById('number');
const symbolEl = document.getElementById('symbol');
const generateEl = document.getElementById('generate');

const randomFunction = {
    lower : lowerRand,
    upper : upperRand,
    number : numberRand,
    symbol : symbolRand
} 

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = resultEl.innerText

    if(!password){return}

    textarea.value = password
    document.body.appendChild(textarea)
    
})
