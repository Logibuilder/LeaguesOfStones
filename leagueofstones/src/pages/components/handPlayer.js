import Card from "./card"
import { playCard } from './playCard'

export const HandPlayer = ({ hand, setMessage, setErreur }) => {
    // États de chargement
    if (hand === undefined) return (
        <div style={{ 
            padding: '10px',
            color: 'white',
            fontStyle: 'italic'
        }}>
            Chargement de la main...
        </div>
    );

    if (hand.length === 0) return (
        <div style={{ 
            padding: '10px',
            color: 'white',
            fontStyle: 'italic'
        }}>
            Votre main est actuellement vide
        </div>
    );

    const jouer = async (carte) => {
        const res = await playCard(carte.key);
        if (res.err) {
            setErreur(res.err);
        } else {
            setMessage(res.reponse);
        }
    }

    return (
        <div style={{
            display: 'flex',
            padding: '10px',
            overflowX: 'auto',
            minHeight: '200px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '8px',
            maxWidth: '100%',
            scrollbarWidth: 'none', // Pour Firefox
            msOverflowStyle: 'none', // Pour IE
            '&::-webkit-scrollbar': { // Pour Chrome/Safari
                display: 'none'
            }
        }}>
            <div style={{
                display: 'flex',
                gap: '15px',
                padding: '5px',
                alignItems: 'flex-end'
            }}>
                {hand.map((carte, index) => (
                    <div 
                        key={index}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            minWidth: '120px',
                            flexShrink: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            borderRadius: '8px',
                            padding: '5px'
                        }}
                    >
                        <Card carte={carte} />
                        <button 
                            onClick={() => jouer(carte)}
                            style={{
                                background: 'linear-gradient(135deg, #1e90ff, #0066cc)',
                                color: 'white',
                                border: 'none',
                                padding: '6px 12px',
                                borderRadius: '20px',
                                fontWeight: 'bold',
                                fontSize: '0.8rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                                width: '100%',
                                textTransform: 'uppercase'
                            }}
                        >
                            JOUER
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}