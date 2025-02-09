import styles from "../../styles/ImageDesc.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ImageDesc({ desc, deplacer }) {
  return (
    <section onClick={() => deplacer(desc)} className="cursor-pointer">
      <article className="card">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${desc.key}_0.jpg`}
          alt={desc.key}
          className="card-img-top"
          style={{ objectFit: "cover", height: "200px" }}
        />
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Attaque : {desc.info.attack}</li>
          <li className="list-group-item">Défense : {desc.info.defense}</li>
          <li className="list-group-item">{desc.key}</li>
        </ul>
      </article>
    </section>
  );
}