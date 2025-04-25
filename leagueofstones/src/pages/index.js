'use client';

import React from "react";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import styles from '../styles/Accueil.module.css';
import Link from "next/link";

const Home = () => {
  return (
    <section className={styles.bodyclass}>
      <Menu />
      <main className={styles.main}>
        <section className={styles.container}>
          {/* Titre principal */}
          <h1 className={styles.title}>League of Stones</h1>

          {/* Slogan */}
          <p className={styles.description}>
            Le mashup ultime entre stratégie et légendes. Assemblez vos champions et entrez dans l’arène !
          </p>

          {/* Boutons d'action */}
          <div className={styles.buttons}>
            <Link href="./components/Login" className={styles.buttonPrimary} >Jouer maintenant</Link>
          </div>

          {/* Présentation du concept */}
          <div className={styles.features}>
            <div className={styles.feature}>
              <h2>Un mashup stratégique</h2>
              <p>
                League of Stones combine le système de jeu dynamique de <strong>Hearthstone</strong> avec les champions iconiques de <strong>League of Legends</strong>.
              </p>
            </div>
            <div className={styles.feature}>
              <h2>Construisez votre deck</h2>
              <p>
                Sélectionnez 20 cartes parmi les champions de LoL, chacun avec ses propres statistiques d'attaque et de défense.
              </p>
            </div>
            <div className={styles.feature}>
              <h2>Affrontez vos adversaires</h2>
              <p>
                Jouez tour par tour, posez vos cartes, attaquez stratégiquement et réduisez les PV de l’adversaire à 0 pour gagner.
              </p>
            </div>
            <div className={styles.feature}>
              <h2>Optimisé pour ordinateur et tablette</h2>
              <p>
                Profitez d’une interface fluide et intuitive, conçue spécialement pour les écrans larges : jouez confortablement sur ordinateur ou tablette.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </section>
  );
};

export default Home;
