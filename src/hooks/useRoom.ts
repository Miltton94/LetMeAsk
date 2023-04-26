import { useState, useEffect } from "react";

import { database } from "../services/firebase";
import { ref, onValue, off } from "firebase/database";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

type Questions = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
};

export const useRoom = (id: string | undefined) => {
  const { user } = useAuth();
  const [dataQuestion, setDataQuestion] = useState<Questions[]>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const roomRef = ref(database, `rooms/${id}`);

    onValue(roomRef, (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions =
        (databaseRoom.questions as FirebaseQuestions) ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            author: value.author,
            content: value.content,
            isAnswered: value.isAnswered,
            isHighlighted: value.isHighlighted,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([key, like]) => like.authorId === user?.id
            )?.[0],
          };
        }
      );
      setTitle(databaseRoom.title);
      setDataQuestion(parsedQuestions);

      console.log(parsedQuestions);
    });

    return () => {
      off(roomRef);
    };
  }, [id, user?.id]);

  return { dataQuestion, title };
};
