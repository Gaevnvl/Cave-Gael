import { useState } from "react";

const BOTTLES = [
  {
    id: "G0001",
    nom: "Château Machin 2018",
    domaine: "Domaine Mont Redon",
    type: "Rouge",
    millesime: 2018,
    cepages: "Grenache, Syrah",
    apogee: "2024 - 2028",
    quantite: 6,
    valeur: "28 €",
    emplacement: "Cave 1 - Rangée B",
    derniereNote: "Bu avec agneau, très bon, aérer 1h",
    dernierMouvement: "Entrée le 2024-06-01"
  },
  {
    id: "G0002",
    nom: "Clos de Gaël 2020",
    domaine: "Clos des Amis",
    type: "Blanc",
    millesime: 2020,
    cepages: "Chardonnay",
    apogee: "2023 - 2026",
    quantite: 3,
    valeur: "18 €",
    emplacement: "Cave 2 - Haut gauche",
    derniereNote: "Un peu fermé à l'ouverture, top après 30min",
    dernierMouvement: "Sortie le 2024-06-10"
  }
];

export default function BouteilleLookup() {
  const [search, setSearch] = useState("");
  const bouteille = BOTTLES.find((b) => b.id === search.trim().toUpperCase());

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <label>Entrer le code bouteille (ex : G0001)</label>
      <input
        style={{ marginBottom: 20, display: 'block', width: '100%' }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="G0001"
      />
      {bouteille ? (
        <div>
          <h2>{bouteille.nom}</h2>
          <p><strong>Domaine:</strong> {bouteille.domaine}</p>
          <p><strong>Type:</strong> {bouteille.type}</p>
          <p><strong>Cépages:</strong> {bouteille.cepages}</p>
          <p><strong>Millésime:</strong> {bouteille.millesime}</p>
          <p><strong>Apogée:</strong> {bouteille.apogee}</p>
          <p><strong>Quantité en cave:</strong> {bouteille.quantite}</p>
          <p><strong>Valeur estimée:</strong> {bouteille.valeur}</p>
          <p><strong>Emplacement:</strong> {bouteille.emplacement}</p>
          <p><strong>Dernier mouvement:</strong> {bouteille.dernierMouvement}</p>
          <p><strong>Note:</strong> {bouteille.derniereNote}</p>
        </div>
      ) : (
        <p style={{ color: 'gray' }}>Aucune fiche trouvée pour ce code.</p>
      )}
    </div>
  );
}