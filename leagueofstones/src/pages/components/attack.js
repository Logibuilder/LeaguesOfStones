export async function attack(carte, carteEnnemi) {
    const res = {
      err: null,
      reponse: null,
    };
  
    try {
        const reponse = await fetch(`http://localhost:3001/match/attack?card=${carte}&ennemyCard=${carteEnnemi}`, {
            method: "GET",
            headers: {
            "www-authenticate": sessionStorage.getItem("token"),
            },
        });
    
        if (!reponse.ok) {
            const text = await reponse.text();
            res.err = "Erreur serveur lors de l'attaque : "  + reponse.status + " " + text;
            return res;
        }
    
        const donnees = await reponse.json();

        if (donnees.status) {
            console.log("les données après l'attaque : " + donnees);
            res.reponse = "Carte    attaque avec succès " + "les données après l'attaque : " + donnees;
        } else if (donnees.error) {
            res.err = "Erreur " + donnees.error;
        }

    } catch (erreur) {
        res.err = "Une erreur s'est produite lors de la communication avec le serveur.";
    }

    return res;
  }
  