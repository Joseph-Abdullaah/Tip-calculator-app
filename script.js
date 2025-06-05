// DOM Elements
const inputBill = document.getElementById('inp-bill');
const inputPeople = document.getElementById('inp-people');
const notZeroPeople = document.querySelector('.not-zero');
const tipButtons = document.querySelectorAll(".btn-tip");
const customTipInput = document.querySelector('.cus-tip');
const tipAmountValue = document.querySelector('.tip-amount-value');
const totalAmountValue = document.querySelector('.total-amount-value');
const resetButton = document.getElementById("reset-btn");

// Initial Setup
function initializeApp() {
    tipButtons.forEach(btn => btn.classList.remove('active'));
    tipButtons[2].classList.add('active');
    inputPeople.value = '1';
    inputBill.value = '';
    tipAmountValue.textContent = "$0.00";
    totalAmountValue.textContent = "$0.00";
    calculate();
}

// Core calculation functions
function getBill() {
    const bill = parseFloat(inputBill.value);
    return isNaN(bill) || bill < 0 ? 0 : bill;
}

function getPeople() {
    if (!inputPeople.value.trim()) {
        inputPeople.style.border = "";
        notZeroPeople.textContent = "";
        return 1;
    }

    const people = parseInt(inputPeople.value);
    
    if (people === 0) {
        inputPeople.style.border = "2px solid salmon";
        notZeroPeople.textContent = "Can't be zero";
        return 0;
    }

    if (!isNaN(people) && people > 0) {
        inputPeople.style.border = "";
        notZeroPeople.textContent = "";
        return people;
    }

    inputPeople.value = "";
    inputPeople.style.border = "";
    notZeroPeople.textContent = "";
    return 1;
}

function getTipPercent() {
    const activeButton = document.querySelector('.btn-tip.active');
    if (activeButton) {
        return parseFloat(activeButton.textContent) / 100;
    }
    const customTip = parseFloat(customTipInput.value);
    return isNaN(customTip) ? 0 : customTip / 100;
}

function calculate() {
    const bill = getBill();
    const people = getPeople();
    const tipPercent = getTipPercent();

    if (people === 0) {
        tipAmountValue.textContent = "$0.00";
        totalAmountValue.textContent = "$0.00";
        return;
    }

    const tipTotal = bill * tipPercent;
    const tipPerPerson = tipTotal / people;
    const totalPerPerson = (bill + tipTotal) / people;

    tipAmountValue.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalAmountValue.textContent = `$${totalPerPerson.toFixed(2)}`;
}

// Input validation and handling
function validateNumericInput(event, inputElement) {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', '.'];
    
    if (event.key === '.' && inputElement === inputBill) {
        if (inputElement.value.includes('.')) {
            event.preventDefault();
            return;
        }
        return;
    }
    
    if (!allowedKeys.includes(event.key) && !/^\d$/.test(event.key)) {
        event.preventDefault();
        return;
    }

    setTimeout(() => {
        const value = inputElement.value;
        const regex = inputElement === inputBill ? /[^\d.]/g : /[^\d]/g;
        const numericValue = value.replace(regex, '');
        
        if (inputElement === inputBill) {
            const parts = numericValue.split('.');
            if (parts.length > 2) {
                inputElement.value = parts[0] + '.' + parts.slice(1).join('');
            } else {
                inputElement.value = numericValue || '0';
            }
        } else {
            inputElement.value = numericValue;
        }
        calculate();
    }, 0);
}

function handleTipButtonClick(event) {
    tipButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    customTipInput.value = '';
    calculate();
}

function handleReset() {
    inputBill.value = '';
    inputPeople.value = '1';
    customTipInput.value = '';
    tipButtons.forEach(btn => btn.classList.remove('active'));
    tipButtons[2].classList.add('active');
    calculate();
}

// Event Listeners
tipButtons.forEach(btn => btn.addEventListener('click', handleTipButtonClick));
customTipInput.addEventListener('input', () => {
    tipButtons.forEach(btn => btn.classList.remove('active'));
    calculate();
});
inputBill.addEventListener('keydown', (e) => validateNumericInput(e, inputBill));
inputPeople.addEventListener('keydown', (e) => validateNumericInput(e, inputPeople));
resetButton.addEventListener('click', handleReset);
window.addEventListener('DOMContentLoaded', initializeApp);


