"use strict";

// Accounts Data
const accounts = [
  {
    owner: "Rasheed Ahmad",
    movements: [200, 455, -306.5, 2500, -642, -133.19, 279, 1300],
    interestRate: 1.2,
    pin: 1111,
    movementsDates: [
      "2024-11-18T21:31:17.178Z",
      "2024-12-23T07:42:02.383Z",
      "2025-01-28T09:15:04.904Z",
      "2025-04-11T10:17:24.185Z",
      "2025-04-25T14:11:59.604Z",
      "2025-05-25T17:01:17.194Z",
      "2025-05-29T23:36:17.929Z",
      "2025-05-30T10:51:36.790Z",
    ],
    currency: "EUR",
    locale: "en-GB",
  },
  {
    owner: "Javid Ali Khan",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: [
      "2019-11-01T13:15:33.035Z",
      "2019-11-30T09:48:16.867Z",
      "2019-12-25T06:04:23.907Z",
      "2020-01-25T14:18:46.235Z",
      "2020-02-05T16:33:06.386Z",
      "2020-04-10T14:43:26.374Z",
      "2020-06-25T18:49:59.371Z",
      "2020-07-26T12:01:20.894Z",
    ],
    currency: "USD",
    locale: "en-US",
  },
  {
    owner: "Noor Ullah",
    movements: [1000, 500, -206.5, 25000, -845, -1300.91, 179.97, 1500],
    interestRate: 1.2,
    pin: 3333,
    movementsDates: [
      "2020-01-18T21:31:17.178Z",
      "2020-02-23T07:42:02.383Z",
      "2020-04-28T09:15:04.904Z",
      "2019-09-01T10:17:24.185Z",
      "2020-05-08T14:11:59.604Z",
      "2021-11-01T17:01:17.194Z",
      "2021-12-04T23:36:17.929Z",
      "2021-12-07T10:51:36.790Z",
    ],
    currency: "EUR",
    locale: "pt-PT",
  },
  {
    owner: "Rafiq Khan",
    movements: [3000, 4450, -1100, -650, -3210, -1300, 8000, -400],
    interestRate: 1.4,
    pin: 4444,
    movementsDates: [
      "2019-06-01T13:15:33.035Z",
      "2019-08-30T09:48:16.867Z",
      "2019-11-25T06:04:23.907Z",
      "2020-10-25T14:18:46.235Z",
      "2020-04-05T16:33:06.386Z",
      "2020-05-10T14:43:26.374Z",
      "2020-06-25T18:49:59.371Z",
      "2020-07-26T12:01:20.894Z",
    ],
    currency: "USD",
    locale: "en-US",
  },
];

// DOM Elements
const elements = {
  labels: {
    welcome: document.querySelector(".welcome"),
    date: document.querySelector(".date"),
    balance: document.querySelector(".balance__value"),
    sumIn: document.querySelector(".summary__value--in"),
    sumOut: document.querySelector(".summary__value--out"),
    sumInterest: document.querySelector(".summary__value--interest"),
    timer: document.querySelector(".timer"),
  },
  containers: {
    app: document.querySelector(".app"),
    movements: document.querySelector(".movements"),
  },
  buttons: {
    login: document.querySelector(".login__btn"),
    transfer: document.querySelector(".form__btn--transfer"),
    loan: document.querySelector(".form__btn--loan"),
    close: document.querySelector(".form__btn--close"),
    sort: document.querySelector(".btn--sort"),
  },
  inputs: {
    loginUsername: document.querySelector(".login__input--user"),
    loginPin: document.querySelector(".login__input--pin"),
    transferTo: document.querySelector(".form__input--to"),
    transferAmount: document.querySelector(".form__input--amount"),
    loanAmount: document.querySelector(".form__input--loan-amount"),
    closeUsername: document.querySelector(".form__input--user"),
    closePin: document.querySelector(".form__input--pin"),
  },
};

// Global State
let currentAccount, timer;
let sorted = false;

// Utility Functions
const formatMovementsDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return Intl.DateTimeFormat(locale).format(date);
};

const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const clearInputs = function (...inputs) {
  inputs.forEach((input) => (input.value = ""));
};

const resetTimer = function () {
  if (timer) clearInterval(timer);
  timer = startLogOutTimer();
};

// Account Management Functions
const createUsernames = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

const findAccount = function (username) {
  return accounts.find((account) => account.username === username);
};

const validateAccount = function (account, pin) {
  return account?.pin === Number(pin);
};

