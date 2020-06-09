let balance = document.getElementById('balance')
let money_plus = document.getElementById('money-plus')
let money_minus = document.getElementById('money-minus');
let list = document.getElementById('list')
let form = document.getElementById('form')
let text = document.getElementById('text')
let amount = document.getElementById('amount')
let id = 4;

const dummyTransactions = [
    { id: 1, text: 'Flower', amount: -20 },
    { id: 2, text: 'Salary', amount: 300 },
    { id: 3, text: 'Book', amount: -10 },
    { id: 4, text: 'Camera', amount: 150 }
];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions: dummyTransactions;

// Add Transactions to the DOM:
function addTransactionDOM(transaction) {
    // Get Sign:
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // Add Class based on Value:
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} 
        <span> ${sign}${Math.abs(transaction.amount)} </span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})"> x </button> 
    `; 
    
    list.appendChild(item);
}

// Init App:
function init() {
    list.innerHTML = ``;
    console.log('Hi');
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

// Update the balance Income and Expense:

function updateValues() {
    const amount = transactions.map(transaction => transaction.amount );
    const total = amount.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amount.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = (amount.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);
    balance.innerText = `INR ${total}`;
    money_plus.innerText = `INR ${income}`;
    money_minus.innerText = `INR ${expense}`;
}

// Adding and Deleting Transactions:

form.addEventListener('submit', addTransaction);

function addTransaction (e) {
    e.preventDefault();

    if (text.value.trim() == '' || amount.value.trim() == ''){
        alert('Please Add a Text and Amount');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value = '';
        amount.value = '';
    }
}

function generateID() {
    return ++id;
}

//Remove Transaction:
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

// Update Local Storage:
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// function addUpdateFeature(e) {

//     let element = document.getElementById('upamount');
//     if (element == null || element == undefined) {
//         e.target.innerHTML += `<form id="form update">
//         <br>
//         <div class="update_form">
//         <input type="number" id="upamount" placeholder="Update Amount">
//         <button class="upbtn" id="update">Update</button>
//         <button class="upbtn" id="cancel">Cancel</button>
//         </div>
//         </form>`;
//         // Cancel Button 
//         document.getElementById('cancel').addEventListener('click', cancelUpdate);

//         function cancelUpdate(e) {
//             init();
//         }

//         // Update Items:
//         document.getElementById('update').addEventListener('click', Update);

//         function Update(e) {
//             console.log(e.target.parentElement.parentElement.parentElement);
//             e.preventDefault();
//         }
//     }
// }

// document.getElementById('list').addEventListener('click', addUpdateFeature);







