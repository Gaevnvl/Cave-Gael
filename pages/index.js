import { useEffect, useState } from "react";

const Airtable_API_KEY = "patOIYkgCUGq3NeCt.7ccae77cead1c9c758644870cf18ffaa82b89b131b8dd64a945608344ef7c07b";
const BASE_ID = "appdQVQxbkXnm7gjR";
const TABLE_NAME = "Table Bouteilles";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Home() {
  const [bouteille, setBouteille] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const id = params?.get("bouteille")?.toUpperCase();

    if (!id) return;

    fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}?filterByFormula={Code Bouteille}='${id}'`, {
      headers: {
        Authorization: `Bearer ${Airtable_API_KEY}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.records.length === 0) {
          setError("Aucune fiche trouvée pour ce code.");
        } else {
          setBouteille(data.records[0].fields);
        }
      })
      .catch(() => setError("Erreur lors de la connexion à Airtable."));
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h1>Cave de Gaël</h1>
      {!bouteille && !error && <p>Ajoute ?bouteille=G0001 dans l'URL pour tester.</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {bouteille && (
        <div>
          <h2>{bouteille["Nom du vin"]}</h2>
          <p><strong>Domaine :</strong> {bouteille["Domaine"]}</p>
          <p><strong>Type :</strong> {bouteille["Type"]}</p>
          <p><strong>Cépages :</strong> {bouteille["Cépages"]}</p>
          <p><strong>Millésime :</strong> {bouteille["Millésime"]}</p>
          <p><strong>Apogée :</strong> {bouteille["Apogée"]}</p>
          <p><strong>Quantité en cave :</strong> {bouteille["Quantité en cave"]}</p>
          <p><strong>Valeur estimée totale :</strong> {bouteille["Quantité en cave"] * bouteille["Valeur estimée (€)"]} €</p>
          <p><strong>Emplacement :</strong> {bouteille["Emplacement"]}</p>
          <p><strong>Dernier mouvement :</strong> {bouteille["Dernier mouvement (type)"]} — {formatDate(bouteille["Dernier mouvement (date)"])}</p>
          <p><strong>Dernière note :</strong> {bouteille["Dernière note"]}</p>
        </div>
      )}
    </div>
  );
}
