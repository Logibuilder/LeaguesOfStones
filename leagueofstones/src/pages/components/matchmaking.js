'use client';

import Participants from "./participants";
import Participer from "./participer";
import Menu from "./Menu";
import Footer from "./Footer";
import Demandes from "./demandes";
import styles from "../../styles/Matchmaking.module.css";

const Matchmaking = () => {
  return (
    <section className={styles.bodyclass}>
      <Menu />
      <main className={styles.main}>
        <section className={styles.container}>
          <h1 className={styles.title}>Rejoignez un matchmaking</h1>
          <p className={styles.description}>
            Découvrez les participants et envoyez vos demandes pour rejoindre un match !
          </p>

          <div>
            <Participer />
          </div>

          <div className={styles.zoneFlex}>
            <div className={styles.card}>
              <Participants />
            </div>
            <div className={styles.card}>
              <Demandes />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </section>
  );
};

export default Matchmaking;
