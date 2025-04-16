export const demander = async (matchmakingId, setMessage, setErreur) => {
    try {
        const response = await fetch(`http://localhost:3001/matchmaking/request?matchmakingId=${matchmakingId}`, {
            method: "GET",
            headers: {
                "www-authenticate": sessionStorage.getItem("token")
            }
        });
        if (!response.ok) {
            setErreur("Échec de l'envoi");
            console.error("Réponse non OK :", response);
        } else {
            setMessage("Demande envoyée avec succés!");
            console.log("demande ok");
        }
        
        
    } catch (err) {
        setErreur("Erreur : " + err.message);
    }
} 