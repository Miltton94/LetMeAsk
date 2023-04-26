import illustrationImg from "../../assets/illustration.svg";
import logoImg from "../../assets/logo.svg";

import Button from "../../components/Button";

import { Link, useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";

import "./style.scss";

import { useAuth } from "../../hooks/useAuth";

import { ref, set, push } from "firebase/database";
import { database } from "../../services/firebase";

const NewRoom = () => {
  const { user } = useAuth();

  const [room, setRoom] = useState<string>("");
  const navigate = useNavigate();

  async function handleCreateRoom(e: FormEvent) {
    e.preventDefault();

    if (room.trim() === "") {
      return;
    }

    const newRoomRef = push(ref(database, `rooms`));

    await set(newRoomRef, {
      title: room,
      authorId: user?.id,
    });

    setRoom("");
    navigate(`/admin/rooms/${newRoomRef.key}`);
  }

  return (
    <div id="page-create">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>

      <main>
        <div className="main-create">
          <img
            src={logoImg}
            alt="Letmeask"
          />

          <h1>{user?.name}</h1>

          <strong className="">Criar uma nova sala</strong>

          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />

            <Button type="submit">Criar sala</Button>
          </form>
          <span>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </span>
        </div>
      </main>
    </div>
  );
};

export default NewRoom;
