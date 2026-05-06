// 🔹 Clé unique pour stocker les données dans le navigateur
const KEY = "budget_app";

// 🔹 Sauvegarder les données
export const saveToStorage = (data) => {

  // 👉 On convertit l'objet JS en JSON (texte)
  localStorage.setItem(KEY, JSON.stringify(data));
};


// 🔹 Charger les données
export const loadFromStorage = () => {

  const data = localStorage.getItem(KEY);

  // 👉 Si aucune donnée
  if (!data) return null;

  // 👉 Convertir JSON → objet JS
  return JSON.parse(data);
};