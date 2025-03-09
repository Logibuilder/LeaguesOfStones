import 'bootstrap/dist/css/bootstrap.min.css';

export default function ImageDesc({ desc, deplacer }) {
  return (
    <section onClick={() => deplacer(desc)} className="card my-2 rounded-5 w-100 border-0 shadow-lg overflow-hidden text-light" style={{ cursor: 'pointer'  , background: 'linear-gradient(135deg, #ff7e5f, #feb47b' }}>
      <article className="card-body">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${desc.key}_0.jpg`}
          alt={desc.key}
          className="card-img-top  "
          style={{ height: "250px", objectFit: "cover" }}
        />
        <ul className="list-group list-group-flush bg-transparent">
          <li className="list-group-item bg-transparent text-white">
            <span className="badge rounded-pill" style={{ backgroundColor: '#ff6347', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4)' }}>
              Attaque: {desc.info.attack}
            </span>
          </li>
          <li className="list-group-item bg-transparent text-white">
            <span className="badge rounded-pill" style={{ backgroundColor: '#4682b4', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4)' }}>
              Défense: {desc.info.defense}
            </span>
          </li>
          <li className="list-group-item bg-dark text-white fw-bold  text-center rounded-pill">{desc.key}</li>
        </ul>
      </article>
    </section>
  );
}