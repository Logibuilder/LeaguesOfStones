'use client';



import Link from "next/link";
import styles from '../../styles/Menu.module.css'; // Importez le fichier CSS modulaire

import { useEffect, useState } from "react";
import {logout} from "./Logout";

export default function Menu() {

  const [token, setToken] = useState("");
  const [name, setName] = useState(null);
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);
  

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(sessionStorage.getItem("token"));
      setName(sessionStorage.getItem("name"))
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

        const currentName = sessionStorage.getItem("name") || "";
        if (currentName !== name) {
          setName(currentName);
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
    <>
      {isMenuOpen && (
        <div
          className={`${styles.overlay} ${isMenuOpen ? styles.show : ''}`}
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      <nav className={`navbar navbar-expand-lg navbar-dark ${styles.navbar}`}>
        <div className="container-fluid mb-3">
    

          
          {/* Partie Gauche : Logo + Nom */}
          <div className="d-flex align-items-center">
          <Link href="/" className={`navbar-brand ${styles.navbarBrand}`}>
            League of Stones
            </Link>

            {/* Nom toujours collé au logo */}
            {token && name && (
              <span className="nav-link" style={{ fontWeight: "bold" , color : "white"}}>
                <i className="bi bi-person-circle me-2"></i>
                {name}
              </span>
            )}
          </div>
          <button
            className={`${styles.menuToggle} ${isMenuOpen ? styles.open : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`${styles.menuContainer} ${isMenuOpen ? styles.show : ''}`}>
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
              {!token && (
                <li className="nav-item">
                  <Link href="/components/Login" className={`nav-link ${styles.navLink}`}>
                    Se connecter
                  </Link>
                </li>
              )}
              {token && (
                <li className="nav-item">
                  <a
                    onClick={() => {
                      logout(setMessage, setErreur);
                      setIsMenuOpen(false);
                    }}
                    className={`nav-link ${styles.navLink}`}
                    style={{ cursor: "pointer" }}
                  >
                    Se déconnecter
                  </a>
                </li>
              )}
              {!token && (
                <li className="nav-item">
                  <Link href="/components/Signin" className={`nav-link ${styles.navLink}`}>
                    S'inscrire
                  </Link>
                </li>
              )}
              {token && (
                <li className="nav-item">
                  <Link href="/components/Signout" className={`nav-link ${styles.navLink}`}>
                    Se désinscrire
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}