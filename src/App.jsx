import {useState} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes";
import {BoardContext} from "./context/BoardContext";

function App() {
  const boardData = [
    {
      id: "1",
      name: "Test Board",
      bgcolor: "#069",
      list: [
        {
          id: "1",
          listTitle: "To do",
          items: [{id: "cdrFt", title: "Project Description 1"}],
        },
        {
          id: "2",
          listTitle: "In Progress",
          items: [{id: "cdrFv", title: "Project Description 2"}],
        },
        {
          id: "3",
          listTitle: "Done",
          items: [{id: "cdrFb", title: "Project Description 3"}],
        },
      ],
    },
  ];

  const [allboard, setAllBoard] = useState(boardData);

  return (
    <Router>
      <BoardContext.Provider value={{allboard, setAllBoard}}>
        <AppRoutes allboard={allboard} />
      </BoardContext.Provider>
    </Router>
  );
}

export default App;

