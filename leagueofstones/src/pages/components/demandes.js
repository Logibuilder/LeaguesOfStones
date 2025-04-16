import { useState, useEffect, useRef } from "react";
import styles from "../../styles/Demandes.module.css";
import { accepterDemande } from "./accepterDemande";
import Link from "next/link";

const Demandes = () => {
  const [request, setRequest] = useState([]);
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [matchTrouve, setMatchTrouve] = useState(false);

  const intervalRef = useRef(null); // 👈 Pour stocker l’intervalle

  useEffect(() => {
    const stored = sessionStorage.getItem("acceptedRequests");
    if (stored) {
      setAcceptedRequests(JSON.parse(stored));
    }
  }, []);

  const saveAcceptedRequests = (newList) => {
    sessionStorage.setItem("acceptedRequests", JSON.stringify(newList));
    setAcceptedRequests(newList);
  };

  const handleAccepter = async (matchmakingId) => {
    await accepterDemande(matchmakingId, setMessage, setErreur);
    const updatedList = [...acceptedRequests, matchmakingId];
    saveAcceptedRequests(updatedList);
  };

  const getRequest = () => {
    fetch("http://localhost:3001/matchmaking/participate", {
      method: "GET",
      headers: {
        "www-authenticate": sessionStorage.getItem("token") || "",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        sessionStorage.setItem("matchmakingId", data.matchmakingId);
        setRequest(data.request || []);
        if (data.match) {
          setMessage("✅ Un match a été trouvé !");
          setMatchTrouve(true);

          // 🛑 Arrêter l'intervalle dès qu’un match est trouvé
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      })
      .catch((err) => {
        console.error(err);
        setErreur("❌ Erreur lors de la récupération des demandes.");
        setMessage("");
      });
  };

  useEffect(() => {
    getRequest();
    // ⏱️ Démarrer l’intervalle
    intervalRef.current = setInterval(() => {
      getRequest();
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const timeout = setInterval(() => {
      if (message) setMessage("");
      if (erreur) setErreur("");
    }, 2000);

    return () => clearInterval(timeout);
  }, [message, erreur]);

  return (
    <div className={styles.conteneur}>
      {erreur && <div className={styles.messageErreur}>{erreur}</div>}
      {message && <div className={styles.messageSucces}>{message}</div>}

      <button className={styles.boutonDemanderMatch} onClick={getRequest}>
        🔄 Rafraîchir
      </button>
      <h2 className={styles.titreListe}>Liste des demandes reçues</h2>
      <ul className={styles.liste}>
        {request.length > 0 ? (
          request.map((demandeur, index) => (
            <li className={styles.elementListe} key={index}>
              <span className={styles.nom}>{demandeur.name}</span>
              {acceptedRequests.includes(demandeur.matchmakingId) ? (
                <span className={styles.messageSucces}>Demande acceptée ✅</span>
              ) : (
                <button
                  className={styles.boutonAccepter}
                  onClick={() => handleAccepter(demandeur.matchmakingId)}
                >
                  Accepter
                </button>
              )}
            </li>
          ))
        ) : (
          <div className="text-muted mt-3">Aucune demande pour le moment.</div>
        )}
      </ul>

      {/* ✅ Fenêtre modale si match trouvé */}
      {matchTrouve && (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
            <h3>🎉 Match trouvé !</h3>
            <p>Un adversaire vous attend. Préparez votre deck !</p>
            <Link href="./Deck">
                <button className={styles.boutonDeck}>Choisir mon deck</button>
            </Link>
            </div>
        </div>
        )}
    </div>
  );
};

export default Demandes;
