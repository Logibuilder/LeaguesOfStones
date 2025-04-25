import { useState } from "react";
import Card from "./card";

export const Board = ({ board, setCard }) => {
    const [selectedCard, setSelectedCard] = useState(null);

    if (!board) return null;

    const handleCardSelection = (carte) => {
        // Si la carte est déjà sélectionnée, on la désélectionne
        if (selectedCard && selectedCard.key === carte.key) {
            setSelectedCard(null);
            setCard(null); //on passe au composant la valeur null
        } else {
            // Sinon, on sélectionne la nouvelle carte
            setSelectedCard(carte);
            setCard(carte.key); //on passe au composant parent la valeur de la carte selectionnée
        }
    };

    return (
        <div style={{
            display: 'flex',
            gap: '10px',
            padding: '1px',
            overflowX: 'auto',
            minHeight: '180px',
            alignItems: 'flex-end',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '8px',
            margin: '1px 0',
            scrollbarWidth: 'none', // Pour Firefox
            msOverflowStyle: 'none', // Pour IE
            '&::-webkit-scrollbar': { // Pour Chrome/Safari
                display: 'none'
            }
        }}>
            {board.map((carte, index) => (
                <div 
                    onClick={() => handleCardSelection(carte)}
                    key={index}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px',
                        backgroundColor: selectedCard?.key === carte.key 
                            ? 'rgba(30, 144, 255, 0.3)' 
                            : 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '8px',
                        transition: 'background-color 0.3s ease'
                    }}
                >
                    <Card carte={carte} />
                    <button 
                        onClick={() => handleCardSelection(carte)}
                        style={{
                            background: selectedCard?.key === carte.key 
                                ? 'linear-gradient(135deg, #ff4757, #cc0033)'
                                : 'linear-gradient(135deg, #1e90ff, #0066cc)',
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
                        {selectedCard?.key === carte.key ? 'Désélectionner' : 'Sélectionner'}
                    </button>
                </div>
            ))}
        </div>
    );
};