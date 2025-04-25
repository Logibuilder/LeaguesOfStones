export const endTurn = async (turn) => {
    const res = {
        err: null,
        reponse: null
    };
    if (turn === false) {
        res.reponse = "Ce n'est pas votre tour.";
        return res;
    }
    try {
        const reponse = await fetch('http://localhost:3001/match/endTurn', {
            method: 'GET',
            headers: {
                "www-authenticate":  sessionStorage.getItem('token')
            },
        });

        if (!reponse.ok) {
            const texte = await reponse.text(); // On récupère la réponse sous forme de texte si ce n'est pas du JSON
            res.err = `Erreur serveur: ${texte || 'Problème inconnu'}`;
            return res;
        }

        // Essayer de parser la réponse en JSON
        try {
            res.reponse = "Tour terminé avec succès.";
            console.log(reponse);
            return res;
        } catch (jsonError) {
            res.err = `Erreur lors du parsing JSON: ${jsonError.message}`;
            console.error(jsonError.message);
            return res;
        }
    } catch (erreur) {
        // Gestion des erreurs dans le try...catch
        res.reponse = `Erreur: ${erreur.message}`;
        console.error(erreur.message);
        return res;
    }
};