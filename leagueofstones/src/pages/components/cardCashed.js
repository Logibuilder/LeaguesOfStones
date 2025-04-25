
export default function CardCashed() {
    return (
      <div 
        className="card mx-1 rounded-4 border-0 shadow-lg overflow-hidden text-light"
        style={{ 
          cursor: 'pointer',
          background: 'linear-gradient(135deg, #ff7e5f, #feb47b)',
          transition: 'all 0.3s ease',
          width: '150px',
          minWidth: '150px',
          flexShrink: 0
        }}
        
      >
        <div className="card-body p-2 d-flex flex-column">
          <img
            src={`../main_cachee.jpeg`}
            alt={`carte cachée`}
            className="card-img-top rounded-3"
            style={{ 
              height: "100px", 
              objectFit: "cover",
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}
          />
          
          <h6 className="card-title text-center my-1 fw-bold" style={{ fontSize: '0.8rem' }}>
            {"carte cachée"}
          </h6>
          
          <div className="d-flex justify-content-between mt-auto">
            <span 
              className="badge rounded-pill px-2 py-1" 
              style={{ 
                backgroundColor: '#ff6347', 
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4)',
                fontSize: '0.65rem'
              }}
            >
              ATK: {"??"}
            </span>
            <span 
              className="badge rounded-pill px-2 py-1" 
              style={{ 
                backgroundColor: '#4682b4', 
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4)',
                fontSize: '0.65rem'
              }}
            >
              DEF: {"??"}
            </span>
          </div>
        </div>
      </div>
    );
  }