import { useEffect, useRef } from "react";
import { useTodo } from "../context/TodoContext";
import Input from "./Input";
import Button from ".//Button";
import { IoCheckboxOutline } from "react-icons/io5";
import Tooltip from "./Tooltip";

const NoteForm = () => {
  const textAreaRef = useRef(null);

  const {
    isShowTextarea,
    setIsShowTextarea,
    noteTitle,
    setNoteTitle,
    noteText,
    setNoteText,
    data,
    setData,
    setIsShowListIcon,
    setIsShowNoteForm,
    isShowListIcon,
  } = useTodo();

  // Add Note function
  const handleAddNote = () => {
    if (noteTitle.trim() === "" && noteText.trim() === "") {
      return; // Exit the function if both title and text are empty
    }

    setData((prevNotes) => [
      {
        title: noteTitle,
        text: [...noteText],
      },
      ...prevNotes,
    ]);

    // Create a new note object with trimmed text
    const newNote = {
      id: Date.now(),
      type: "note",
      title: noteTitle.trim(),
      text: noteText.trim(),
    };

    setData([newNote, ...data]);

    setNoteTitle("");
    setNoteText("");

    localStorage.setItem("data", JSON.stringify([newNote, ...data]));
  };

  // this function add the note when click the outside of 'note-div' with same condition
  const handleClickOutSide = (e) => {
    if (noteTitle === "" && noteText === "") return;

    const youClickedON =
      e.target.tagName.toLowerCase() === "input" ||
      e.target.tagName.toLowerCase() === "textarea" ||
      e.target.classList.contains("note-container");

    if (!youClickedON) {
      handleAddNote();
    }
  };

  // adjusting the textarea height according to textarea context
  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "auto"; // Set initial height to 'auto'
      const height = textArea.scrollHeight;
      textArea.style.height = `${height}px`;
    }
  }, [data]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("data")) || [];
    setData(storedNotes);
    window.addEventListener("click", handleClickOutSide);

    return () => {
      window.removeEventListener("click", handleClickOutSide);
    };
  }, [noteTitle, noteText]);

  return (
    <div className="note-container relative flex flex-col w-[36rem] bg-white p-2 pl-4 py-2.5 m-3 rounded-lg shadow-md shadow-zinc-400 border-t-[1px] border-zinc-200">
      <div className="flex relative items-center ">
        <Input
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          placeholder={isShowTextarea ? "Title" : "Take a note..."}
          bg={"transparent"}
          onFocus={() => setIsShowTextarea(true)}
        />

        <div className="absolute right-0">
          <Button
            onMouseEnter={() => setIsShowListIcon(true)}
            onMouseLeave={() => setIsShowListIcon(false)}
            onClick={() => {
              setIsShowNoteForm(false), setIsShowListIcon(false);
            }}
            icon={
              <IoCheckboxOutline
                size={23}
                className="text-slate-700 font-bold "
              />
            }
          />
          <Tooltip isShowListIcon={isShowListIcon} text={"New List"} />
        </div>
      </div>
      {isShowTextarea && (
        <textarea
          value={noteText}
          ref={textAreaRef}
          onChange={(e) => setNoteText(e.target.value)}
          className={`bg-transparent outline-none mt-2 placeholder-slate-500 text-slate-800 font-normal resize-none max-h-[40dvh]`}
          placeholder="Take a note..."
        ></textarea>
      )}
    </div>
  );
};

export default NoteForm;
