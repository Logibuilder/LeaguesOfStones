export async function attackPlayer(carte) {
    const res = {
      err: null,
      reponse: null
    };
  
    try {
      const reponse = await fetch(`http://localhost:3001/match/attackPlayer?card=${carte}`, {
        method: "GET",
        headers: {
          "www-authenticate": sessionStorage.getItem("token"),
        },
      });
  
      if (!reponse.ok) {
        const text = await reponse.text();
        res.err = "Erreur serveur lors de l'attaque directe du joueur " + text;
        return res;
      }
  
      const donnees = await reponse.json();
  
      if (donnees.status) {
        res.reponse = donnees.status;
      } else if (donnees.error) {
        res.err = donnees.error;
      }

      return res;
  
    } catch (erreur) {
      console.error("Erreur de communication avec le serveur: ", erreur);
      res.err = "Une erreur s'est produite lors de la communication avec le serveur : " + erreur.message;
    }
  
    return res;
  }
  