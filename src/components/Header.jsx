import React from "react";

const Header = () => {
  return (
    <div className="bg-[#1d2125] w-100 h-12 p-3 border-b bordered-box flex flex-row justify-between border-b-[#9fadbc29]">
      <div className="left justify-center items-center flex">
        <h3 className="text-slate-50">Trello Clone</h3>
      </div>
      <div className="right flex items-center space-x-4">
        <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full hover:shadow-lg">
          <span className="font-medium text-gray-600">TN</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
