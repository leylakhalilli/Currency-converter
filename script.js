
window.addEventListener('load', e => getInfo(e));

const form = document.forms[0];

form.addEventListener('input', e => getData(e));
async function getData(e) {
    const data = getFormData();
    const toValue = document.querySelector('input[name=to]');
    const fromValue = document.querySelector('input[name=from]');
   try{
    if (e.target.name !== 'to') {

        const currencies = await fetch(`https://api.exchangerate.host/latest?base=${data['value-left']}&symbols=${data['value-right']}`).then(response => response.json());
        const rate = currencies.rates[`${data['value-right']}`];


        if (data.from != '' && data.from != '.') {
            data.to = (data.from * rate).toFixed(2)
        } else {
            data.to = '';
            data.from = ''
            fromValue.value = ''
        }
        toValue.value = data.to;

    } else {
        const currencies = await fetch(`https://api.exchangerate.host/latest?base=${data['value-right']}&symbols=${data['value-left']}`).then(response => response.json());
        const rate = currencies.rates[`${data['value-left']}`]
        if (data.to != '' && data.to != '.') {
            data.from = (data.to * rate).toFixed(2)
        } else {
            data.to = ''
            data.from = '';
            toValue.value = ''
        }
        fromValue.value = data.from;
    }
   }
      catch(error){
                alertify("net err")
    }
}

     

function getFormData() {
    const formData = new FormData(form);
    const data = {};
    formData.forEach((v, k) => data[k] = v);
    return data
}


const CurrencyName = document.querySelectorAll('.valyuta-name')
CurrencyName.forEach(t => t.addEventListener('click', getInfo))

async function getInfo() {
    try{
        const data = getFormData();
    const currenciesLeft = await fetch(`https://api.exchangerate.host/latest?base=${data['value-left']}&symbols=${data['value-right']}`).then(response => response.json());
    const rateLeft = currenciesLeft.rates[`${data['value-right']}`];
    const leftText = document.querySelector('.left-text')
    leftText.innerHTML = `1 ${data['value-left']} = ${rateLeft.toFixed(4)} ${data['value-right']}`
    const currenciesRight = await fetch(`https://api.exchangerate.host/latest?base=${data['value-right']}&symbols=${data['value-left']}`).then(response => response.json());
    const rateRight = currenciesRight.rates[`${data['value-left']}`];
    const rightText = document.querySelector('.right-text')
    rightText.innerHTML = `1 ${data['value-right']} = ${rateRight.toFixed(4)} ${data['value-left']}`
    }
    catch(error){
        alertify("bad internet")
    }
}


const numberMask = IMask(
    document.querySelector('input[name=to]'), {
        mask: Number,
        radix: '.',
        mapToRadix: [',']
    });
const numberMaskk = IMask(
    document.querySelector('input[name=from]'), {
        mask: Number,
        radix: '.',
        mapToRadix: [',']
    });