// Display Functions
const displayMovements = function (account, sort = false) {
  elements.containers.movements.innerHTML = "";

  const movements = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movements.forEach((movement, i) => {
    const type = movement > 0 ? "deposit" : "withdrawal";
    const date = new Date(account.movementsDates[i]);
    const displayDate = formatMovementsDate(date, account.locale);
    const formattedAmount = formatCurrency(
      movement,
      account.locale,
      account.currency
    );

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedAmount}</div>
      </div>
    `;

    elements.containers.movements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce(
    (acc, movement) => acc + movement,
    0
  );
  elements.labels.balance.textContent = formatCurrency(
    account.balance,
    account.locale,
    account.currency
  );
};

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter((movement) => movement > 0)
    .reduce((acc, movement) => acc + movement, 0);
  elements.labels.sumIn.textContent = formatCurrency(
    incomes,
    account.locale,
    account.currency
  );

  const outcomes = account.movements
    .filter((movement) => movement < 0)
    .reduce((acc, movement) => acc + movement, 0);
  elements.labels.sumOut.textContent = formatCurrency(
    Math.abs(outcomes),
    account.locale,
    account.currency
  );

  const interest = account.movements
    .filter((movement) => movement > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((acc, interest) => acc + interest, 0);
  elements.labels.sumInterest.textContent = formatCurrency(
    interest,
    account.locale,
    account.currency
  );
};

const updateUI = function (account) {
  displayMovements(account);
  calcDisplayBalance(account);
  calcDisplaySummary(account);
};

const displayLoginSuccess = function (account) {
  const firstName = account.owner.split(" ")[0];
  elements.labels.welcome.textContent = `Welcome back, MR./MS. ${firstName}`;
  elements.containers.app.style.opacity = 100;

  const now = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };

  elements.labels.date.textContent = new Intl.DateTimeFormat(
    account.locale,
    options
  ).format(now);
};

const hideUI = function () {
  elements.labels.welcome.textContent = "Log In to get started";
  elements.containers.app.style.opacity = 0;
};

// Timer Functions
const startLogOutTimer = function () {
  let time = 300;

  const tick = function () {
    const minutes = String(Math.trunc(time / 60)).padStart(2, 0);
    const seconds = String(time % 60).padStart(2, 0);

    elements.labels.timer.textContent = `${minutes}:${seconds}`;

    if (time === 0) {
      clearInterval(timer);
      hideUI();
    }

    time--;
  };

  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

// Transaction Functions
const addMovement = function (account, amount) {
  account.movements.push(amount);
  account.movementsDates.push(new Date().toISOString());
};

const executeTransfer = function (senderAccount, receiverAccount, amount) {
  addMovement(senderAccount, -amount);
  addMovement(receiverAccount, amount);
};

const validateTransfer = function (amount, receiverAccount, senderAccount) {
  return (
    amount > 0 &&
    receiverAccount &&
    senderAccount.balance >= amount &&
    receiverAccount?.username !== senderAccount.username
  );
};

const validateLoan = function (amount, account) {
  return (
    amount > 0 && account.movements.some((movement) => movement >= amount * 0.1)
  );
};

const validateAccountClosure = function (username, pin, currentAccount) {
  return (
    username === currentAccount.username && Number(pin) === currentAccount.pin
  );
};

// Event Handlers
const handleLogin = function (e) {
  e.preventDefault();

  const username = elements.inputs.loginUsername.value;
  const pin = elements.inputs.loginPin.value;
  const account = findAccount(username);

  if (validateAccount(account, pin)) {
    currentAccount = account;
    displayLoginSuccess(currentAccount);
    clearInputs(elements.inputs.loginUsername, elements.inputs.loginPin);
    elements.inputs.loginPin.blur();
    resetTimer();
    updateUI(currentAccount);
  }
};

const handleTransfer = function (e) {
  e.preventDefault();

  const amount = Number(elements.inputs.transferAmount.value);
  const receiverAccount = findAccount(elements.inputs.transferTo.value);

  clearInputs(elements.inputs.transferAmount, elements.inputs.transferTo);

  if (validateTransfer(amount, receiverAccount, currentAccount)) {
    executeTransfer(currentAccount, receiverAccount, amount);
    updateUI(currentAccount);
    resetTimer();
  }
};

const handleLoan = function (e) {
  e.preventDefault();

  const loanAmount = Math.floor(elements.inputs.loanAmount.value);

  if (validateLoan(loanAmount, currentAccount)) {
    setTimeout(function () {
      addMovement(currentAccount, loanAmount);
      updateUI(currentAccount);
      resetTimer();
    }, 2500);
  }

  elements.inputs.loanAmount.value = "";
};

const handleAccountClosure = function (e) {
  e.preventDefault();

  const username = elements.inputs.closeUsername.value;
  const pin = elements.inputs.closePin.value;

  if (validateAccountClosure(username, pin, currentAccount)) {
    const accountIndex = accounts.findIndex(
      (account) => account.username === currentAccount.username
    );
    accounts.splice(accountIndex, 1);
    hideUI();
  }

  clearInputs(elements.inputs.closeUsername, elements.inputs.closePin);
};

const handleSort = function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
};

// Initialize Application
const initApp = function () {
  createUsernames(accounts);

  // Event Listeners
  elements.buttons.login.addEventListener("click", handleLogin);
  elements.buttons.transfer.addEventListener("click", handleTransfer);
  elements.buttons.loan.addEventListener("click", handleLoan);
  elements.buttons.close.addEventListener("click", handleAccountClosure);
  elements.buttons.sort.addEventListener("click", handleSort);
};

// Start Application
initApp();
