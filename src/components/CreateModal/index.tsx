import * as Dialog from "@radix-ui/react-dialog";

import { useState, FormEvent } from "react";
import { database } from "../../services/firebase";
import { ref, update } from "firebase/database";

import { X } from "phosphor-react";

import "./style.scss";
import Button from "../Button";

type Props = {
  title: string;
  questionId: string;
  id: string | undefined;
};

const CreateModal = ({ title, questionId, id }: Props) => {
  const [answer, setAnswer] = useState("");

  const handleResponseAnswer = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await update(ref(database, `rooms/${id}/questions/${questionId}`), {
        answer: answer,
        isHighlighted: true,
      });
      alert("Resposta enviada com sucesso!");
    } catch (error) {
      console.log(error);
      alert("Erro ao responder ");
    }

    setAnswer("");
  };
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="overlay" />
      <Dialog.Content className="dialog-content">
        <Dialog.Title className="dialog-title">{title}</Dialog.Title>
        <form>
          <textarea
            name="response"
            placeholder="Digite sua resposta..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <Dialog.Close asChild>
            <Button
              type="submit"
              className="btn"
              disabled={answer.length === 0}
              onClick={handleResponseAnswer}>
              Responder
            </Button>
          </Dialog.Close>

          <div>
            <Dialog.Close className="iconButton">
              <X size={24} />
            </Dialog.Close>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default CreateModal;
