import { saveToStorage, loadFromStorage } from "./storage.js";

// 🔹 Charger les données existantes
const savedData = loadFromStorage();

// 🔹 État global
let state = savedData || {
  transactions: []
};

// 🔹 Récupérer le state
export const getState = () => state;


// 🔹 Ajouter transaction
export const addTransaction = (transaction) => {

  // 👉 immutabilité (nouvel objet)
  state = {
    ...state,
    transactions: [...state.transactions, transaction]
  };

  // 👉 sauvegarde
  saveToStorage(state);
};


// 🔹 Supprimer transaction
export const deleteTransaction = (id) => {

  state = {
    ...state,
    transactions: state.transactions.filter(t => t.id !== id)
  };

  saveToStorage(state);
};


// 🔹 Revenus
export const getIncome = () => {
  return state.transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);
};


// 🔹 Dépenses
export const getExpenses = () => {
  return state.transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);
};


// 🔹 Solde
export const getBalance = () => {
  return getIncome() - getExpenses();
};