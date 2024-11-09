import React, {useState, useRef, useEffect} from "react";

const EditCard = ({card, onSave, onClose}) => {
  const [title, setTitle] = useState(card.title);
  const popupRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSave = () => {
    onSave({...card, title});
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-10"
        onClick={onClose}
      ></div>
      <div
        ref={popupRef}
        className="bg-transparent rounded-md shadow-lg w-60 z-50 p-2"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border w-full p-2 rounded mb-3"
        />
        <button
          onClick={handleSave}
          className="px-3 h-8 rounded bg-sky-700 text-white font-medium"
        >
          Lưu
        </button>
      </div>
      {/* </div> */}
    </>
  );
};

export default EditCard;
