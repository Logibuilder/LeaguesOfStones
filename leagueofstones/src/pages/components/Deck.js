import Head from "next/head";
import ImageDesc from "./ImageDesc";
import Menu from "./Menu";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { getMatch, initDeck } from "./initDeck";
import styles from "../../styles/Deck.module.css"
import Link from "next/link";


export default function Jeux() {
  const [listesChampions, setlistesChampions] = useState([]);
  const [listesChSelectionnes, setlistesChSelectionnes] = useState([]);
  const [deck, setDeck] = useState([]);
  const [complet, setComplet] = useState(false);
  const [valided , setValided] = useState(false);
  const [affirmer, setAffirmer] = useState(false);
  const [message, setMessage] = useState("");
  const [messageDeck, setMessageDeck] = useState("");
  const [erreur, setErreur] = useState("");
  const [status, setStatus] = useState("");
  const [initDeckSuccess, setInitDeckSucces] = useState(false);
  const [lanceVerification, setLanceVerification] = useState(false);
  const [startMatch, setStartMatch] = useState(false);
  const [waitOpponent, setWaitOpponent] = useState(true);

  const confirmer = () => {
    setAffirmer(false);
    getMatch(setMessage, setErreur, setStatus, initDeckSuccess)
    initDeck(deck, setMessageDeck, setErreur, setInitDeckSucces);
    console.log(deck);
    console.log(status);
    lancerVerification();
    console.log("la verification de l'état du deck est lancé...")
  }

  const lancerVerification = () =>  {
    setLanceVerification(true);
  }

  const verifierEtatDeck = useCallback(() => {
    if (!initDeckSuccess && status === "Deck is pending") {
      initDeck(deck, 
        (msg) => showMessage('deckMessage', msg),
        (err) => showMessage('error', err), 
        setInitDeckSucces
      );
    }
  }, [initDeckSuccess, status, deck]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lanceVerification) verifierEtatDeck();
    }, 3000);
  
    return () => clearInterval(interval);
  }, [lanceVerification, verifierEtatDeck]);

  useEffect(()=> {
    const interval = setInterval(() => {
      console.log("touuuur");
      if (lanceVerification) verifierEtatDeck();
    }, 3000);
  
    // Nettoyage correct avec une fonction anonyme
    return () => clearInterval(interval);
  },  [lanceVerification])


  useEffect(()=> {
    const interval = setInterval(()=> {
      if (initDeckSuccess) {
        setStartMatch(true);
        confirmer();
        if (status.startsWith("Turn")) {
          setMessage("L'adversaire est prêt(e)");
        } else if (initDeckSuccess && status === "Deck is pending") {
            setMessage("En attente de l'initialisation du deck de l'adversaire");
        } if (status === "Deck is pending") {
            setMessage("Le match est en attente de deck");
        } else if (status !== "Deck is pending") {
            setMessage("Le match n'est pas en attente de deck");
        }

        console.log("ffffffffffffffffffffffffffffff"); console.log(status);
        if (status.startsWith("Turn")) {
          setWaitOpponent(false);
        }
      } 
      }, 3000)
    return ()=> clearInterval(interval);
  }, [initDeckSuccess])

  useEffect(()=>{
    const interval = setInterval(()=> {
        if (!waitOpponent) {
          setMessage("L'adversaire est prêt(e)");
        }
    }, 3000);
    return ()=> clearInterval(interval);
  }, [waitOpponent]);

  const anullerAffirmer = () =>{
    setAffirmer(false)
  }

  useEffect(() => {
    getCards();
  }, []);

  useEffect(() => {

  if (listesChSelectionnes.length >=20) {
    setComplet(true);
  } else {
    setComplet(false);
  }}, [listesChSelectionnes])

  const deplacerChampion = (desc) => {

    const estDansAllChmpions = listesChampions.some(champi => champi.key === desc.key);
    if (estDansAllChmpions) {
      // Vérifier si le nombre de cartes sélectionnées est inférieur à 20
      if (listesChSelectionnes.length < 20) {
        setlistesChSelectionnes([...listesChSelectionnes, desc]);
        setlistesChampions(listesChampions.filter(champi => champi.key !== desc.key));
      } else {
        alert("Le nombre maximum de cartes sélectionnées est de 20.");
      }
    } else {
      
      setlistesChampions([...listesChampions, desc]);
      setlistesChSelectionnes(listesChSelectionnes.filter(champi => champi.key !== desc.key));
    }
    
  };

  const getCards = () => {
    fetch("http://localhost:3001/cards")
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        // console.log(`Largeur: ${window.screen.width} px, Hauteur: ${window.screen.height} px`);

        return response.json();
      })
      .then(data => {
        data.forEach(elmt => { elmt.selected = "false"; });
        setlistesChampions(data);
      })
      .catch(error => console.error("Error:", error));
  };
  //fonction pour valider le deck
  const validerDeck = () => {
    console.log(valided);  
    setValided(true);
    console.log(valided);  
    const nouveauDeck = listesChSelectionnes.map(chp => { 
      console.log(chp.key);
      return { key : chp.key };
    });
    setDeck(nouveauDeck);
  }

  const invaliderDeck = () => {
    console.log(valided);  
    setValided(false);
    console.log(valided);
  }

  return (
    <>
      <Head>
        <title>League of Stones</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <section className={` container-fluid  d-flex flex-column justify-content-center align-items-center bg-dark text-white`}>
        <main className="">
          {erreur && <div className={styles.messageErreur}>{erreur}</div>}
          {message && <div className={styles.messageSucces}>{message}</div>}
          {messageDeck && <div className={styles.messageSucces}>{messageDeck}</div>}

          { !valided && <section className="row d-flex align-items-start">
              <section className={`champions col-6 border-end border-secondary pe-4`}>
                  
                  <h3 className="text-center display-4 mb-4 fw-bold " >Ici les cartes récupérées</h3>

                  <div className={` row`}>
                            { listesChampions.map((card, index) => (   <div key={index} className="carte col-12 col-sm-6 col-lg-4  col-xl-3   rounded-5">    <ImageDesc desc={card} deplacer={deplacerChampion} />   </div>    ))}
                  </div>

              </section>
              
              <section className={`champions col-6 ps-4`}>

                  <h3 className="text-center display-4 mb-4 fw-bold  ">Ici les cartes sélectionnées</h3> {complet ? <button className="valide" onClick={validerDeck}> Je valide mon dèque</button> : null}
                  <div className={` row`}>
                            { listesChSelectionnes.map((card, index) => (   <div key={index} className="carte col-12 col-sm-6 col-lg-4 col-xl-3  rounded-5">    <ImageDesc desc={card} deplacer={deplacerChampion} />    </div>    ))}
                  </div>

              </section>

          </section>}
          {valided && <section className={``}>
          <section className={`champions col-12 ps-4`}>
            <h3 className="text-center display-4 mb-4 fw-bold  ">Ici les cartes validées</h3>
              <div className={` row`}>
                        { listesChSelectionnes.map((card, index) => (   <div key={index} className="carte col-12 col-sm-6 col-lg-4 col-xl-3  rounded-5">    <ImageDesc desc={card} deplacer={() => {}} />    </div>    ))}
              </div>
              <button className="valide" onClick={invaliderDeck}>Retour aux choix du deck</button>
              <button className="envoi" onClick={()=>{setAffirmer(true)}}>{`         envoyer mon deck          `}</button>
              {affirmer && (
              <div className="overlay-container">
                <div className="overlay-box bg-white text-dark rounded p-4 text-center">
                  <h4>Souhaitez-vous vraiment envoyer votre deck ?</h4>
                  <div className="mt-4">
                    <button className="btn btn-success me-3" onClick={confirmer}>Envoyer le deck</button>
                    <button className="btn btn-secondary" onClick={anullerAffirmer}>Annuler</button>
                  </div>
                </div>
              </div>
              )}
              

              {!waitOpponent || startMatch && (
              <div className="overlay-container">
                
                <div className="overlay-box bg-white text-dark rounded p-4 text-center">
                {message && <div className={styles.messageSucces}>{message}</div>}
                  <h4>Prêt(e)s pour le match le match</h4>
                  <div className="mt-4">
                    <Link  href="./match"><button className="btn btn-success me-3" onClick={anullerAffirmer}>Aller vers le match</button></Link>
                  </div>
                </div>
              </div>
              )}
            </section>
          </section>}
        </main>
      </section>
      <Footer />
    </>
  );
}