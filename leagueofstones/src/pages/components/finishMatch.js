
export const finishMatch = async () => {
    const res = {
        err: null,
        reponse: null
        };
    
    try {
        const reponse = await fetch('http://localhost:3001/match/finishMatch', {
        method: 'GET',
        headers: {
            "www-authenticate" : sessionStorage.getItem('token')
        },
        });

        if (!reponse.ok) {
            const text = await reponse.text();
            res.err = `Erreur lors de la terminaison match : ${reponse.status} : ${text}`;
            return res;
        }

        const res = await reponse.json();
        res.reponse = data;
        console.log(res);
        return res
    } catch (erreur) {
        res.err = `Erreur : ${erreur.message}`;
        console.error(erreur.message);
        return res;
        // Gérer l'erreur (par exemple, afficher un message à l'utilisateur)
    }
};