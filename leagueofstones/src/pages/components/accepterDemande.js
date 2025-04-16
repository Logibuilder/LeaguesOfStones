export const accepterDemande = async (matchmakingid, setMessage, setErreur) => {
    try {
        const response = await fetch(`http://localhost:3001/matchmaking/acceptRequest?matchmakingId=${matchmakingid}`, {
            method: "GET", 
            headers: {
                "www-authenticate": `${sessionStorage.getItem("token")}`,
            },
        });

        if (!response.ok) {
            const text = await response.text();
            setErreur("Erreur serveur : " + response.status + " " + text);
            return;
        }  else {
            const data = await response.json();
            setMessage("Match accepté !");
            console.log("les informations du match///////", data.match);
        }

        
        


    } catch (err) {
        console.error("Erreur dans accepterDemande :", err);
        setErreur("Erreur : " + err.message);
    }
};