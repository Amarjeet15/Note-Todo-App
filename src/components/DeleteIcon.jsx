import { RxCross2 } from "react-icons/rx";

const DeleteIcon = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-1 rounded-full text-black bg-zinc-400 font-bold outline-0 absolute top-[-7px]
       right-[-7px] hover:text-red-500 hover:bg-red-200`}
    >
      <RxCross2 className="del-icon" />
    </button>
  );
};

export default DeleteIcon;
