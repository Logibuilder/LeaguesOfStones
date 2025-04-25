// initDeck.js
export const initDeck = async (deck) => {
    const res = {};
    try {
        const reponse = await fetch(`http://localhost:3001/match/initDeck?deck=${JSON.stringify(deck)}`, {
            method: 'GET',
            headers: {
                'www-authenticate': sessionStorage.getItem('token')
            }
        });

        if (!reponse.ok) {
            const errorText = await reponse.text();
            let message = "Une erreur est survenue.";
            switch (errorText) {
                case "You need to be connected":
                    message = "Vous devez être connecté.";
                    break;
                case "You need to specify a deck":
                    message = "Vous devez spécifier un deck.";
                    break;
                case "There is no match associated":
                    message = "Aucun match associé à cet utilisateur.";
                    break;
                case "The match status is not pending a deck":
                    message = "Le match n'attend pas de deck.";
                    break;
                case "A deck is already defined":
                    message = "Un deck est déjà défini pour ce joueur.";
                    break;
                case "There is twice the same card in your deck":
                    message = "Il y a une carte en double dans votre deck.";
                    break;
                case "Error during deck synchronisation":
                    message = "Erreur lors de la synchronisation du deck.";
                    break;
                default:
                    message = `Erreur inconnue : ${errorText}`;
                    break;
            }
            res.error = message;
            res.message = "";
            res.inited = false;
            // setErreur(message);
            // setMessage("");
            return res;
        }
        
        const data = await reponse.json();
        res.data = data;
        res.error = "";
        res.message = "Deck envoyé avec succès !";
        res.inited = true;
        // setErreur("");
        // setMessage("Deck envoyé avec succès !");
        // setInitDeckSucces(true);
        // Stockage CORRECT dans sessionStorage
        sessionStorage.setItem("deckinited", "true"); // Important: chaîne de caractères
        console.log("Deck initié - sessionStorage mis à jour"); // Log de confirmation
        return res;
    } catch (err) {
        res.error = "Erreur de communication avec le serveur : " + err ;
        res.message = "";
        res.inited = false;
        // setErreur("Erreur de communication avec le serveur.");
        // console.error(err);
        return res;
    }
};

export const getMatch = async () => {
    const res = {
      err: null,
      match: null
    };

    try {
        const reponse = await fetch("http://localhost:3001/match/getMatch", {
            method: "GET",
            headers: {
                "www-authenticate": sessionStorage.getItem("token"),
            },
        });

        if (!reponse.ok) {
            res.err = "Erreur lors de la vérification du match";
            return res; // message reste vide
        }

        const matchData = await reponse.json();
        // setStatusMatch(matchData.status);
        // return matchData.status;
        res.match = matchData;
        return res;
    } catch(e) {
        // setErreur(e.message);
        // console.error(e);
        // return null;
        res.err = e;
        return res;
    }
};

