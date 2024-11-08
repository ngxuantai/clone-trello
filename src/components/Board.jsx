import {useContext, useMemo} from "react";
import {useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import AddList from "./AddList";
import AddCard from "./AddCard";
import {BoardContext} from "../context/BoardContext";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import shortid from "shortid";

const Board = () => {
  const {boardId} = useParams();
  const {allboard, setAllBoard} = useContext(BoardContext);
  const bdata = useMemo(
    () => allboard.find((board) => board.id === boardId),
    [allboard, boardId]
  );

  const updateBoard = (updatedBoard) => {
    setAllBoard((prevBoards) =>
      prevBoards.map((board) => (board.id === boardId ? updatedBoard : board))
    );
  };

  const onDragEnd = (res) => {
    if (!res.destination) {
      console.log("No Destination");
      return;
    }
    const newList = [...bdata.list];
    const s_id = parseInt(res.source.droppableId);
    const d_id = parseInt(res.destination.droppableId);
    const [removed] = newList[s_id - 1].items.splice(res.source.index, 1);
    newList[d_id - 1].items.splice(res.destination.index, 0, removed);

    const updatedBoard = {
      ...bdata,
      list: newList,
    };

    updateBoard(updatedBoard);
  };

  const cardData = (title, listIndex) => {
    const newItem = {id: shortid.generate(), title};

    const updatedBoard = {
      ...bdata,
      list: bdata.list.map((list, index) =>
        index === listIndex ? {...list, items: [...list.items, newItem]} : list
      ),
    };

    updateBoard(updatedBoard);
  };

  const listData = (title) => {
    const newList = {
      id: shortid.generate(),
      listTitle: title,
      items: [],
    };

    const updatedBoard = {
      ...bdata,
      list: [...bdata.list, newList],
    };

    updateBoard(updatedBoard);
  };

  return (
    <div
      className="flex flex-col w-full"
      style={{backgroundColor: bdata.bgcolor}}
    >
      <div className="p-3 bg-black flex justify-between w-full bg-opacity-50">
        <h2 className="text-lg text-white">{bdata.name}</h2>
      </div>
      <div className="flex flex-col w-full flex-grow relative">
        <div className="absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-auto overflow-y-hidden">
          <DragDropContext onDragEnd={onDragEnd}>
            {bdata.list &&
              bdata.list.map((list, index) => (
                <div
                  key={list.id}
                  className="mr-3 w-60 h-fit rounded-md p-2 bg-gray-200 flex-shrink-0"
                >
                  <div className="list-body">
                    <div className="flex justify-between p-1">
                      <h4 className="ml-2 w-full font-medium overflow-hidden whitespace-nowrap text-ellipsis">
                        {list.listTitle}
                      </h4>
                    </div>
                    <Droppable droppableId={list.id}>
                      {(provided, snapshot) => (
                        <div
                          className="py-1 flex flex-col gap-2"
                          ref={provided.innerRef}
                          style={{
                            backgroundColor: snapshot.isDraggingOver
                              ? "#d4d5d9"
                              : "transparent",
                          }}
                          {...provided.droppableProps}
                        >
                          {list.items &&
                            list.items.map((item, itemIndex) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={itemIndex}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="item flex justify-between items-center bg-white p-1 cursor-pointer rounded-md"
                                  >
                                    <span className="ml-2">{item.title}</span>
                                    <span className="flex justify-start items-start">
                                      <button className="hover:bg-gray-300 w-6 h-6 rounded-full">
                                        <FontAwesomeIcon
                                          icon={faPen}
                                          size="xs"
                                        />
                                      </button>
                                    </span>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                    <AddCard getcard={(title) => cardData(title, index)} />
                  </div>
                </div>
              ))}
          </DragDropContext>

          <AddList getlist={(title) => listData(title)} />
        </div>
      </div>
    </div>
  );
};

export default Board;
