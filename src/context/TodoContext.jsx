import { createContext, useContext, useEffect, useState } from "react";

export const TodoContext = createContext(null);

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [addTodosInQueue, setAddTodosInQueue] = useState([]);
  const [isShowTextarea, setIsShowTextarea] = useState(false);
  const [isShowListIcon, setIsShowListIcon] = useState(false);
  const [isShowNoteForm, setIsShowNoteForm] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isShowDelIcon, setIsShowDelIcon] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [targetNote, setTargetNote] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [todoListItem, setTodoListItem] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [todoTitle, setTodoTitle] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteText, setNoteText] = useState("");

  // hide the textarea tag when click outside the 'note-div' with same condition and also make editing(false)
  const handleDocumentClick = (e) => {
    const closeTextarea =
      e.target.tagName !== "INPUT" &&
      e.target.tagName !== "TEXTAREA" &&
      e.target.tagName !== "P" &&
      !e.target.classList.contains("note-container");

    if (closeTextarea) {
      setIsShowTextarea(false);
      setIsEditing(null);
      return;
    }
  };

  // this function using on NoteForm
  const handleCleanNoteInput = () => {
    setNoteTitle("");
    setNoteText("");
  };

  // this function using on TodoForm
  const handleCleanTodoInput = () => {
    setTodoTitle("");
    setTodoListItem("");
    setAddTodosInQueue([]);
  };

  //this function use for targeting the note, todo or todo item to show delete icon when i hover
  const handleShowDelIcon = (id) => {
    setIsShowDelIcon(id);
  };

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);

    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const value = {
    data,
    isShowTextarea,
    isShowListIcon,
    isShowNoteForm,
    addTodosInQueue,
    todoListItem,
    noteTitle,
    noteText,
    todoTitle,
    isEditing,
    targetNote,
    isShowDelIcon,
    showSearchBar,
    showTooltip,
    searchItem,
    setSearchItem,
    setShowTooltip,
    setShowSearchBar,
    setData,
    setTargetNote,
    handleShowDelIcon,
    setIsShowTextarea,
    setIsShowDelIcon,
    setIsEditing,
    setTodoTitle,
    setNoteTitle,
    setNoteText,
    setAddTodosInQueue,
    setTodoListItem,
    setIsShowNoteForm,
    setIsShowListIcon,
    handleCleanNoteInput,
    handleCleanTodoInput,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
