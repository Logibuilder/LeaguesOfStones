import { useEffect, useState } from "react";
import { getMatch } from "./initDeck";
import ProfilPlayer from "./profilPlayer";
import ProfilOpponent from "./profilOpponent";
import styles from '../../styles/Match.module.css';
import { HandPlayer } from "./handPlayer";
import { HandOpponent } from "./handOpponent";
import { Board } from "./board";
import { endTurn } from "./endTurn";
import { pickCard } from "./pickCard";
import { finishMatch } from "./finishMatch";
import { attack } from "./attack";
import { attackPlayer } from "./attackPlayer";

export default function Match() {
    const [match, setMatch] = useState(null);
    const [erreur, setErreur] = useState(null);
    const [message, setMessage] = useState(null);
    const [hp1, setHp1] = useState(1);
    const [hp2, setHp2] = useState(1);
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [FINISHED, SETFINISHED] = useState(false);


    const prepareEndMatch = ()=> {
         if (match) {
            setHp1(match.player1.hp);
            setName1(match.player1.name);
            setHp2(match.player2.hp);
            setName2(match.player2.name);
         }

         if ( hp1 <= 0) {
            SETFINISHED(true);
            return { 
                "end" : true,
                "winner" : name2,
                "loser" : name1,
            } 
         }  else if (hp2 <= 0) {
            SETFINISHED(true);
            return { 
                "end" : true,
                "winner" : name1,
                "loser" : name2,
            } 
         } else {
            return { 
                "end" : false,
                "winner" : null,
                "loser" : null,
            } 
         }
    }

    const recupererDonnees = async () => {
            const res = await getMatch();
            console.log(res);
            if (res.err)  {
                setErreur(res.err);
            } else {
                setMatch(res.match);
            }
            prepareEndMatch();
        
    };

    useEffect(() => {
        recupererDonnees();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => { recupererDonnees() }, 3000);
        return () => clearInterval(interval);
    }, []);

    if (erreur === "You need to be connected") {
        return <div className={styles["match-message-error"]}>{erreur}</div>;
    }

    if (!match && FINISHED === false) {
        return <>
            {erreur && <div className={styles["match-message-error"]}>{erreur}</div>}
            {message && <div className={styles["match-message-success"]}>{message}</div>}
            <div className={`text-white text-center mt-5`}>Chargement du match...</div>
        </>;
    }

    const joueurConnecte = sessionStorage.getItem("name");
    const estJoueur1 = match.player1.name === joueurConnecte;
    
    return estJoueur1 
        ? <MatchBis player1={match.player1} player2={match.player2} message={message} erreur={erreur} setMessage={setMessage} setErreur={setErreur}/>  
        : <MatchBis player1={match.player2} player2={match.player1} message={message} erreur={erreur} setMessage={setMessage} setErreur={setErreur}/>;
}

