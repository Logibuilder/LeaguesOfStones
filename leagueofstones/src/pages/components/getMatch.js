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
            const errorText = await reponse.text();
            res.err = `Erreur ${reponse.status}: ${errorText}`;
            return res;
        }

        const matchData = await reponse.json();
        res.match = matchData;
        return res;
    } catch(e) {
        res.err = e instanceof Error ? e.message : "Erreur inconnue";
        return res;
    }
};