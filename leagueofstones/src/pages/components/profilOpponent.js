import React from 'react';
import styles from '../../styles/ProfilOpponent.module.css';

export default function ProfilOpponent({ opponent }) {
  const maxHp = 150;
  const hpPercentage = (opponent?.hp / maxHp) * 100;

  let hpColor;
  let textColor;

  if (hpPercentage > 50) {
    hpColor = 'green';
    textColor = styles.blue;
  } else if (hpPercentage > 20) {
    hpColor = 'orange';
    textColor = styles.yellow;
  } else {
    hpColor = 'red';
    textColor = styles.white;
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.profilContainer} bg-dark`}>
      <h5 className={styles.playerName}>
          {opponent?.turn ? '⚡ ' : '🧍‍♂️ '}
          {opponent?.name}
        </h5>
        {/* Indicateur de tour */}
        <div className={`${styles.turnIndicator} ${opponent?.turn ? styles.activeTurnText : styles.inactiveTurnText}`}>
          {opponent?.turn ? '🔥 À L\'ATTAQUE' : '⏳ En attente'}
        </div>

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
              {opponent?.hp}/{maxHp}
            </span>
          </div>
        </div>

        <div className={styles.cardInfo}>
          <h6 className={styles.h6Style}>📦 Deck</h6>
          <div className={styles.cardCount}>
            {opponent?.deck} cartes restantes
          </div>
        </div>
      </div>
    </div>
  );
}
