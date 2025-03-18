'use client';

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from '../../styles/Login.module.css'; // Import du CSS module

import Menu from "./Menu";
import Footer from "./Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const soumettreUser = (e) => {
    e.preventDefault();
    if (email && password) {
      // Logique de connexion ici (envoi de la requête à l'API ou autre)
      console.log("Connexion avec:", email, password);
      setError("");
    } else {
      setError("Veuillez remplir tous les champs.");
    }
    fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erreur serveur');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          sessionStorage.setItem("email", data.email);
          sessionStorage.setItem("id", data.id);
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("name", data.name);

          console.log("le token est : " + sessionStorage.getItem("token"));

        })
        .catch((error) => {
          console.error("Erreur:", error);
          setError("Une erreur est survenue. Veuillez réessayer.");
        });
  };

  return (
    <>
      <Head>
        <title>Connexion - League of Stones</title>
        <meta name="description" content="Connexion à l'application League of Stones" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <section className="container-fluid d-flex flex-column justify-content-center align-items-center bg-dark text-white">
        <main className={styles.form}>
          <h1 className={styles.title}>Se connecter</h1>
          <form onSubmit={soumettreUser} className={`d-flex flex-column bd-`}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Adresse e-mail
              </label>
              <input
                type="email"
                id="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
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
            {error && <div className={styles.alert}>{error}</div>}
            <button type="submit" className={styles.button}>
              Se connecter
            </button>
          </form>
        </main>
      </section>
      <Footer/>
    </>
  );
}
