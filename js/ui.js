import {
  getIncome,
  getExpenses,
  getBalance,
  getState
} from "./financeService.js";


// 🔹 Instance globale du graphique
let chart;


// =========================================================
// 🔤 FORMATAGE DES TYPES (income / expense)
// =========================================================

const translateType = (type) => {

  // 🔹 Conversion pour affichage utilisateur
  if (type === "income") return "Revenu";
  if (type === "expense") return "Dépense";

  return type;
};


// =========================================================
// 💰 FORMATAGE DES MONTANTS (FCFA)
// =========================================================

const formatMoney = (amount) => {

  // 🔹 Exemple : 50000 → 50 000 FCFA
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
};


// =========================================================
// 📅 FORMATAGE DE LA DATE
// =========================================================

const formatDate = (dateString) => {

  const date = new Date(dateString);

  // 🔹 Format lisible pour utilisateur
  return date.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};


// =========================================================
// 📊 DASHBOARD (revenus, dépenses, solde)
// =========================================================

export const renderDashboard = () => {

  document.getElementById("income").textContent =
    formatMoney(getIncome());

  document.getElementById("expenses").textContent =
    formatMoney(getExpenses());

  document.getElementById("balance").textContent =
    formatMoney(getBalance());
};


// =========================================================
// 📋 LISTE DES TRANSACTIONS
// =========================================================

export const renderTransactions = () => {

  const list = document.getElementById("list");

  // 🔹 Nettoyage avant re-render
  list.innerHTML = "";

  const { transactions } = getState();

  // 🔹 Affichage de chaque transaction
  transactions.forEach((t) => {

    const li = document.createElement("li");

    li.innerHTML = `
      <span>
        ${translateType(t.type)} - 
        ${t.category} - 
        ${formatMoney(t.amount)} - 
        ${formatDate(t.date)}
      </span>

      <!-- 🔹 bouton suppression -->
      <button data-id="${t.id}">❌</button>
    `;

    list.appendChild(li);
  });
};


// =========================================================
// 📊 GRAPHIQUE (Chart.js)
// =========================================================

export const renderChart = () => {

  const ctx = document.getElementById("chart");

  // 🔹 éviter duplication du graphique
  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: "doughnut",

    data: {
      labels: ["Revenus", "Dépenses"],

      datasets: [{
        data: [getIncome(), getExpenses()]
      }]
    },

    options: {
      responsive: true
    }
  });
};