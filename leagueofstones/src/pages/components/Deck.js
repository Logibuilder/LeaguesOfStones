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
  const [erreur, setErreur] = useState("");
  const [messageDeck, setMessageDeck] = useState("");
  const [erreurDeck, setErreurDeck] = useState("");
  const [wait, setWait] = useState(false);
  const [waitOpponent, setWaitOpponent] = useState(true)
  const [deckInited, setDeckInited] = useState(false);

  const confirmer = async () => {
    setAffirmer(false);
    const match = await getMatch();
    
    console.log(deck);
    console.log("fffffffffffffffffffffffffffff")
    if (match.match) {
      console.log("1");
      if  (match.match.status === "Deck is pending") {
        
        const res = await initDeck(deck);
        if (res.inited) {
          setMessageDeck(res.message);
          setErreurDeck("");
          setWait(true);
          setMessage("En attente de la définition du deck de l'adversaire")
          setErreur("")
        } else {
          setMessage("Votre  deck est attendu")
          setErreur("")
          setErreurDeck(res.error)
          setMessageDeck("");
          
          if (res.error == "Un deck est déjà défini pour ce joueur.") {
            setWait(true);
          } else {
            setWait(false);
          }
        }
      }   else if (match.match.status.startsWith("Turn")) {
            setMessage("L'adversaire vous attends...");
            setErreur("");
            setWaitOpponent(false);
            setWait(true);
      }
    }

    if (match.err) {
      console.log("4");
      setErreur(match.err)
      setMessage("");
    }
  }


  const verifier = async () => {
    try {

      const match = await getMatch();
      
      // Debug: Afficher l'état actuel
      console.log("État actuel:", {
        matchStatus: match.match?.status,
        erreurDeck,
        wait,
        affirmer
      });
  
      // Si erreur de deck déjà détectée
      if (erreurDeck === "Un deck est déjà défini pour ce joueur." || message === "L'adversaire vous attends..."  || (match.status && match.status.startsWith("Turn"))) {

        setWait(true);
        if (message === "L'adversaire vous attends..."  || (match.status && match.status.startsWith("Turn"))) {
          setWaitOpponent(false);
        }
        return;
      }

      
  
      // Si match trouvé
      if (match.match) {
        // Si le deck est en attente et qu'on a un deck à envoyer
        if (match.match.status === "Deck is pending" && deck.length > 0 && !affirmer) {
          setAffirmer(true); // Active le modal de confirmation
        }
        // Si le match a commencé
        else if (match.match.status.startsWith("Turn")) {
          setMessage("L'adversaire vous attend");
          setErreur("");
          setWaitOpponent(false);
          setWait(true);
          setAffirmer(false);
        }
      }
  
      // Gestion des erreurs
      if (match.err) {
        setErreur(match.err);
        setMessage("");
      }
    } catch (error) {
      console.error("Erreur dans verifier:", error);
      setErreur("Une erreur est survenue lors de la vérification");
    }
  };
  
  useEffect(() => {
    // Vérification initiale au chargement
    const checkInitialStatus = async () => {
      console.log("Vérification initiale du sessionStorage...");
      const deckInited = sessionStorage.getItem("deckinited");
      console.log("Valeur de deckinited:", deckInited);
      
      if (deckInited === "true") {
        setDeckInited(true);
        console.log("Deck déjà initialisé - activation du modal");
        setWait(true);
        
        // Vérification supplémentaire avec le serveur
        const match = await getMatch();
        if (match.match?.status?.startsWith("Turn")) {
          setMessage("L'adversaire vous attend...");
          setWaitOpponent(false);
        } else {
          setMessage("En attente de l'adversaire...");
        }
      }
    };
  
    checkInitialStatus();
  }, []);

  useEffect (()=> {
    const interval = setInterval(()=> verifier(), 3000);
    return ()=> clearInterval(interval);
  }, [valided, deck, affirmer, message, messageDeck, erreurDeck, deckInited])


  const anullerAffirmer = () =>{
    setAffirmer(false)
  }

  useEffect(() => {
    getCards();
  }, []);

  useEffect(() => {

  if (listesChSelectionnes.length >= 20) {
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
          {erreurDeck && <div className={styles.messageErreur}>{erreurDeck}</div>}
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
                    <button className="btn btn-success me-3" onClick={() => confirmer()}>Envoyer le deck</button>
                    <button className="btn btn-secondary" onClick={anullerAffirmer}>Annuler</button>
                  </div>
                </div>
              </div>
              )}
              
              
              
            </section>
          </section>}
          {wait && (
              <div className="overlay-container">
                <div className="overlay-box bg-white text-dark rounded p-4 text-center">
                  {erreur && <div className={styles.messageErreur}>{erreur}</div>}
                  {message && <div className={styles.messageSucces}>{message}</div>}
                  {erreurDeck && <div className={styles.messageErreur}>{erreurDeck}</div>}
                  {messageDeck && <div className={styles.messageSucces}>{messageDeck}</div>}
                  
                  <h4 className="mb-4">Prêt(e) pour le match</h4>
                  
                  {waitOpponent ? (
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="spinner-border text-primary me-2" role="status"></div>
                      <span>En attente de l'adversaire...</span>
                    </div>
                  ) : (
                    <Link href="./match" className="btn btn-success">
                      Commencer le match
                    </Link>
                  )}
                </div>
              </div>
            )}
        </main>
      </section>
      <Footer />
    </>
  );
}