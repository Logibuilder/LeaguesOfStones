export const initDeck = async (deck, setMessage, setErreur, setInitDeckSucces)=> {
    

    try {

        const reponse = await fetch(`http://localhost:3001/match/initDeck?deck=${JSON.stringify(deck)}`, {
            method : 'GET',
            headers : {
                'www-authenticate' : sessionStorage.getItem('token')
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
          setErreur(message);
          setMessage("");
          return;
        }
    
        const data = await reponse.json();
        setErreur("");
        setMessage("Deck envoyé avec succès !");
        console.log("le retour de initDeck  :   ");
        console.log(data);
        setInitDeckSucces(true);
    } catch (err) {
        setErreur("Erreur de communication avec le serveur.");
        setMessage("");
        console.error(err);
    }
    
}


export const getMatch = async (setMessage, setErreur, setStatusMatch, initDeckSuccess)=> {
    try {
        const reponse = await fetch("http://localhost:3001/match/getMatch", {

          method : "GET",
          headers: {
            "www-authenticate": sessionStorage.getItem("token"),
          },
        });
  
        if (!reponse.ok) {
            setErreur("Erreur lors de la vérification du match");
        }
  
        const matchData = await reponse.json();
        setStatusMatch(matchData.status)
        
        console.log(matchData);

    } catch(e) {
        setErreur(e.message);
        console.log(e.message);

    }
}