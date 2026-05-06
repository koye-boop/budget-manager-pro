import {
  addTransaction,
  deleteTransaction
} from "./financeService.js";

import {
  renderDashboard,
  renderTransactions,
  renderChart
} from "./ui.js";


// =========================================================
// 🟢 AJOUT D'UNE TRANSACTION
// =========================================================

document.getElementById("form").addEventListener("submit", (e) => {

  // 🔹 Empêche le rechargement de la page
  e.preventDefault();

  // 🔹 Récupération des valeurs du formulaire
  const type = document.getElementById("type").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;

  // =========================================================
  // 🟡 CRÉATION DE L'OBJET TRANSACTION
  // =========================================================

  const transaction = {
    id: Date.now(), // 🔹 ID unique basé sur le timestamp

    type,           // income ou expense
    amount,         // montant
    category,       // catégorie

    // 🔹 AJOUT IMPORTANT : date et heure de création
    date: new Date().toISOString()
  };

  // 🔹 Ajout dans le service (logique métier)
  addTransaction(transaction);

  // 🔹 Mise à jour de l'interface
  renderDashboard();
  renderTransactions();
  renderChart();

  // 🔹 Reset du formulaire
  e.target.reset();
});


// =========================================================
// 🔴 SUPPRESSION D'UNE TRANSACTION
// =========================================================

document.getElementById("list").addEventListener("click", (e) => {

  // 🔹 On vérifie si on a cliqué sur un bouton
  if (e.target.tagName === "BUTTON") {

    const id = Number(e.target.dataset.id);

    // 🔹 Suppression dans la logique métier
    deleteTransaction(id);

    // 🔹 Mise à jour UI
    renderDashboard();
    renderTransactions();
    renderChart();
  }
});


// =========================================================
// 🚀 INITIALISATION DE L'APPLICATION
// =========================================================

renderDashboard();
renderTransactions();
renderChart();