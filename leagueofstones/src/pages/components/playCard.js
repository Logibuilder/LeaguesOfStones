export const playCard = async (key_card) => {
    const res = {
        err: null,
        reponse: null
    };
    try {
      const response = await fetch(`http://localhost:3001/match/playcard?card=${key_card}`, {
        method: "GET",
        headers: {
          "www-authenticate" : sessionStorage.getItem('token')
      },
      });

      if (!response.ok) {
        const errorText = await response.text();
  
        // Gérer les différentes erreurs spécifiques retournées par le serveur
        if (errorText.includes("There is no match associated")) {
          console.error("❌ Erreur : Il n'y a pas de match associé.");
          res.err = "Il n'y a pas de match associé.";
        } else if (errorText.includes("Board full")) {
          console.error("❌ Erreur : Le plateau est plein.");
          res.err = "Le plateau est plein, tu ne peux pas jouer cette carte.";
        } else if (errorText.includes("Card is not in the hand")) {
          console.error("❌ Erreur : La carte n'est pas dans ta main.");
          res.err = "Tu n'as pas cette carte dans ta main.";
        } else if (errorText.includes("Not your turn")) {
          console.error("❌ Erreur : Ce n'est pas ton tour.");
          res.err = "Ce n'est pas ton tour, attends ton tour.";
        } else if (errorText.includes("You need to be connected")) {
          console.error("❌ Erreur : Tu dois être connecté.");
          res.err = "Tu n'es pas connecté, veuillez vous connecter.";
        } else {
          console.error(`❌ Erreur inconnue : ${errorText}`);
          res.err = "Erreur inconnue. Veuillez réessayer plus tard.";
        }
  
        return res;
      }
  
      const playCardData = await response.json();
      console.log("✅ Carte jouée avec succès :", playCardData);
      res.reponse = "✅ Carte jouée avec succès :", playCardData
      return res;
  
    } catch (err) {
      console.error("❌ Erreur dans playCard :", err);
      res.err =  "❌ Erreur dans playCard :" + err.message;
      return res;
    }
 }