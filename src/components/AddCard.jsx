import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark, faPlus} from "@fortawesome/free-solid-svg-icons";

const AddCard = ({handleAddCard}) => {
  const [card, setCard] = useState("");
  const [show, setShow] = useState(false);

  const saveCard = () => {
    if (!card) {
      return;
    }
    handleAddCard(card);
    setCard("");
    setShow(!show);
  };

  const closeBtn = () => {
    setCard("");
    setShow(!show);
  };

  return (
    <div>
      <div className="flex flex-col pt-1">
        {show && (
          <div>
            <textarea
              value={card}
              onChange={(e) => setCard(e.target.value)}
              className="p-1 pl-3 mb-2 w-full rounded-md bg-white leading-5 min-h-[60px]"
              name=""
              id=""
              cols="30"
              rows="2"
              placeholder="Nhập tiêu đề hoặc dán liên kết"
            />
            <div className="flex h-8 gap-2">
              <button
                onClick={() => saveCard()}
                className="px-3 rounded bg-sky-700 text-white font-medium"
              >
                Thêm thẻ
              </button>
              <button
                onClick={() => closeBtn()}
                className="w-8 h-8 rounded hover:bg-gray-300"
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  size="lg"
                />
              </button>
            </div>
          </div>
        )}
        {!show && (
          <button
            onClick={() => setShow(!show)}
            className="flex gap-2 pl-3 p-1 w-full justify-start rounded items-center hover:bg-gray-300 h-8"
          >
            <FontAwesomeIcon icon={faPlus} /> Thêm thẻ
          </button>
        )}
      </div>
    </div>
  );
};

export default AddCard;
