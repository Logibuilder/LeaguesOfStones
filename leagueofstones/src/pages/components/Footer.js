import Link from "next/link";
import { FaLinkedin, FaGithub } from "react-icons/fa";

import styles from '../../styles/Footer.module.css'; // Importez le fichier CSS modulaire

export default function Footer() {
  return (
    <footer className={`${styles.footer}  text-white py-4 mt-3`}>
      <div className="container">
        <div className="row">
          {/* Section "À propos" */}
          <div className="col-md-4 mb-4">
            <h5 className={styles.footerTitle}>À propos de nous</h5>
            <p className={styles.footerText}>
              League of Stones est une application pour créer et gérer vos decks de champions. Rejoignez-nous dans cette aventure épique !
            </p>
            <Link href="/components/Accueil" className={styles.footerLink}>
              En savoir plus
            </Link>
          </div>

          {/* Section "Liens utiles" */}
          <div className="col-md-4 mb-4">
            <h5 className={styles.footerTitle}>Liens utiles</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="/components/Accueil" className={styles.footerLink}>
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/components/Login" className={styles.footerLink}>
                  Connexion
                </Link>
              </li>
              <li>
                <Link href="/components/Signin" className={styles.footerLink}>
                  Inscription
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.footerLink}>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/legal" className={styles.footerLink}>
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>

          {/* Section "Contact" */}
          <div className="col-md-4 mb-4">
            <h5 className={styles.footerTitle}>Contactez-moi</h5>
            <p className={styles.footerText}>
            Email: <a href="mailto:kaneassane81@gmail.com">kaneassane81@gmail.com</a><br />
            Téléphone: +33 7 66 04 82 11<br />
              Adresse: 19 Rue Saint-Honest, Toulouse
            </p>
          </div>
        </div>

        {/* Section "Réseaux sociaux" */}
        <div className="text-center mb-4">
            <div className={styles.socialIcons}>
                <a href="https://www.linkedin.com/in/assane-kane-10bb19267/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <FaLinkedin size={24} />
                </a>
                
                <a href="https://github.com/Logibuilder" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <FaGithub size={24} />
                </a>
            </div>
            </div>


        

        {/* Section "Droits d'auteur" */}
        <div className="text-center mt-4">
          <p className={styles.footerText}>
            &copy; 2025 Assane KANE. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}