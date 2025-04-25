


export const pickCard = async (aPiocher) => {

  const res = {
    err: null,
    reponse: null
  };

  if (aPiocher) {
      res.reponse = "Vous avez déjà pioché pour ce tour";
      return res;
  }
  
  try {
    const reponse = await fetch('http://localhost:3001/match/pickCard', {
      method: 'GET',
      headers: {
          "www-authenticate" : sessionStorage.getItem('token')
      },
    });

    if (!reponse.ok) {
      const text = await reponse.text()
      res.err = `Erreur lors de la pioche de la carte: ${reponse.status} : ${text}`;
      return res;
    }

    const data = await reponse.json();
    console.log(data);
    res.reponse = data.status+ "carte piochée avec succès";
    return res;
  } catch (erreur) {
    res.err  = err.message;
    console.error(erreur.message);
    // Gérer l'erreur (par exemple, afficher un message à l'utilisateur)
    return res
  }
};

