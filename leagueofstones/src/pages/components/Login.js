'use client';

import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from '../../styles/Login.module.css';
import Menu from "./Menu";
import Footer from "./Footer";

// Composant séparé pour l'état connecté// Composant séparé pour l'état connecté - MODIFIÉ
const ConnectedState = ({ onLogout }) => {
  const userName = sessionStorage.getItem("name"); // Récupère le nom depuis sessionStorage
  
  return (
    <div className={styles.afterLogin}>
      <div className={styles.welcomeBox}>
        <p className="text-success fw-bold">Bienvenue, {userName} !</p> {/* Affiche le nom */}
      </div>
      <div className="d-flex flex-column flex-lg-row gap-3 justify-content-center align-items-center">
        <Link href="../" className={`${styles.buttonSecondary} mb-2 mb-lg-0`}>Accueil</Link>
        <Link href="./matchmaking" className={`${styles.button} mb-2 mb-lg-0`}>Matchmaking</Link>
        <button 
          onClick={onLogout} 
          className={`${styles.button} mb-2 mb-lg-0`}>
          Se déconnecter
        </button>
      </div>
    </div>
  );
};

// Composant séparé pour le formulaire de connexion
const LoginForm = ({ 
  email, 
  setEmail, 
  password, 
  setPassword, 
  onSubmit,
  isLoading 
}) => (
  <form onSubmit={onSubmit} className={`d-flex flex-column`}>
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
    <button 
      type="submit" 
      className={styles.button}
      disabled={isLoading}
    >
      {isLoading ? 'Connexion en cours...' : 'Se connecter'}
    </button>
  </form>
);

export default function Login() {
  // États
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [authStatus, setAuthStatus] = useState({
    message: "",
    error: "",
    connected: false,
    isLoading: false
  });

  // Gestionnaires d'événements
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setAuthStatus(prev => ({ ...prev, connected: false }));
  };

  // Effets
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        setAuthStatus(prev => ({ ...prev, connected: true }));
      }
    };

    const interval = setInterval(checkAuthStatus, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (authStatus.message || authStatus.error) {
        setAuthStatus(prev => ({ ...prev, message: "", error: "" }));
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [authStatus.message, authStatus.error]);

  // Fonction principale de connexion
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setAuthStatus(prev => ({ ...prev, error: "Veuillez remplir tous les champs" }));
      return;
    }

    setAuthStatus(prev => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(
          text === "Email or password incorrect" 
            ? "Email ou mot de passe incorrect" 
            : "Une erreur est survenue"
        );
      }

      const data = JSON.parse(text);
      sessionStorage.setItem("email", data.email);
      sessionStorage.setItem("id", data.id);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("name", data.name);

      setAuthStatus({
        message: "Connexion réussie !!!",
        error: "",
        connected: true,
        isLoading: false
      });
    } catch (error) {
      setAuthStatus(prev => ({
        ...prev,
        error: error.message,
        isLoading: false
      }));
    }
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
          <h1 className={styles.title}>
            {authStatus.connected ? "Vous êtes connecté(e)s" : "Se connecter"}
          </h1>
          
          {authStatus.error && <div className="alert alert-danger mt-2">{authStatus.error}</div>}
          {authStatus.message && <div className="alert alert-success mt-2">{authStatus.message}</div>}
          
          {!authStatus.connected ? (
            <LoginForm 
              email={formData.email}
              setEmail={(value) => setFormData(prev => ({ ...prev, email: value }))}
              password={formData.password}
              setPassword={(value) => setFormData(prev => ({ ...prev, password: value }))}
              onSubmit={handleLogin}
              isLoading={authStatus.isLoading}
            />
          ) : (
            <ConnectedState onLogout={handleLogout} />
          )}
        </main>
      </section>
      
      <Footer/>
    </>
  );
}