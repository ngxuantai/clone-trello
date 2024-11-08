import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import BoardLayout from "../components/BoardLayout";
import Board from "../components/Board";

const AppRoutes = ({allboard}) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to={`/board/${allboard[0]?.id}`}
            replace
          />
        }
      />
      <Route element={<BoardLayout />}>
        <Route
          path="/board/:boardId"
          element={<Board />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
