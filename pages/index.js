
import { useEffect, useState } from "react";

export default function Home() {
  const [bottle, setBottle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("bouteille");

    if (!id) {
      setLoading(false);
      setError(true);
      return;
    }

    fetch(`/api/bottle?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(true);
        } else {
          setBottle(data);
        }
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <div style={{ padding: 40 }}><p style={{ color: "red", fontWeight: "bold" }}>Aucune fiche trouvée pour le code :</p></div>;

  const {
    "Nom du vin": nom,
    Domaine: domaine,
    Type: type,
    Cépages: cepages,
    Millésime: millesime,
    Apogée: apogee,
    "Quantité en cave": quantite,
    "Valeur estimée Totale": valeur,
    Contenant: contenant,
    Emplacement: emplacement,
    Statut: statut,
    Note: note,
    "Commentaires dégustation": commentaires,
    Logistique: logistique,
    "Dernier mouvement (date)": mouvement,
    "Dernier mouvement (type)": mouvementType,
    Photo: photo
  } = bottle;

  const dateFormat = mouvement ? new Date(mouvement).toLocaleDateString("fr-FR") : "—";
  const etoiles = note ? "★".repeat(note) + "☆".repeat(5 - note) + ` (${note}/10)` : "Non notée";

  return (
    <div style={{ padding: 40, maxWidth: 700, margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ color: "#7b002c" }}>Cave de Gaël</h1>
        <button onClick={() => window.print()} style={{
          background: "#7b002c", color: "white", border: "none", padding: "8px 14px", borderRadius: 5, cursor: "pointer"
        }}>🖨️ Imprimer</button>
      </div>
      <h2 style={{ color: "#7b002c" }}>{nom}</h2>
      {photo && <img src={photo[0].url} alt={nom} style={{ maxWidth: "140px", float: "right", margin: "10px" }} />}
      <p><strong>🍇 Domaine :</strong> {domaine}</p>
      <p><strong>🍷 Type :</strong> {type}</p>
      <p><strong>🧬 Cépages :</strong> {cepages?.join(", ")}</p>
      <p><strong>📅 Millésime :</strong> {millesime}</p>
      <p><strong>⏳ Apogée :</strong> {apogee}</p>
      <p><strong>📦 Quantité en cave :</strong> {quantite}</p>
      <p><strong>💰 Valeur estimée totale :</strong> {valeur} €</p>
      <p><strong>🍾 Contenant :</strong> {contenant}</p>
      <p><strong>🏠 Emplacement :</strong> {emplacement}</p>
      <p><strong>🏷️ Statut :</strong> {statut}</p>
      <p><strong>🕒 Dernier mouvement :</strong> {mouvementType} — {dateFormat}</p>
      <p><strong>⭐ Note :</strong> {etoiles}</p>
      <p><strong>📝 Commentaires :</strong> {commentaires || "Non renseigné"}</p>
      <p><strong>📦 Logistique :</strong> {logistique || "Non renseigné"}</p>
    </div>
  );
}
