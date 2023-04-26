import illustrationImg from "../../assets/illustration.svg";
import logoImg from "../../assets/logo.svg";
import googleIconImg from "../../assets/google-icon.svg";

import "./style.scss";
import Button from "../../components/Button";

import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import { ref, get } from "firebase/database";

const Home = () => {
  const [code, setCode] = useState<string>("");

  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();

  function handleCreateRoom() {
    if (!user) {
      signInWithGoogle();
    }
    navigate("/rooms/new");
  }

  async function handleJoinRoom(e: FormEvent) {
    e.preventDefault();

    if (code.trim() === "") {
      return;
    }

    const roomRef = await get(ref(database, `rooms/${code}`));

    if (!roomRef.exists()) {
      alert("Room does not exist");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("Room is already ended");
      return;
    }

    console.log(roomRef, user);

    if (roomRef.val().authorId === user?.id) {
      navigate(`/admin/rooms/${code}`);
    } else {
      navigate(`/rooms/${code}`);
    }
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img
            src={logoImg}
            alt="Letmeask"
          />

          <button
            onClick={handleCreateRoom}
            className="create-room">
            <img
              src={googleIconImg}
              alt="Logo do google"
            />
            Crie sua sala com o google
          </button>

          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
