import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Pontuacao = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    points: 0,
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {
      points: 0,
    };
    setUser(userData);
  }, []);

  return (
    <section>
      <h2>Meus Pontos</h2>
      <p>Você tem atualmente: {user.points} pontos</p>
      <button
        onClick={() => {
          if (user.points > 0) {
            setUser({ ...user, points: user.points - 1 });
            alert("Ponto trocado com sucesso!");
            navigate("/pontuacao");
          } else {
            alert("Você não tem pontos suficientes.");
          }
        }}
      >
        Trocar 1 Ponto
      </button>
    </section>
  );
};

export default Pontuacao;
