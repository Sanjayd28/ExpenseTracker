// Get elements from the DOM
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const addExpenseBtn = document.getElementById('add-expense-btn');
const expensesList = document.getElementById('expenses-list');
const totalAmount = document.getElementById('total-amount');
const monthlyIncomeInput = document.getElementById('monthly-income');
const spendingLimitInput = document.getElementById('spending-limit');

// Load expenses, income, and spending limit from local storage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let income = parseFloat(localStorage.getItem('income'));
let spendingLimit = parseFloat(localStorage.getItem('spendingLimit'));

// If income or spending limit is not present in local storage, set them to Nan
income = isNaN(income) ? NaN : income;
spendingLimit = isNaN(spendingLimit) ? NaN : spendingLimit;

// Set placeholders for monthly income and spending limit
// monthlyIncomeInput.placeholder = isNaN(income) ? "Monthly Income" : income.toFixed(2);
// spendingLimitInput.placeholder = isNaN(spendingLimit) ? "Spending Limit" : spendingLimit.toFixed(2);

// Function to render expenses
function renderExpenses() {
    expensesList.innerHTML = '';
    let total = 0;

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.name} - $${expense.amount}
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        expensesList.appendChild(li);
        total += parseFloat(expense.amount);
    });

    totalAmount.textContent = total.toFixed(2);
    monthlyIncomeInput.value = income.toFixed(2);
    spendingLimitInput.value = spendingLimit.toFixed(2);

    // Check if spending limit is reached
    if (spendingLimit > 0 && total > spendingLimit) {
        // Display popup message
        alert("Spending limit reached! Stop spending more money.");
        // Play sound alarm
        playAlarmSound();
    }
}

// Function to add a new expense
function addExpense() {
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());

    if (name && amount) {
        expenses.push({ name, amount });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
        expenseNameInput.value = '';
        expenseAmountInput.value = '';
    }
}

// Function to delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
}

// Function to play sound alarm
function playAlarmSound() {
    // Play sound here
    // Example using HTML5 Audio element
    const audio = new Audio('alarm.mp3'); // Replace 'alarm.mp3' with your sound file
    audio.play();
}

// Event listeners
addExpenseBtn.addEventListener('click', addExpense);
expensesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.getAttribute('data-index');
        deleteExpense(index);
    }
});

monthlyIncomeInput.addEventListener('change', () => {
    income = parseFloat(monthlyIncomeInput.value.trim()) || 0;
    localStorage.setItem('income', income);
});

spendingLimitInput.addEventListener('change', () => {
    spendingLimit = parseFloat(spendingLimitInput.value.trim()) || 0;
    localStorage.setItem('spendingLimit', spendingLimit);
});

// Event listener for the expense amount input field to add expense on pressing "Enter" key
expenseAmountInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        addExpense();
    }
});

// Initial render
renderExpenses();
