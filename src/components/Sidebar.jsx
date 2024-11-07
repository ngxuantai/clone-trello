import React, {useContext, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faXmark,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {Popover} from "react-tiny-popover";
import {BoardContext} from "../context/BoardContext";
import {BASIC_COLORS} from "../constants/color";

const Sidebar = () => {
  const blankBoard = {
    name: "",
    bgcolor: "#f60000",
    list: [],
  };
  const [boardData, setBoarddata] = useState(blankBoard);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showpop, setShowpop] = useState(false);
  const [titleError, setTitleError] = useState("");
  const {allboard, setAllBoard} = useContext(BoardContext);

  const setActiveboard = (i) => {
    let newBoard = {...allboard};
    newBoard.active = i;
    setAllBoard(newBoard);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!boardData.name.trim()) {
      setTitleError("Tiêu đề không được để trống");
      return;
    }
    addBoard();
  };
  const addBoard = () => {
    let newB = {...allboard};
    newB.boards.push(boardData);
    setAllBoard(newB);
    setBoarddata(blankBoard);
    setShowpop(!showpop);
  };
  return (
    <div
      className={`bg-[#121417] h-[calc(100vh-3rem)] border-r border-r-[#9fadbc29] transition-all linear duration-500 flex-shrink-0 relative ${
        showSidebar ? "w-[42px]" : "w-[280px]"
      }`}
    >
      {showSidebar && (
        <div className="p-2">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="bg-[#121417] border-r-[#9fadbc29] border rounded-full w-6 h-6 justify-center items-center flex absolute top-3 -right-3"
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              color="white"
            />
          </button>
        </div>
      )}
      {!showSidebar && (
        <div>
          <div className="workspace p-3 flex justify-between items-center border-b border-b-[#9fadbc29]">
            <div className="flex items-center gap-2">
              <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-sm hover:shadow-lg">
                <span className="font-extrabold text-gray-600">TN</span>
              </div>
              <h4 className="text-white">Tai Nguyen</h4>
            </div>
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="hover:bg-slate-600 rounded-sm w-8 h-8"
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                color="white"
              />
            </button>
          </div>
          <div className="boardlist">
            <div className="flex justify-between px-3 py-2">
              <h6 className="text-white">Các bảng của bạn</h6>
              <Popover
                isOpen={showpop}
                align="start"
                positions={["right", "top", "bottom", "left"]}
                zIndex={1000}
                content={
                  <div className="p-2 w-60 flex flex-col justify-center items-center bg-white text-black border border-gray-400 rounded">
                    <div className="relative w-full pb-4 mb-2 border-b border-gray-300">
                      <button
                        onClick={() => setShowpop(!showpop)}
                        className="w-8 h-8 absolute top-0 right-0 hover:bg-gray-200 rounded"
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                      <h4 className="text-center h-8 leading-8">Tạo bảng</h4>
                    </div>
                    <form
                      onSubmit={handleSubmit}
                      className="mt-3 flex flex-col items-start w-full gap-2"
                    >
                      <label htmlFor="title">
                        Tiêu đề bảng <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="title"
                        value={boardData.name}
                        onChange={(e) => {
                          setBoarddata({...boardData, name: e.target.value});
                          setTitleError("");
                        }}
                        type="text"
                        className="h-8 px-2 w-full text-black border border-gray-400 rounded hover:border-gray-500"
                      />
                      {titleError && (
                        <span className="text-red-600 text-sm">
                          {titleError}
                        </span>
                      )}
                      <label
                        htmlFor="Color"
                        className="mt-2"
                      >
                        Phông nền
                      </label>
                      <div className="flex gap-1">
                        {BASIC_COLORS.map((color, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() =>
                              setBoarddata({...boardData, bgcolor: color})
                            }
                            className={`w-8 h-8 rounded cursor-pointer border-2 hover:opacity-80 ${
                              boardData.bgcolor === color
                                ? "border-black"
                                : "border-transparent"
                            }`}
                            style={{backgroundColor: color}}
                          >
                            &nbsp;
                          </button>
                        ))}
                      </div>

                      <button
                        type="submit"
                        className={`w-full rounded h-8 bg-gray-200 mt-2 ${
                          !boardData.name.trim() || titleError
                            ? "cursor-not-allowed"
                            : "cursor-pointer hover:bg-gray-400"
                        }`}
                        disabled={!boardData.name.trim() || titleError}
                      >
                        Tạo mới
                      </button>
                    </form>
                  </div>
                }
              >
                <button
                  onClick={() => setShowpop(!showpop)}
                  className="hover:bg-slate-600 p-1 rounded-sm w-8 h-8"
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    color="white"
                  />
                </button>
              </Popover>
            </div>
          </div>
          <ul>
            {allboard.boards &&
              allboard.boards.map((x, i) => {
                return (
                  <li key={i}>
                    <button
                      onClick={() => setActiveboard(i)}
                      className="px-3 py-2 w-full text-sm flex justify-start align-baseline hover:bg-gray-500"
                    >
                      <span
                        className="w-6 h-max rounded-sm mr-2"
                        style={{backgroundColor: `${x.bgcolor}`}}
                      >
                        &nbsp;
                      </span>
                      <span className="text-white">{x.name}</span>
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
