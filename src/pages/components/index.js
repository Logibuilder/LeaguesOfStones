const getCards =  () => {

fetch ("http://localhost:3001/cards")
.then(response => {
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    return response.json(); // Convertit la réponse en JSON
  })
.then(data => console.log(data)) // Affiche les données reçues
  .catch(error => console.error("Error:", error)); // Capture les erreurs
  
}

