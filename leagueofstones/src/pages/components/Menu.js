'use client';

import Link from "next/link";
import styles from '../../styles/Menu.module.css'; // Importez le fichier CSS modulaire


export default function Menu() {

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
              {
              sessionStorage.getItem('token')  ? (<Link href="/components/Login" className={`nav-link ${styles.navLink}`} >
                Jeux
              </Link>) : 
              (<Link href="/components/Jeux" className={`nav-link ${styles.navLink}`}>
                Jeux
              </Link>)}   {console.log(sessionStorage.getItem('token'))}
            </li>
            <li className="nav-item">
              <Link href="/components/Login" className={`nav-link ${styles.navLink}`}>
                Se connecter
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/components/Signin" className={`nav-link ${styles.navLink}`}>
                S'inscrire
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}