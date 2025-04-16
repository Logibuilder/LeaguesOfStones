import { useState, useEffect } from 'react';
import styles from "../../styles/Participants.module.css"
import { demander } from './demander';

export default function Participants() {
  const [erreur, setErreur] = useState('');
  const [message, setMessage] = useState("")
  const [participants, setParticipants] = useState([]);

  const getDemandesEnvoyees = () => {
    return JSON.parse(sessionStorage.getItem("demandesEnvoyees")) || [];
  };

  const enregistrerDemande = (matchmakingId) => {
    const demandes = getDemandesEnvoyees();
    if (!demandes.includes(matchmakingId)) {
      const nouvelles = [...demandes, matchmakingId];
      sessionStorage.setItem("demandesEnvoyees", JSON.stringify(nouvelles));
    }
  };

  const getAllParticipants = async () => {
    try {
      const response = await fetch("http://localhost:3001/matchmaking/getAll", {
        method: "GET",
        headers: {
          "www-authenticate": sessionStorage.getItem("token") || "",
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des joueurs");
      }

      const data = await response.json();
      const demandes = getDemandesEnvoyees();

      const participantsAvecEtat = data.map(participant => ({
        ...participant,
        demandeEnvoyee: demandes.includes(participant.matchmakingId),
      }));

      setParticipants(participantsAvecEtat);
      setErreur('');
    } catch (err) {
      console.error(err);
      setErreur("Erreur lors de la récupération des joueurs");
    }
  };


  useEffect(() => {
    getAllParticipants();
  }, []);

  const gererDemande = async (participant) => {
    await demander(participant.matchmakingId, setMessage, setErreur);
    enregistrerDemande(participant.matchmakingId);

    setParticipants(prev =>
      prev.map(p =>
        p.matchmakingId === participant.matchmakingId
          ? { ...p, demandeEnvoyee: true }
          : p
      )
    );
  };

  return (
    <div className={styles.conteneur}>
      {erreur && <div className={styles.messageErreur}>{erreur}</div>}
      {message && <div className={styles.messageSucces}>{message}</div>}

      <button className={styles.boutonDemanderMatch} onClick={getAllParticipants}>
      🔄 Rafraîchir
      </button>
      <h2 className={styles.titreListe}>Liste des participants disponibles</h2>
      <div className={styles.liste}>
        {participants.length > 0 ? (
          participants.map((participant) => (
            <li className={styles.elementListe} key={participant.matchmakingId}>
              <span className={styles.nom}>{participant.name}</span>
              {participant.demandeEnvoyee ? (
                <span className={styles.texteDemandeEnvoyee}>Demande envoyée</span>
              ) : (
                <button
                  className={styles.boutonDemanderMatch}
                  onClick={() => gererDemande(participant)}
                >
                  Demander un match
                </button>
              )}
            </li>
          ))
        ) : (
          <div className="text-muted">Aucun participant pour le moment</div>
        )}
      </div>
    </div>
  );
}