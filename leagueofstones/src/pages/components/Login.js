'use client';

import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from '../../styles/Login.module.css'; // Import du CSS module

import Menu from "./Menu";
import Footer from "./Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [erreur , setErreur] = useState("");
  const [connected, SetConnected] = useState(false)


 useEffect (() => {
    const timeOut = setTimeout(() => {
      const token = sessionStorage.getItem("token");
      if (!(token == null && token == undefined)) {
        SetConnected(true);
      }
    }, 500);

    return () => clearTimeout(timeOut);
 })

  
  function AfterLogin() {
    return (
      <div className={styles.afterLogin}>
        <p className="text-success fw-bold">Bienvenue !</p>
        <div className="d-flex gap-3">
          <Link href="/" className="btn btn-light">🏠 Accueil</Link>
          <Link href="./matchmaking" className="btn btn-primary">🎮 Matchmaking</Link>
          <button  className="btn btn-primary">se déconnecter </button>
        </div>
      </div>
    );
  }

  const soumettreUser = (e) => {
    e.preventDefault();
    if (email && password) {
      // Logique de connexion ici (envoi de la requête à l'API ou autre)
      console.log("Connexion avec:", email, password);
    } else {
      setMessage("");
      setErreur("Veuillez remplir tous les champs.");
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
        .then(async (response) => {
          const text = await response.text();
          if (!response.ok) {
            console.log(response.text);
            if (text == "Email or password incorrect") {
              setMessage("");
              setErreur("Email ou mots de pass incorrect");
              return ;
            } else {
              setMessage("");
              setErreur("Une erreur est survenue. Veuillez réessayer.")
              return ;
            }
            return null;;
          }
          try {
            const data = JSON.parse(text);
            return data;
          } catch (e) {
            setMessage("");
            setErreur("Réponse serveur invalide.");
            return null;
          }
        })
        .then((data) => {
          if (!data) return;
          console.log(data);
          sessionStorage.setItem("email", data.email);
          sessionStorage.setItem("id", data.id);
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("name", data.name);

          console.log("le token est : " + sessionStorage.getItem("token"));
          setErreur("");
          setMessage("Connecton réussie !!!");
          SetConnected(true);

        })
        .catch((error) => {
          console.error("Erreur:", error);
          setMessage("");
          setErreur("Une erreur est survenue. Veuillez réessayer.");
        });
  };

  useEffect(() => {
    setTimeout(() => {
      if (message) {
        setMessage("");
      } 
      if (erreur) {
        setErreur("");
      } 

    }, 2000);
  })

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
          <h1 className={styles.title}>{connected ? "Vous êtes connecté(e)s" : "Se connecter"}</h1>
          {erreur && <div className="alert alert-danger mt-2">{erreur}</div>}
          {message && <div className="alert alert-success mt-2">{message}</div>}
          {!connected && <form onSubmit={soumettreUser} className={`d-flex flex-column bd-`}>
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
            <button type="submit" className={styles.button}>
              Se connecter
            </button>
          </form>}
          {connected && <AfterLogin /> }
        </main>
      </section>
      <Footer/>
    </>
  );
}
