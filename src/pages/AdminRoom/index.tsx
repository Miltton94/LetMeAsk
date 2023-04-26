import logoImg from "../../assets/logo.svg";
import deleteImg from "../../assets/delete.svg";
import checkImg from "../../assets/check.svg";
import answerImg from "../../assets/answer.svg";

import { useForm } from "react-hook-form";

import { useState } from "react";

import Button from "../../components/Button";
import RoomCode from "../../components/RoomCode";

import { useParams, useNavigate } from "react-router-dom";

import { database } from "../../services/firebase";
import { remove, ref, update, push } from "firebase/database";

import "./style.scss";
import Question from "../../components/Question";

import { useRoom } from "../../hooks/useRoom";

const AdminRoom = () => {
  const { register, handleSubmit } = useForm();
  const { id } = useParams<string>();
  const { title, dataQuestion } = useRoom(id);

  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  async function handleCheckQuestionAsAnswered(
    QuestionId: string,
    isHighlighted: boolean
  ) {
    if (isHighlighted) {
      await update(ref(database, `rooms/${id}/questions/${QuestionId}`), {
        isAnswered: true,
      });
    }
  }

  async function handleHighLightQuestion(QuestionId: string) {
    await update(ref(database, `rooms/${id}/questions/${QuestionId}`), {
      isHighlighted: true,
    });
  }

  async function handleDeleteQuestion(QuestionId: string) {
    if (window.confirm("Are you sure you want to delete")) {
      await remove(ref(database, `rooms/${id}/questions/${QuestionId}`));
    }
  }

  const handleEndRoom = async () => {
    await update(ref(database, `rooms/${id}`), {
      endedAt: new Date(),
    });

    navigate("/");
  };

  const handleResponseAnswer = async (QuestionId: string) => {
    await push(
      ref(database, `rooms/${id}/questions/${QuestionId}/answer`),
      answer
    );
    console.log(answer);
    setAnswer("");
  };

  return (
    <div id="page-admin">
      <header>
        <div className="content-admin">
          <img
            src={logoImg}
            alt="Letmeask"
            onClick={() => navigate("/")}
          />

          <div>
            <RoomCode code={id} />
            <Button
              isOutlined
              onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="admin-title">
          <strong>Sala {title}</strong>
          {dataQuestion.length > 0 && (
            <span>{dataQuestion.length} pergunta(s)</span>
          )}
        </div>

        <div className="admin-list">
          {dataQuestion.map((question) => {
            return (
              <>
                <Question
                  key={question.id}
                  author={question.author}
                  content={question.content}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}>
                  {!question.isAnswered && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleHighLightQuestion(question.id)}>
                        <img
                          src={answerImg}
                          alt="Responder Pergunta"
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleCheckQuestionAsAnswered(
                            question.id,
                            question.isHighlighted
                          )
                        }>
                        <img
                          src={checkImg}
                          alt="Checar Pergunta"
                        />
                      </button>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(question.id)}>
                    <img
                      src={deleteImg}
                      alt="Remover Pergunta"
                    />
                  </button>
                </Question>
              </>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AdminRoom;
