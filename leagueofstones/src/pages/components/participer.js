import { useState } from "react";

const Participer = () => {
  const [message, setMessage] = useState("");

  const participer = () => {
    fetch("http://localhost:3001/matchmaking/participate", {
      method: "GET",
      headers: {
        "www-authenticate": sessionStorage.getItem("token") || "",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        sessionStorage.setItem("matchmakingId", data.matchmakingId);

        if (data.match) {
          setMessage("✅ Un match a été trouvé !");
        } else {
          setMessage("🕹️ Vous participez au matchmaking !");
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("❌ Erreur lors de la participation.");
      });
  };

  return (
    <>
      {message && <div className="alert alert-info mt-2">{message}</div>}
      <button className="btn btn-secondary" onClick={participer}>
        Participer
      </button>
    </>
  );
};

export default Participer;
