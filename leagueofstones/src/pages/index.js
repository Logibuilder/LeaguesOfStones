'use client';

import React from "react";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import styles from '../styles/Accueil.module.css'; // Importez le fichier CSS modulaire



const Home = () => {
  
  
  
  return (
    <section className={`${styles.bodyclass} `}>
      <Menu /> {/* Intégration du composant Menu */}
      <main className={`${styles.main}`}>
        <section className={styles.container}>
          {/* Titre principal */}
          <h1 className={styles.title}>Bienvenue sur League of Stones</h1>

          {/* Description */}
          <p className={styles.description}>
            Créez, gérez et partagez vos decks de champions préférés. Rejoignez une communauté passionnée et devenez un maître du jeu !
          </p>

          {/* Boutons d'action */}
          <div className={styles.buttons}>
            <button className={styles.buttonPrimary}>Commencer</button>
            <button className={styles.buttonSecondary}>En savoir plus</button>
          </div>

          {/* Section des fonctionnalités */}
          <div className={styles.features}>
            <div className={styles.feature}>
              <h2>Créez vos decks</h2>
              <p>Personnalisez vos decks avec vos champions préférés et optimisez vos stratégies.</p>
            </div>
            <div className={styles.feature}>
              <h2>Partagez avec la communauté</h2>
              <p>Échangez vos decks et découvrez ceux des autres joueurs.</p>
            </div>
            <div className={styles.feature}>
              <h2>Suivez vos statistiques</h2>
              <p>Analysez vos performances et améliorez vos compétences.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer /> {/* Intégration du composant Footer */}
    </section>
  );
};

export default Home;