import React from 'react';
import styles from '../../styles/ProfilPlayer.module.css'; // Assurez-vous que le chemin du fichier CSS est correct

export default function ProfilPlayer({ player }) {
  const maxHp = 150;
  const hpPercentage = (player?.hp / maxHp) * 100;

  // Définir la couleur du cylindre en fonction du pourcentage de vie
  let hpColor;
  let textColor;

  if (hpPercentage > 50) {
    hpColor = 'green'; // Couleur verte pour les points de vie supérieurs à 50%
    textColor = styles.blue; // Bleu clair pour le texte
  } else if (hpPercentage > 20) {
    hpColor = 'orange'; // Couleur orange pour les points de vie entre 20% et 50%
    textColor = styles.yellow; // Jaune pâle pour le texte
  } else {
    hpColor = 'red'; // Couleur rouge pour les points de vie inférieurs à 20%
    textColor = styles.white; // Blanc pour le texte
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.profilContainer} bg-dark`}>
        {/* Header */}
        <h5 className={styles.playerName}>
          {player?.turn ? '⚡ ' : '🧍‍♂️ '}
          {player?.name}
        </h5>
        {/* Indicateur de tour */}
        <div className={`${styles.turnIndicator} ${player?.turn ? styles.activeTurnText : styles.inactiveTurnText}`}>
          {player?.turn ? '🔥 À L\'ATTAQUE' : '⏳ En attente'}
        </div>

        {/* Points de Vie - Cylindre Vertical avec Graduation */}
        <div className={styles.hpCylinderContainer}>
          <div className={styles.graduations}>
            <div className={`${styles.graduation} ${styles.graduation1}`}>0%</div>
            <div className={`${styles.graduation} ${styles.graduation2}`}>20%</div>
            <div className={`${styles.graduation} ${styles.graduation3}`}>40%</div>
            <div className={`${styles.graduation} ${styles.graduation4}`}>60%</div>
            <div className={`${styles.graduation} ${styles.graduation5}`}>80%</div>
          </div>

          <div
            className={styles.hpCylinder}
            style={{
              height: `${hpPercentage}%`,
              backgroundColor: hpColor,
            }}
          >
            <span className={textColor}>
              {player?.hp}/{maxHp}
            </span>
          </div>
        </div>

        {/* Deck */}
        <div className="cardInfo">
          <h6 className={styles.h6Style}>📦 Deck</h6>
          <div className={styles.cardCount}>
            {player?.deck} cartes restantes
          </div>
        </div>
      </div>
    </div>
  );
}
