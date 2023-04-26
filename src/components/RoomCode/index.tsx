import copyImg from "../../assets/copy.svg";

import "./style.scss";

type PropsCode = {
  code: string | undefined;
};

const RoomCode = ({ code }: PropsCode) => {
  function copyRoomCode() {
    if (code) {
      navigator.clipboard.writeText(code);
    }
  }

  return (
    <button
      onClick={copyRoomCode}
      className="room-code">
      <div>
        <img
          src={copyImg}
          alt="Copy room code"
        />
      </div>
      <strong>Sala</strong>
      <span>#{code}</span>
    </button>
  );
};

export default RoomCode;
