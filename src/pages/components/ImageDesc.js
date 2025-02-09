import styles from "../../styles/ImageDesc.module.css";


export default function ImageDesc ({desc}) {
    return (
        <section className= {`${styles.sectionImage} card`} style="width: 18rem;">
            <article>
                <img 
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${desc.key}_0.jpg`  } 
                alt={desc.key} 
                className={`class="card-img-top" ${styles.imageDesc}`} />
                <p className={styles.attaque}> attaque : {desc.info.attack}  </p>
                <p className={styles.defense}> defense : {desc.info.defense}  </p>
                <p className={styles.nom}> {desc.key}  </p>
            </article>
        </section>
    )
}
