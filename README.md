# League Of Stones - Projet WEB2  
![Match en cours de Logo League of Stones](LOS.png)  
## Présentation du projet  

**League Of Stones** est un mashup innovant combinant les mécaniques de jeu de *Hearthstone* (Blizzard™) avec l'univers et les champions de *League of Legends* (Riot Games™).  

### Concept clé  
- **Affrontement** : 2 joueurs, 20 cartes/deck, 150 PV chacun  
- **Déroulement** : Tours alternés avec 3 actions possibles :  
  1. Piocher une carte (1x/tour)  
  2. Poser une carte (max 5 sur le plateau)  
  3. Attaquer (1x/carte/tour)  
### Prérequis
- Node.js v16+
- MongoDB v5+
- NPM v8+

### Étapes
bash
# 1. Cloner le dépôt
git clone : https://github.com/blandine/League-Of-Stones // le serveur
git clone : https://github.com/Logibuilder/LeaguesOfStones// le client
cd league-of-stones

# 2. Installer le backend
cd League-Of-Stones
npm install
npm start  # Lance sur http://localhost:3001

# 3. Installer le frontend
cd leagueofstones
npm run dev  # Lance sur http://localhost:3000

## Fonctionnalités implémentées  

### Gestion utilisateur  
- Création de compte (email + mot de passe)  
- Connexion/déconnexion  
- Suppression de compte  

### Matchmaking  
- Liste des joueurs disponibles  
- Envoi/Acceptation de défis  
- Création automatique de matchs  

### Système de jeu  
- Constitution de deck (20 cartes max)  
- Mécaniques de pioche/pose/attaque  
- Résolution des combats (PV, attaque/défense)  
- Gestion de fin de partie  

## Technologies utilisées  

**Frontend:**  
- React.js (application web responsive)  
**Backend:**  
- Web Services REST (fournis)  
- MongoDB (base de données)  
- Express.js (serveur)
- plus de détail sur [https://github.com/blandine/League-Of-Stones](https://github.com/blandine/League-Of-Stones)





## Architecture du projet  
![architecture du projet](architecture_l_o_s.png)



## PHOTO DE DEMO DANS [los-demo.pdf](los-demo.pdf)
