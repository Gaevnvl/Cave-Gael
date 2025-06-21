
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const id = params.get("bouteille")?.toUpperCase() || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/fiches/${id}`);
        if (!res.ok) throw new Error("Fiche non trouvée");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      }
    };
    if (id) fetchData();
  }, [id]);

  if (error) return <p style={{ color: "red" }}>Aucune fiche trouvée pour le code {id}.</p>;
  if (!data) return <p>Chargement...</p>;

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "2em", marginBottom: 0 }}>Cave de Gaël</h1>
      <h2 style={{ marginTop: 0 }}>{data.nom || id}</h2>

      {data.photo && (
        <img src={data.photo} alt="bouteille" style={{ width: "100%", maxHeight: 300, objectFit: "contain", borderRadius: "1em", marginBottom: 20 }} />
      )}

      <p><strong>Domaine :</strong> {data.domaine}</p>
      <p><strong>Type :</strong> {data.type}</p>
      <p><strong>Cépages :</strong> {data.cepages}</p>
      <p><strong>Millésime :</strong> {data.millesime}</p>
      <p><strong>Apogée :</strong> {data.apogee}</p>
      <p><strong>Quantité en cave :</strong> {data.quantite}</p>
      <p><strong>Valeur estimée totale :</strong> {data.valeur} €</p>
      <p><strong>Contenant :</strong> {data.contenant}</p>
      <p><strong>Emplacement :</strong> {data.emplacement}</p>
      <p><strong>Statut :</strong> {data.statut}</p>
      <p><strong>Dernier mouvement :</strong> {data.dernierMouvement}</p>
      <p><strong>Note :</strong> {data.note || "Non notée"}</p>
      <p><strong>Commentaire :</strong> {data.commentaire}</p>
    </div>
  );
}
