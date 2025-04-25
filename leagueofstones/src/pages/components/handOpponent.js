import CardCashed from "./cardCashed";

export const HandOpponent = ({ hand }) => {
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

    if (hand === 0) return (
        <div style={{ 
            padding: '10px',
            color: 'white',
            fontStyle: 'italic'
        }}>
            La main de l'adversaire  est actuellement vide
        </div>
    );

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
            margin: '0px 0',
            scrollbarWidth: 'none', // Pour Firefox
            msOverflowStyle: 'none', // Pour IE
            '&::-webkit-scrollbar': { // Pour Chrome/Safari
                display: 'none'
            }
        }}>
            {Array.from({ length: hand }, (_, i) => (
                <div 
                    key={i}  //* Correction: utiliser 'i' au lieu de 'index' */}
                    style={{
                        display: 'block',
                        gap: '10px',
                        padding: '10px',
                        minHeight: '180px',
                        alignItems: 'flex-end',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '8px'
                    }}
                >
                    <CardCashed />
                </div>
            ))}
        </div>
    );
}