function MatchBis({ player1, player2, message, erreur, setMessage, setErreur }) {
    const [card1, setCard1] = useState(null);
    const [card2, setCard2] = useState(null);
    const [finished, setFinished] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    

    useEffect(() => {
        const interval = setInterval(() => {
            if (player1.turn === player2.turn) {
                setFinished(true);
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [player1.turn, player2.turn]);

    const attaquerJoueur = async (carte) => {
        const res = await attackPlayer(carte);
        if (res.err) {
            setErreur(res.err);
        } else {
            setMessage(res.reponse);
        }
    }

    const attaquer = async () => {
        console.log(card1, card2);
        const res = await attack(card1, card2);
        if (res.err) {
            setErreur(res.err);
        } else {
            setMessage(res.message);
            console.log(res.reponse);
        }
    }

    const finirMatch = async () => {
        const res = await finishMatch();
        if (res.err) {
            setErreur(res.err);
        } else {
            setMessage(res.reponse);
            if (finished) {
                setGameOver(true);
            }
        }
    }

    const finirTour = async (isMyTurn) => {
        const res = await endTurn(isMyTurn);
        if (res.err) {
            setErreur(res.err);
        } else {
            setMessage(res.reponse);
        }
    }

    const piocher = async (cardPicked) => {
        const res = await pickCard(cardPicked);
        if (res.err) {
            setErreur(res.err);
        } else {
            setMessage(res.reponse);
        }
    }

    return (
        <div className={styles["match-page"]}>
            {/* Popup de fin de match */}
            {gameOver && (
            <div className={styles.gameOverModal}>
                <div className={styles.modalContent}>
                <h2>{player1.hp > player2.hp ? "Félicitations !" : "Courage pour la prochaine !"}</h2>
                <p>
                    {player1.hp > player2.hp
                    ? `Vous avez battu ${player2.name} !`
                    : `Vous avez été battu(e)s par ${player2.name}.`}
                </p>

                <div className={styles.modalButtons}>
                    <button 
                    className={styles.modalButtonPrimary}
                    >
                    Nouveau match
                    </button>
                    <button 
                    className={styles.modalButtonSecondary}
                    >
                    Se déconnecter
                    </button>
                </div>
                </div>
            </div>
            )}


            
            <div className={styles["match-left"]}>
                <ProfilPlayer player={player1}/>
            </div>

            <div className={styles["match-center"]}>
                <div id="message" className={styles["match-message"]}>
                    {erreur && <div className={styles["match-message-error"]}>{erreur}</div>}
                    {message && <div className={styles["match-message-success"]}>{message}</div>}
                </div>

                <div className={styles["hand"]}>
                    <HandOpponent hand={player2.hand}/>
                </div>
                <div className={styles["board"]}>
                    <Board board={player2.board} setCard={setCard2}/>
                </div>
                
                <div className={styles["board"]}>
                    <Board board={player1.board} setCard={setCard1}/>
                </div>
                
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '10px 0',
                    width: '100%'
                }}>
                    <button
                        onClick={attaquer}
                        style={{
                            width: '75%',
                            background: 'linear-gradient(135deg, #ff6b6b, #ff4757)',
                            color: 'white',
                            border: 'none',
                            padding: '12px',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                            textTransform: 'uppercase'
                        }}
                    >
                        Attaquer
                    </button>
                    
                    <button
                        onClick={() => { attaquerJoueur(card1) }}
                        style={{
                            width: '25%',
                            background: 'linear-gradient(135deg, #ff9e43, #ff7b00)',
                            color: 'white',
                            border: 'none',
                            padding: '12px',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                            textTransform: 'uppercase'
                        }}
                    >
                        Attaquer PV
                    </button>
                </div>
                
                <div className={styles["hand"]}>
                    <HandPlayer hand={player1.hand} setMessage={setMessage} setErreur={setErreur}/>
                </div>
                
                <div className={styles["match-buttons"]}>
                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        justifyContent: 'center',
                        padding: '10px'
                    }}>
                        <button
                            onClick={() => { piocher(player1.cardPicked) }}
                            className={`${styles.buttonStyle}`}
                        >
                            Piocher
                        </button>
                        <button
                            onClick={() => { finirTour(player1.turn) }}
                            className={`${styles.buttonStyle}`}
                        >
                            Finir le tour
                        </button>
                        <button
                            onClick={finirMatch}
                            className={`${styles.buttonStyle} ${finished ? styles.finishedButton : ''}`}
                            style={{
                                backgroundColor: finished ? '#ff0000' : '#ff4444',
                                border: finished ? '3px solid gold' : 'none',
                                boxShadow: finished ? '0 0 15px #ff0000, 0 0 30px #ff8800' : '0 2px 5px rgba(0, 0, 0, 0.2)'
                            }}
                        >
                            <span className={finished ? styles.bouncingText : ''}>
                                {finished ? 'TERMINER LE MATCH !' : 'Finir le match'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles["match-right"]}>
                <ProfilOpponent opponent={player2}/>
            </div>
        </div>
    );
}