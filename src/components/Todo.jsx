import { RxCross2 } from "react-icons/rx";
import { useTodo } from "../context/TodoContext";
import { useEffect } from "react";
import DeleteIcon from "./DeleteIcon";

const Todo = ({ todoId, item }) => {
  const {
    data,
    setData,
    isEditing,
    setIsEditing,
    isShowDelIcon,
    setIsShowDelIcon,
    handleShowDelIcon,
  } = useTodo();

  //this function delete the  todo
  const handleDeleteTodo = (id) => {
    const updateTodos = data.filter((todo) => todo.id !== id);
    setData(updateTodos);
    localStorage.setItem("data", JSON.stringify(updateTodos));
  };

  // this function delete the todo items
  const handleDeleteTodoItem = (todoId, itemId) => {
    // it's  take two param todoId, todo itemId
    const updateTodoItem = data.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          todoLists: todo.todoLists.filter((item) => item.id !== itemId),
        };
      }
      return todo;
    });
    setData(updateTodoItem);

    localStorage.setItem("data", JSON.stringify(updateTodoItem));
  };

  // this function use for editing the todo items
  const handleEditItem = (todoId, itemId, newText) => {
    const updateTodoItem = data.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          todoLists: todo.todoLists.map((item) =>
            item.id === itemId ? { ...item, item: newText } : item
          ),
        };
      }
      return todo;
    });
    setData(updateTodoItem);
    localStorage.setItem("data", JSON.stringify(updateTodoItem));
  };

  //this function use for targeting the todo item for editing
  const handleEditTodoItem = (itemId) => {
    setIsEditing(itemId);
  };

  //this function use for toggle to  completion of todoItem
  const handleComplete = (todoId, itemId) => {
    const updateTodoItem = data.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          todoLists: todo.todoLists.map((item) =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          ),
        };
      }
      return todo;
    });
    setData(updateTodoItem);

    localStorage.setItem("data", JSON.stringify(updateTodoItem));
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("data")) || [];
    setData(storedTodos);
  }, []);

  return (
    <div
      key={todoId}
      className="relative border  border-zinc-400  p-2 rounded-md hover:shadow-md hover:shadow-neutral-500"
      onMouseEnter={() => handleShowDelIcon(todoId)}
      onMouseLeave={() => setIsShowDelIcon(false)}
    >
      <h1
        onMouseEnter={() => handleShowDelIcon(todoId)}
        className="font-semibold ml-1 w-auto "
      >
        {item.title}
      </h1>
      <div className="mt-1 ml-1 flex flex-col gap-[.15rem] max-h-56 sm:max-h-80 overflow-auto todo-scrollbar">
        {item.todoLists.length > 0 &&
          item.todoLists.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => handleShowDelIcon(item.id)}
              onMouseLeave={() => setIsShowDelIcon(false)}
              className={`item  justify-between items-center  w-full border-zinc-700 py-[.15rem] hover:bg-zinc-200 rounded-[.28rem]  pl-2 pr-[.1rem] transition-all duration-200 ease-in-out  ${
                isEditing === item.id && "bg-neutral-100"
              } ${item.completed && "bg-red-200"} `}
            >
              <div className="flex w-full">
                <input
                  type="checkbox"
                  className="outline-none"
                  checked={item.completed}
                  onClick={() => setIsEditing(true)}
                  onMouseEnter={() => handleShowDelIcon(item.id)}
                  onChange={() => handleComplete(todoId, item.id)}
                />

                {isEditing === item.id ? (
                  <input
                    type="text"
                    disabled={item.completed}
                    className={`todo-text ml-[.25rem] pl-2  text-[.95rem] bg-transparent  outline-none  ${
                      item.completed && "line-through "
                    }  `}
                    value={item.item.trim()}
                    autoFocus
                    onChange={(e) =>
                      handleEditItem(todoId, item.id, e.target.value)
                    }
                  />
                ) : (
                  <p
                    onClick={
                      !item.completed ? () => handleEditTodoItem(item.id) : null
                    } // enable the todo item for editing
                    className={` relative todo-text w-full  ml-[.25rem] pl-2  text-[.95rem] ${
                      item.completed && "line-through "
                    }  `}
                  >
                    {item.item}
                    {isShowDelIcon === item.id && (
                      <button
                        onClick={() => handleDeleteTodoItem(todoId, item.id)}
                        className="delete-btn absolute p-1 right-0 rounded-full text-black bg-zinc-400 hover:text-red-700 hover:bg-red-300 font-bold outline-none transition-all duration-200 ease-in-out "
                      >
                        <RxCross2 className="del-icon" />
                      </button>
                    )}
                  </p>
                )}
              </div>
            </div>
          ))}

        {isShowDelIcon === todoId && (
          <DeleteIcon onClick={() => handleDeleteTodo(todoId)} />
        )}
      </div>
    </div>
  );
};

export default Todo;
