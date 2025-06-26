document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("bottleSelect");
    const details = document.getElementById("bottleDetails");

    bottles.forEach(b => {
        const option = document.createElement("option");
        option.value = b.code;
        option.textContent = `${b.code} — ${b.nom}`;
        select.appendChild(option);
    });

    select.addEventListener("change", () => {
        const bottle = bottles.find(b => b.code === select.value);
        if (bottle) {
            details.innerHTML = `
                <h2>${bottle.nom}</h2>
                <p><strong>Domaine :</strong> ${bottle.domaine}</p>
                <p><strong>Type :</strong> ${bottle.type}</p>
                <p><strong>Cépages :</strong> ${bottle.cepages.join(", ")}</p>
                <p><strong>Millésime :</strong> ${bottle.millesime}</p>
                <p><strong>Apogée :</strong> ${bottle.apogee}</p>
                <p><strong>Quantité en cave :</strong> ${bottle.quantite}</p>
                <p><strong>Valeur estimée totale :</strong> ${bottle.valeur} €</p>
                <p><strong>Contenant :</strong> ${bottle.contenant}</p>
                <p><strong>Emplacement :</strong> ${bottle.emplacement}</p>
                <p><strong>Statut :</strong> ${bottle.statut}</p>
                <p><strong>Dernier mouvement :</strong> ${bottle.mouvement}</p>
                <p><strong>Note :</strong> ${"★".repeat(bottle.note)}${"☆".repeat(10 - bottle.note)} (${bottle.note}/10)</p>
                <p><strong>Commentaires :</strong> ${bottle.commentaire}</p>
                <p><strong>Logistique :</strong> ${bottle.logistique}</p>
            `;
        }
    });

    select.dispatchEvent(new Event("change"));
});