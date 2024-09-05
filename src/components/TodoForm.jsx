import Input from "./Input";
import { HiPlusSmall } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { useTodo } from "../context/TodoContext";
import Button from "./Button";
import { PiNotePencilFill } from "react-icons/pi";
import Tooltip from "./Tooltip";
import { useEffect } from "react";

const TodoForm = () => {
  const {
    todoTitle,
    setTodoTitle,
    addTodosInQueue,
    setAddTodosInQueue,
    todoListItem,
    data,
    setData,
    setTodoListItem,
    setIsShowListIcon,
    setIsShowNoteForm,
    isShowListIcon,
  } = useTodo();

  const handleAddTodoInQueue = (e) => {
    if (e.key === "Enter" && todoListItem.trim()) {
      // Ensure input is not empty
      setAddTodosInQueue((prevItem) => [
        {
          id: Date.now(),
          item: todoListItem,
          completed: false,
        },
        ...prevItem,
      ]);

      setTodoListItem("");
    }
  };

  const handleDeleteTodoInQueue = (id) => {
    const updateItem = addTodosInQueue.filter((item) => item.id !== id);
    setAddTodosInQueue(updateItem);
  };

  const handleAddTodo = () => {
    setData((prevTodos) => [
      {
        title: todoTitle,
        todoLists: addTodosInQueue,
      },
      ...prevTodos,
    ]);

    const newTodos = {
      id: Date.now(),
      type: "todo",
      title: todoTitle,
      todoLists: addTodosInQueue,
    };

    setData([newTodos, ...data]);

    localStorage.setItem("data", JSON.stringify([newTodos, ...data]));

    setTodoTitle("");
    setTodoListItem("");
    setAddTodosInQueue([]);
  };

  // this function add the todo when click the outside of 'todo-div' with same condition
  const handleClickOutSide = (e) => {
    if (todoTitle === "" && todoListItem === "") return;

    const youClickedOn =
      e.target.tagName.toLowerCase() === "input" ||
      e.target.classList.contains("todo-container") ||
      e.target.classList.contains("item-list-container") ||
      e.target.classList.contains("added-list-container") ||
      e.target.classList.contains("item") ||
      e.target.classList.contains("todo-text") ||
      e.target.classList.contains("delete-btn") ||
      e.target.classList.contains("del-icon") ||
      e.target.classList.contains("plus-icon") ||
      e.target.classList.contains("del-icon");

    if (!youClickedOn) {
      handleAddTodo();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutSide);

    return () => {
      window.removeEventListener("click", handleClickOutSide);
    };
  }, [todoTitle, todoListItem, addTodosInQueue]);

  return (
    <div className="todo-container  flex flex-col w-[36rem] bg-white p-2 pl-4 py-2.5 m-3 rounded-lg shadow-md shadow-zinc-400 border-t-[1px] border-zinc-200">
      <div className="flex relative items-center ">
        <Input
          placeholder="Title..."
          bg={"transparent"}
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <div className="absolute right-0">
          <Button
            onMouseEnter={() => setIsShowListIcon(true)}
            onMouseLeave={() => setIsShowListIcon(false)}
            onClick={() => {
              setIsShowNoteForm(true);

              setIsShowListIcon(false);
            }}
            icon={
              <PiNotePencilFill
                size={23}
                className="plus-icon text-slate-700 font-bold "
              />
            }
          />
          <Tooltip isShowListIcon={isShowListIcon} text={"New Note"} />
        </div>
      </div>

      <div className="item-list-container flex justify-center items-center relative mt-3 border-zinc-400 border-y py-[.13rem] pl-1">
        <HiPlusSmall size={20} className="text-slate-700" />
        <input
          type="text"
          onChange={(e) => setTodoListItem(e.target.value)}
          onKeyDown={handleAddTodoInQueue}
          value={todoListItem}
          className="w-full pl-2 outline-none text-[.95rem]"
          placeholder="List item"
        />
      </div>
      <div className="added-list-container flex flex-col ml-5 max-h-[40dvh] todo-scrollbar ">
        {/* todo item goes here */}
        {addTodosInQueue.map((item) => (
          <div
            key={item.id}
            className="item flex justify-center items-center border-zinc-300 border-b border-l border-r py-1 hover:bg-neutral-300"
          >
            <p className="todo-text w-full ml-[.25rem] pl-2 outline-none text-[.95rem]">
              {item.item}
            </p>

            <button
              onClick={() => handleDeleteTodoInQueue(item.id)}
              className="delete-btn relative p-1 rounded-full text-red-500 hover:bg-red-200 font-bold outline-none"
            >
              <RxCross2 className="del-icon" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoForm;
