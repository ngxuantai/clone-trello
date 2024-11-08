import Header from "./Header";
import Sidebar from "./Sidebar";
import {Outlet} from "react-router-dom";

const BoardLayout = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default BoardLayout;
