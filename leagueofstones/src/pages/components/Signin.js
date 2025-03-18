import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Menu from "./Menu";
import Footer from "./Footer";

import styles from '../../styles/Signin.module.css'; // Import du CSS module

export default function Signin() {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mail, setMail] = useState("");
  const [error, setError] = useState("");
  const [conformed, setConformed] = useState(true);

  const soumettreUser = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setConformed(false);
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    // Requête fetch pour enregistrer l'utilisateur
    fetch("http://localhost:3001/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: pseudo,
        email: mail,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setError(""); // Réinitialiser l'erreur en cas de succès
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Une erreur est survenue. Veuillez réessayer.");
      });
  };

  return (
    <>
      <Head>
        <title>Inscription - League of Stones</title>
        <meta name="description" content="Inscription à l'application League of Stones" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <section className={`container-fluid d-flex flex-column justify-content-center align-items-center bg-dark text-white ${styles.container}`}>
        <main className={styles.form}>
          <h1 className={styles.title}>Inscrivez-vous</h1>
          <form onSubmit={soumettreUser} className="d-flex flex-column">
            <div className="mb-1">
              <label htmlFor="pseudo" className="form-label">
                Pseudo
              </label>
              <input
                type="text"
                id="pseudo"
                className={styles.input}
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                required
              />
            </div>
            <div className="mb-1">
              <label htmlFor="mail" className="form-label">
                Adresse e-mail
              </label>
              <input
                type="email"
                id="mail"
                className={styles.input}
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                required
              />
            </div>
            <div className="mb-1">
              <label htmlFor="password" className="form-label">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-1">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmez le mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                className={styles.input}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className={styles.alert}>{error}</div>}
            {!conformed && <div className={styles.alert}>Les mots de passe ne correspondent pas.</div>}
            <button type="submit" className={styles.button}>
              S'inscrire
            </button>
          </form>
          <p className="mt-1 text-center text-white">
            Déjà un compte ?{" "}
            <Link href="/components/Login" className={styles.linkText}>
              Se connecter
            </Link>
          </p>
        </main>
      </section>
      <Footer />
    </>
  );
}