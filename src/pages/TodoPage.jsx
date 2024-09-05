import AllItems from "../components/AllItems";
import NoteForm from "../components/NoteForm";
import SearchBar, { SearchIcon } from "../components/SearchBar";
import TodoForm from "../components/TodoForm";
import { useTodo } from "../context/TodoContext";

const TodoPage = () => {
  const { isShowNoteForm, showSearchBar } = useTodo();

  return (
    <div className="w-full flex flex-col ">
      <SearchIcon />
      <div className="sm:mt-[2vw] ">
        <div className="w-full md:p-2 ">
          <div
            className={` absolute w-full  flex justify-center  ${
              showSearchBar ? "opacity-100 z-50" : "translate-y-5 opacity-0"
            } transition-all duration-300 ease-in-out `}
          >
            <SearchBar />
          </div>
          <div
            className={`w-full flex justify-center ${
              showSearchBar
                ? "opacity-0"
                : "transition-all duration-500 ease-in-out"
            } `}
          >
            {isShowNoteForm ? <NoteForm /> : <TodoForm />}
          </div>
        </div>
      </div>
      <div className="p-[1vw]">
        <AllItems />
      </div>
    </div>
  );
};

export default TodoPage;
