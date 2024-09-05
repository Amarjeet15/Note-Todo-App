import { useTodo } from "../context/TodoContext";

const Input = ({ placeholder, bg, onFocus, value, onChange, icon }) => {
  const { isShowNoteForm } = useTodo();

  return (
    <div className="input-container relative w-full">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={`bg-${bg} outline-none text-[1.05rem] placeholder-slate-600 font-medium w-full `}
        placeholder={placeholder}
        onFocus={onFocus}
      />

      {isShowNoteForm && icon}
      {!isShowNoteForm && icon}
    </div>
  );
};

export default Input;
