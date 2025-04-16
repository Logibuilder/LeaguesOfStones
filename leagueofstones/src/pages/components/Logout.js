




    export const logout = async (setMessage , setErreur) =>{
        try {
            const reponse = await fetch("http://localhost:3001/logout", {
                method: "POST",
                headers: {
                  "www-authenticate": sessionStorage.getItem("token")
                }
            });
    
            if (!reponse.ok) {
                setErreur("Erreur lors de la déconnection");
            }
    
            setMessage("Vous êtes déconnecté(e)s");
            sessionStorage.clear();
        } catch (e) {
            setErreur("Erreur lors de la déconnection");
            console.error("Erreur :  " +  e.message);
        }
    }

