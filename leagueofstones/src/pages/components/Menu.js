'use client';

import Link from "next/link";
import styles from '../../styles/Menu.module.css'; // Importez le fichier CSS modulaire

import { useEffect, useState } from "react";
import {logout} from "./Logout";

export default function Menu() {

  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  // Mise à jour automatique du token toutes les 0.5 secondes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const interval = setInterval(() => {
        const currentToken = sessionStorage.getItem("token") || "";
        if (currentToken !== token) {
          setToken(currentToken);
        }
      }, 500); // 0.5 seconde

      return () => clearInterval(interval); // Nettoyage
    }
  }, [token]); // Dépendance sur le token pour détecter les changements


  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
  
      return () => clearTimeout(timer); // Nettoyage au cas où message change trop vite
    }
  }, [message]);

  useEffect(() => {
    if (erreur) {
      const timer = setTimeout(() => {
        setErreur("");
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [erreur]);
  
  return (
    <nav className={`navbar navbar-expand-lg navbar-dark  ${styles.navbar}`}>
      <div className="container-fluid mb-3">
        <Link href="/" className={`navbar-brand ${styles.navbarBrand}`}>
          League of Stones
        </Link>
        <button
          className={`navbar-toggler ${styles.togglerIcon}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${styles.menuContainer}`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/" className={`nav-link ${styles.navLink}`}>
                Accueil
              </Link>
            </li>
            <li className="nav-item">
            <Link
                href={token ? "/components/Deck" : "/components/Login"}
                className={`nav-link ${styles.navLink}`}
              >
                Champions
              </Link> 
            </li>
            <li className="nav-item">
              {!token && <Link href="/components/Login" className={`nav-link ${styles.navLink}`}>
                Se connecter
              </Link>}
            </li>
            <li className="nav-item">
              {token && (
                <a onClick={() =>logout(setMessage, setErreur)} className={`nav-link ${styles.navLink}`} style={{ cursor: "pointer" }}>
                  Se déconnecter
                </a>
              )}
            </li>
            <li className="nav-item">
              {!token && <Link href="/components/Signin" className={`nav-link ${styles.navLink}`}>
                S'inscrire
              </Link>}
            </li>
            <li className="nav-item">
              {token && <Link href="/components/Signout" className={`nav-link ${styles.navLink}`}>
                Se désinscrire
              </Link>}
            </li>
          </ul>
        </div>
      </div>
      {/* Affichage des messages */}
      {message && <p className="text-success mt-2 ms-3">{message}</p>}
      {erreur && <p className="text-danger mt-2 ms-3">{erreur}</p>}
    </nav>
  );
}