import { ReactNode } from "react";
import classnames from "classnames";
import "./style.scss";

type QuestionProps = {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

const Question = ({
  author,
  content,
  children,
  isAnswered = false,
  isHighlighted = false,
}: QuestionProps) => {
  return (
    <div
      className={classnames(
        "question",
        { awswered: isAnswered },
        { highlighted: isHighlighted && !isAnswered }
      )}>
      <p>{content}</p>

      <footer>
        <div className="user-info">
          <img
            src={author.avatar}
            alt={author.name}
          />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
};

export default Question;
