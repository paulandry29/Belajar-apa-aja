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
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password copied to Clipboard')
})

generateEl.addEventListener('click', () => {
    if(lengthEl.value > 20){
        lengthEl.value = 20
        alert('Maximum number of password is 20')
    }else if(lengthEl.value < 8){
        lengthEl.value = 8
        alert('Minimum number of password is 8 for more scure')
    }else{
        lengthEl.value = lengthEl.value
    }

    const length = +lengthEl.value
    const hasUpper = uppercaseEl.checked
    const hasLower = lowercaseEl.checked
    const hasSymbol = symbolEl.checked
    const hasNumber = numberEl.checked

    resultEl.innerText = generatePassword(hasUpper, hasLower, hasSymbol, hasNumber, length)
})

function generatePassword(upper, lower, symbol, number, length){
    let generatePassword = ''
    const typeCount = upper + lower + symbol + number
    const typeArr = [{upper}, {lower}, {symbol}, {number}].filter(item => Object.values(item)[0])

    if(typeCount === 0){
        return ''
    }

    for(let i = 0; i < length; i += typeCount){
        typeArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatePassword += randomFunction[funcName]()
        })
    }

    const finalPassword = generatePassword.slice(0, length)

    return finalPassword
}

function lowerRand() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function upperRand() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function numberRand() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function symbolRand() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}
