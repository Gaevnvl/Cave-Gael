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

    const fetchBottle = async () => {
      try {
        const res = await fetch(
          `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}?filterByFormula={Code Bouteille}='${id}'`,
          {
            headers: {
              Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`
            }
          }
        );
        const data = await res.json();
        if (data.records.length > 0) {
          setBottle(data.records[0].fields);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBottle();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <div style={{ padding: 40 }}><p style={{ color: "red", fontWeight: "bold" }}>Aucune fiche trouvée pour ce code bouteille.</p></div>;

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
    "Dernier mouvement (date)": mouvement,
    "Dernier mouvement (type)": mouvementType,
    Photo: photo,
    Note: note,
    "Commentaires dégustation": commentaire,
    Logistique: logistique
  } = bottle;

  const dateFormat = mouvement ? new Date(mouvement).toLocaleDateString("fr-FR") : "—";
  const etoiles = note ? "★".repeat(note) + "☆".repeat(5 - note) : "Non notée";

  return (
    <div style={{ padding: 40, maxWidth: 600, margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ color: "#7b002c" }}>Cave de Gaël</h1>
        <button onClick={() => window.print()} style={{
          background: "#7b002c", color: "white", border: "none", padding: "8px 14px", borderRadius: 5, cursor: "pointer"
        }}>🖨️ Imprimer</button>
      </div>
      <h2 style={{ color: "#111" }}>{nom}</h2>
      {photo && <img src={photo[0].url} alt={nom} style={{ maxWidth: "100%", margin: "20px 0", borderRadius: 8 }} />}
      <p><strong style={{ color: "#7b002c" }}>📍 Domaine :</strong> {domaine}</p>
      <p><strong style={{ color: "#7b002c" }}>🍷 Type :</strong> {type}</p>
      <p><strong style={{ color: "#7b002c" }}>🧬 Cépages :</strong> {cepages?.join(", ")}</p>
      <p><strong style={{ color: "#7b002c" }}>📅 Millésime :</strong> {millesime}</p>
      <p><strong style={{ color: "#7b002c" }}>⏳ Apogée :</strong> {apogee}</p>
      <p><strong style={{ color: "#7b002c" }}>🍾 Quantité en cave :</strong> {quantite}</p>
      <p><strong style={{ color: "#7b002c" }}>💶 Valeur estimée totale :</strong> {valeur} €</p>
      <p><strong style={{ color: "#7b002c" }}>🔖 Contenant :</strong> {contenant}</p>
      <p><strong style={{ color: "#7b002c" }}>📦 Emplacement :</strong> {emplacement}</p>
      <p><strong style={{ color: "#7b002c" }}>🏷️ Statut :</strong> {statut}</p>
      <p><strong style={{ color: "#7b002c" }}>🕒 Dernier mouvement :</strong> {mouvementType} — {dateFormat}</p>
      <p><strong style={{ color: "#7b002c" }}>⭐ Note :</strong> {etoiles} {note ? `(${note}/10)` : ""}</p>
      <p><strong style={{ color: "#7b002c" }}>📝 Commentaires dégustation :</strong> {commentaire || "Non renseigné"}</p>
      <p><strong style={{ color: "#7b002c" }}>📦 Logistique :</strong> {logistique || "—"}</p>
    </div>
  );
}