import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark, faPlus} from "@fortawesome/free-solid-svg-icons";

const AddList = (props) => {
  const [list, setlist] = useState("");
  const [show, setShow] = useState(false);

  const savelist = () => {
    if (!list) {
      return;
    }
    props.getlist(list);
    setlist("");
    setShow(!show);
  };

  const closeBtn = () => {
    setlist("");
    setShow(!show);
  };

  return (
    <div className="min-w-60">
      {show && (
        <div className="flex flex-col h-fit w-60 p-2 rounded-md bg-gray-200 gap-2">
          <textarea
            value={list}
            onChange={(e) => setlist(e.target.value)}
            className="p-1 mb-2 w-full rounded-md bg-white leading-5 min-h-[60px]"
            name=""
            id=""
            cols="30"
            rows="2"
            placeholder="Nhập tên danh sách"
          />
          <div className="flex h-8 gap-2">
            <button
              onClick={() => savelist()}
              className="px-3 rounded bg-sky-700 text-white font-medium"
            >
              Thêm danh sách
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
          className="flex p-3 w-60 h-fit rounded-md items-center gap-2 bg-gray-400 hover:opacity-90"
        >
          <FontAwesomeIcon
            icon={faPlus}
            color="white"
          />
          <span className="leading-5 text-white font-semibold">Add a list</span>
        </button>
      )}
      {/* </div> */}
    </div>
  );
};

export default AddList;
