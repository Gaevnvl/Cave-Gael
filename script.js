const app = document.getElementById('app');
const params = new URLSearchParams(window.location.search);
const code = params.get("bouteille");

if (!code) {
  app.innerHTML = "<p style='color:red;'>Aucun code fourni.</p>";
} else {
  fetch(`https://api.airtable.com/v0/appdQVQxbkXnm7gjR/Table%20Bouteilles?filterByFormula={Code%20Bouteille}='${code}'`, {
    headers: {
      Authorization: "Bearer patOIYkgCUGq3NeCt.9cb9723b95bd50a90d35fc93e25e5b5c49ef7de9b3ade2905199bb3b4756e2b3
    }
  })
  .then(res => res.json())
  .then(data => {
    if (data.records.length === 0) {
      app.innerHTML = "<p style='color:red;'>Aucune fiche trouvée pour ce code.</p>";
    } else {
      const f = data.records[0].fields;
      app.innerHTML = `
        <h1>Cave de Gaël</h1>
        <h2>${f["Nom du vin"] || code}</h2>
        <p><strong>Domaine :</strong> ${f["Domaine"] || "—"}</p>
        <p><strong>Millésime :</strong> ${f["Millésime"] || "—"}</p>
        <p><strong>Quantité :</strong> ${f["Quantité en cave"] || "—"}</p>
        <p><strong>Apogée :</strong> ${f["Apogée"] || "—"}</p>
        <p><strong>Commentaire :</strong> ${f["Commentaires dégustation"] || "—"}</p>
      `;
    }
  })
  .catch(err => {
    console.error(err);
    app.innerHTML = "<p style='color:red;'>Erreur lors de la récupération des données.</p>";
  });
}
