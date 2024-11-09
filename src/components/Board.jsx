import {useContext, useMemo, useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import AddList from "./AddList";
import AddCard from "./AddCard";
import {BoardContext} from "../context/BoardContext";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import shortid from "shortid";
import EditCard from "./EditCard";

const Board = () => {
  const {boardId} = useParams();
  const {allboard, setAllBoard} = useContext(BoardContext);
  const bdata = useMemo(
    () => allboard.find((board) => board.id === boardId),
    [allboard, boardId]
  );

  const [editingCard, setEditingCard] = useState(null);
  const [listLookup, setListLookup] = useState({});

  useEffect(() => {
    const lookup = {};
    bdata.list.forEach((list) => {
      lookup[list.id] = {...list, items: [...list.items]};
    });
    setListLookup(lookup);
  }, [bdata]);

  const updateBoard = (updatedLookup) => {
    const updatedBoard = {
      ...bdata,
      list: Object.values(updatedLookup),
    };
    setAllBoard((prevBoards) =>
      prevBoards.map((board) => (board.id === boardId ? updatedBoard : board))
    );
  };

  const onDragEnd = (res) => {
    if (!res.destination) {
      return;
    }

    const s_id = res.source.droppableId;
    const d_id = res.destination.droppableId;

    const sourceList = {
      ...listLookup[s_id],
      items: [...listLookup[s_id].items],
    };
    const destinationList = {
      ...listLookup[d_id],
      items: [...listLookup[d_id].items],
    };

    const [removed] = sourceList.items.splice(res.source.index, 1);
    destinationList.items.splice(res.destination.index, 0, removed);

    const updatedLookup = {
      ...listLookup,
      [s_id]: sourceList,
      [d_id]: destinationList,
    };

    setListLookup(updatedLookup);
    updateBoard(updatedLookup);
  };

  const handleAddCard = (title, listId) => {
    const newItem = {id: shortid.generate(), title};
    const updatedList = {
      ...listLookup[listId],
      items: [...listLookup[listId].items, newItem],
    };

    const updatedLookup = {...listLookup, [listId]: updatedList};
    setListLookup(updatedLookup);
    updateBoard(updatedLookup);
  };

  const handleAddList = (title) => {
    const newList = {
      id: shortid.generate(),
      listTitle: title,
      items: [],
    };

    const updatedLookup = {...listLookup, [newList.id]: newList};
    setListLookup(updatedLookup);
    updateBoard(updatedLookup);
  };

  const handleEditCard = (updatedCard) => {
    const updatedBoard = {
      ...bdata,
      list: bdata.list.map((list) => ({
        ...list,
        items: list.items.map((item) =>
          item.id === updatedCard.id ? updatedCard : item
        ),
      })),
    };
    updateBoard(updatedBoard);
    setEditingCard(null);
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
                          {list.items.length > 0 &&
                            list.items.map((item, itemIndex) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={itemIndex}
                                isDragDisabled={editingCard === item.id}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="item flex justify-between items-center bg-white p-1 cursor-pointer rounded-md"
                                  >
                                    {editingCard === item.id ? (
                                      <EditCard
                                        card={item}
                                        onSave={handleEditCard}
                                        onClose={() => setEditingCard(null)}
                                      />
                                    ) : (
                                      <>
                                        <span className="ml-2">
                                          {item.title}
                                        </span>
                                        <button
                                          onClick={() =>
                                            setEditingCard(item.id)
                                          }
                                          className="hover:bg-gray-300 w-6 h-6 rounded-full"
                                        >
                                          <FontAwesomeIcon
                                            icon={faPen}
                                            size="xs"
                                          />
                                        </button>
                                      </>
                                    )}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                    <AddCard
                      handleAddCard={(title) => handleAddCard(title, list.id)}
                    />
                  </div>
                </div>
              ))}
          </DragDropContext>

          <AddList handleAddList={(title) => handleAddList(title)} />
        </div>
      </div>
    </div>
  );
};

export default Board;
