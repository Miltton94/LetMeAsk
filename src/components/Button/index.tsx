import { ButtonHTMLAttributes } from "react";

type PropsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

import "./style.scss";

const Button = ({ isOutlined = false, ...props }: PropsButton) => {
  return (
    <>
      <button
        {...props}
        className={`button ${isOutlined && "outlined"}`}
      />
    </>
  );
};

export default Button;
